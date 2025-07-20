export class HuggingFaceAPI {
  constructor() {
    // No external API dependency
  }

  // Generate embeddings using local algorithm only
  async generateEmbeddings(text: string): Promise<number[]> {
    console.log('Using local embedding generation')
    return this.generateLocalEmbedding(text)
  }

  // Clean text by removing HTML tags and extra whitespace
  private cleanText(text: string): string {
    return text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim()
  }

  // Generate a simple hash-based embedding (384 dimensions to match common models)
  private generateLocalEmbedding(text: string): number[] {
    const cleanText = this.cleanText(text).toLowerCase()
    const embedding: number[] = []
    
    // Create a deterministic embedding based on character frequencies
    for (let i = 0; i < 384; i++) {
      let value = 0
      for (let j = 0; j < cleanText.length; j++) {
        const charCode = cleanText.charCodeAt(j)
        value += (charCode * (j + 1) * (i + 1)) % 1000
      }
      // Normalize to range [-1, 1]
      embedding.push((value % 2000 - 1000) / 1000)
    }
    
    return embedding
  }

  // Calculate cosine similarity between two embeddings
  calculateSimilarity(embedding1: number[], embedding2: number[]): number {
    if (embedding1.length !== embedding2.length) {
      return 0
    }

    let dotProduct = 0
    let norm1 = 0
    let norm2 = 0

    for (let i = 0; i < embedding1.length; i++) {
      dotProduct += embedding1[i] * embedding2[i]
      norm1 += embedding1[i] * embedding1[i]
      norm2 += embedding2[i] * embedding2[i]
    }

    norm1 = Math.sqrt(norm1)
    norm2 = Math.sqrt(norm2)

    if (norm1 === 0 || norm2 === 0) {
      return 0
    }

    return dotProduct / (norm1 * norm2)
  }
}

// Export singleton instance
export const huggingfaceAPI = new HuggingFaceAPI() 