export interface Job {
  id: string;
  title?: string;
  description: string;
  company?: string;
  location?: string;
  requirements?: string[];
  embedding?: number[];
  vectorId?: string;
  createdAt: Date;
}

export interface CV {
  id: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  education: string;
  skills: string[];
  vectorId?: string;
  createdAt: Date;
}

export interface MatchResult {
  id: string;
  score?: number;
  similarity?: number;
  title?: string;
  description?: string;
  company?: string;
  location?: string;
  name?: string;
  email?: string;
  experience?: string;
  skills?: string[];
  requirements?: string[];
}

export interface EmbeddingResponse {
  embeddings: number[][];
}

export interface VectorSearchResult {
  id: string;
  score: number;
} 