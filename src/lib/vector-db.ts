import axios from 'axios'

// Vector DB configuration - supports Qdrant, Weaviate, or ChromaDB
const VECTOR_DB_URL = process.env.VECTOR_DB_URL || 'http://localhost:6333'
const VECTOR_DB_API_KEY = process.env.VECTOR_DB_API_KEY

// Using Qdrant as default vector DB
export class VectorDB {
  private baseUrl: string
  private apiKey?: string

  constructor() {
    this.baseUrl = VECTOR_DB_URL
    this.apiKey = VECTOR_DB_API_KEY
  }

  private getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`
    }
    return headers
  }

  // Check if collection exists
  async collectionExists(collectionName: string): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseUrl}/collections/${collectionName}`, {
        headers: this.getHeaders()
      })
      return response.status === 200
    } catch (error) {
      return false
    }
  }

  // Create collections for jobs and CVs
  async createCollections() {
    try {
      // Create jobs collection if it doesn't exist
      const jobsExists = await this.collectionExists('jobs')
      if (!jobsExists) {
        await axios.put(`${this.baseUrl}/collections/jobs`, {
          vectors: {
            size: 384, // Hugging Face all-MiniLM-L6-v2 embedding size
            distance: 'Cosine'
          }
        }, { headers: this.getHeaders() })
        console.log('Jobs collection created successfully')
      }

      // Create CVs collection if it doesn't exist
      const cvsExists = await this.collectionExists('cvs')
      if (!cvsExists) {
        await axios.put(`${this.baseUrl}/collections/cvs`, {
          vectors: {
            size: 384, // Hugging Face all-MiniLM-L6-v2 embedding size
            distance: 'Cosine'
          }
        }, { headers: this.getHeaders() })
        console.log('CVs collection created successfully')
      }
    } catch (error) {
      console.error('Error creating collections:', error)
      throw error
    }
  }

  // Ensure collections exist before operations
  async ensureCollections() {
    await this.createCollections()
  }

  // Store vector in jobs collection
  async storeJobVector(id: string, vector: number[]) {
    try {
      await this.ensureCollections()
      
      await axios.put(`${this.baseUrl}/collections/jobs/points`, {
        points: [{
          id,
          vector,
          payload: { type: 'job' }
        }]
      }, { headers: this.getHeaders() })
      return true
    } catch (error) {
      console.error('Error storing job vector:', error)
      return false
    }
  }

  // Store vector in CVs collection
  async storeCVVector(id: string, vector: number[]) {
    try {
      await this.ensureCollections()
      
      await axios.put(`${this.baseUrl}/collections/cvs/points`, {
        points: [{
          id,
          vector,
          payload: { type: 'cv' }
        }]
      }, { headers: this.getHeaders() })
      return true
    } catch (error) {
      console.error('Error storing CV vector:', error)
      return false
    }
  }

  // Search similar jobs for a CV vector
  async searchSimilarJobs(cvVector: number[], limit: number = 5) {
    try {
      await this.ensureCollections()
      
      const response = await axios.post(`${this.baseUrl}/collections/jobs/points/search`, {
        vector: cvVector,
        limit,
        with_payload: true
      }, { headers: this.getHeaders() })

      return response.data.result.map((item: any) => ({
        id: item.id,
        score: item.score
      }))
    } catch (error) {
      console.error('Error searching similar jobs:', error)
      return []
    }
  }

  // Search similar CVs for a job vector
  async searchSimilarCVs(jobVector: number[], limit: number = 5) {
    try {
      await this.ensureCollections()
      
      const response = await axios.post(`${this.baseUrl}/collections/cvs/points/search`, {
        vector: jobVector,
        limit,
        with_payload: true
      }, { headers: this.getHeaders() })

      return response.data.result.map((item: any) => ({
        id: item.id,
        score: item.score
      }))
    } catch (error) {
      console.error('Error searching similar CVs:', error)
      return []
    }
  }

  // Check if vector exists
  async vectorExists(collection: string, id: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/collections/${collection}/points/${id}`, {
        headers: this.getHeaders()
      })
      return response.status === 200
    } catch (error) {
      return false
    }
  }
}

export const vectorDB = new VectorDB() 