🔧 Teknologi Tetap:
Frontend Framework: Next.js (fullstack, tidak perlu backend terpisah)

DB: MongoDB Atlas (akses via API Route)

Vector DB: Qdrant / Weaviate / ChromaDB (akses via REST API)

AI API: Replicate (akses via API Route agar token aman)

🔁 Alur Tanpa Auth
HR Flow (Tanpa Login):
User buka halaman dan pilih "Sebagai HR"

Isi rich text lowongan kerja

Klik "Submit"

Next.js API Route:

Kirim teks ke Replicate untuk embedding

Cek ke vector DB: apakah vector sudah ada?

Jika belum:

Simpan ke vector DB

Simpan deskripsi ke MongoDB

Lakukan similarity search ke koleksi CV vector

Ambil top 5 CV dari MongoDB berdasarkan ID hasil similarity

Tampilkan hasil pencocokan ke HR

Looker Flow (Tanpa Login):
User buka halaman dan pilih "Sebagai Looker"

Isi rich text CV

Klik "Submit"

Next.js API Route:

Kirim teks ke Replicate untuk embedding

Cek ke vector DB: apakah vector sudah ada?

Jika belum:

Simpan ke vector DB

Simpan CV ke MongoDB

Lakukan similarity search ke koleksi Job vector

Ambil top 5 Job dari MongoDB berdasarkan ID hasil similarity

Tampilkan hasil pencocokan ke Looker