# Setup Guide - Caker Simple

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your credentials:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/caker-simple
   REPLICATE_API_TOKEN=r8_your_replicate_token_here
   VECTOR_DB_URL=http://localhost:6333
   VECTOR_DB_API_KEY=your_vector_db_api_key
   ```

3. **Start vector database (Qdrant)**
   ```bash
   docker run -p 6333:6333 qdrant/qdrant
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open http://localhost:3000**

## Required Services

### MongoDB Atlas
1. Create account at [mongodb.com](https://mongodb.com)
2. Create a new cluster
3. Get connection string
4. Add to `.env.local`

### Replicate API
1. Sign up at [replicate.com](https://replicate.com)
2. Get API token from dashboard
3. Add to `.env.local`

### Vector Database
Choose one:
- **Qdrant**: `docker run -p 6333:6333 qdrant/qdrant`
- **Weaviate**: `docker run -p 8080:8080 semitechnologies/weaviate:latest`
- **ChromaDB**: `docker run -p 8000:8000 chromadb/chroma`

## Testing the Application

1. **HR Flow Test**:
   - Select "Sebagai HR"
   - Enter job description
   - Submit and see matching CVs

2. **Looker Flow Test**:
   - Select "Sebagai Looker"
   - Fill CV details
   - Submit and see matching jobs

## Troubleshooting

- **Vector DB Connection**: Ensure vector database is running and accessible
- **MongoDB Connection**: Check connection string format
- **Replicate API**: Verify API token is valid
- **Port Conflicts**: Change ports if 3000, 6333, 8080, or 8000 are in use 