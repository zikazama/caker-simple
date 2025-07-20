import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { vectorDB } from '@/lib/vector-db'
import { huggingfaceAPI } from '@/lib/huggingface'
import { Job, CV, MatchResult } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const { jobDescription } = await request.json()

    if (!jobDescription) {
      return NextResponse.json(
        { error: 'Job description is required' },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db('caker-simple')

    let jobEmbedding: number[]
    
    try {
      // Generate embedding for job description
      jobEmbedding = await huggingfaceAPI.generateEmbeddings(jobDescription)
    } catch (embeddingError) {
      console.error('Embedding generation failed:', embeddingError)
      // Continue with fallback matching
      jobEmbedding = []
    }

    // Store job in MongoDB
    const job: Job = {
      id: Date.now().toString(),
      description: jobDescription,
      embedding: jobEmbedding,
      createdAt: new Date()
    }

    await db.collection('jobs').insertOne(job)

    // Try vector search first, fallback to text search
    let similarCVs: MatchResult[] = []
    
    try {
      if (jobEmbedding.length > 0) {
        // Use vector search
        const vectorResults = await vectorDB.searchSimilarCVs(jobEmbedding, 5)
        
        // Get CV details from MongoDB
        for (const result of vectorResults) {
          const cv = await db.collection('cvs').findOne({ id: result.id })
          if (cv) {
            similarCVs.push({
              id: cv.id,
              name: cv.name,
              experience: cv.experience,
              skills: cv.skills,
              similarity: result.score
            })
          }
        }
      }
    } catch (vectorError) {
      console.error('Vector search failed, using text fallback:', vectorError)
    }

    // Fallback to text-based search if vector search failed or no results
    if (similarCVs.length === 0) {
      console.log('Using text-based fallback search')
      
      // Simple text-based matching
      const allCVs = await db.collection('cvs').find({}).toArray()
      
      for (const cv of allCVs) {
        const similarity = calculateTextSimilarity(jobDescription, cv.experience)
        if (similarity > 0.2) { // Increased minimum similarity threshold
          similarCVs.push({
            id: cv.id,
            name: cv.name,
            experience: cv.experience,
            skills: cv.skills,
            similarity: similarity
          })
        }
      }
      
      // Sort by similarity and take top 5
      similarCVs.sort((a, b) => (b.similarity || 0) - (a.similarity || 0))
      similarCVs = similarCVs.slice(0, 5)
    }

    return NextResponse.json({
      success: true,
      jobId: job.id,
      matches: similarCVs
    })

  } catch (error) {
    console.error('Error in HR API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Simple text similarity function for fallback
function calculateTextSimilarity(text1: string, text2: string): number {
  const words1 = text1.toLowerCase().split(/\s+/)
  const words2 = text2.toLowerCase().split(/\s+/)
  
  const commonWords = words1.filter(word => words2.includes(word))
  const totalWords = new Set([...words1, ...words2]).size
  
  return totalWords > 0 ? commonWords.length / totalWords : 0
} 