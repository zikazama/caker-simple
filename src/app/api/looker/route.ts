import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { vectorDB } from '@/lib/vector-db'
import { huggingfaceAPI } from '@/lib/huggingface'
import { Job, CV, MatchResult } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const { cvData } = await request.json()

    if (!cvData || !cvData.experience) {
      return NextResponse.json(
        { error: 'CV experience is required' },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db('caker-simple')

    let cvEmbedding: number[]
    
    try {
      // Generate embedding for CV experience
      cvEmbedding = await huggingfaceAPI.generateEmbeddings(cvData.experience)
    } catch (embeddingError) {
      console.error('Embedding generation failed:', embeddingError)
      // Continue with fallback matching
      cvEmbedding = []
    }

    // Store CV in MongoDB
    const cv: CV = {
      id: Date.now().toString(),
      name: cvData.name || 'Anonymous',
      email: cvData.email || '',
      phone: cvData.phone || '',
      experience: cvData.experience,
      education: cvData.education || '',
      skills: cvData.skills || [],
      createdAt: new Date()
    }

    await db.collection('cvs').insertOne(cv)

    // Try vector search first, fallback to text search
    let similarJobs: MatchResult[] = []
    
    try {
      if (cvEmbedding.length > 0) {
        // Use vector search
        const vectorResults = await vectorDB.searchSimilarJobs(cvEmbedding, 5)
        
        // Get job details from MongoDB
        for (const result of vectorResults) {
          const job = await db.collection('jobs').findOne({ id: result.id })
          if (job) {
            similarJobs.push({
              id: job.id,
              title: job.title || 'Job Posting',
              description: job.description,
              company: job.company || 'Company',
              location: job.location || 'Location',
              similarity: result.score
            })
          }
        }
      }
    } catch (vectorError) {
      console.error('Vector search failed, using text fallback:', vectorError)
    }

    // Fallback to text-based search if vector search failed or no results
    if (similarJobs.length === 0) {
      console.log('Using text-based fallback search')
      
      // Simple text-based matching
      const allJobs = await db.collection('jobs').find({}).toArray()
      
      for (const job of allJobs) {
        const similarity = calculateTextSimilarity(cvData.experience, job.description)
        if (similarity > 0.2) { // Increased minimum similarity threshold
          similarJobs.push({
            id: job.id,
            title: job.title || 'Job Posting',
            description: job.description,
            company: job.company || 'Company',
            location: job.location || 'Location',
            similarity: similarity
          })
        }
      }
      
      // Sort by similarity and take top 5
      similarJobs.sort((a, b) => (b.similarity || 0) - (a.similarity || 0))
      similarJobs = similarJobs.slice(0, 5)
    }

    return NextResponse.json({
      success: true,
      cvId: cv.id,
      matches: similarJobs
    })

  } catch (error) {
    console.error('Error in Looker API:', error)
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