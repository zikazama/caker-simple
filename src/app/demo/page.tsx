'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Building2, User, ArrowLeft, Copy, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const demoData = {
  hr: {
    companyName: 'PT Tech Solutions Indonesia',
    location: 'Jakarta Selatan, Indonesia',
    jobDescription: `Kami mencari Software Engineer yang berpengalaman untuk bergabung dengan tim pengembangan kami.

**Persyaratan:**
- Minimal 2 tahun pengalaman sebagai Software Engineer
- Menguasai React, Node.js, dan TypeScript
- Pengalaman dengan database MongoDB atau PostgreSQL
- Familiar dengan Git dan agile development
- Kemampuan problem solving yang baik

**Tanggung Jawab:**
- Mengembangkan aplikasi web modern
- Berkolaborasi dengan tim cross-functional
- Melakukan code review dan testing
- Mengoptimalkan performa aplikasi
- Mengikuti best practices development

**Benefit:**
- Gaji kompetitif
- Remote work option
- Health insurance
- Learning budget
- Flexible working hours`
  },
  looker: {
    name: 'Ahmad Rizki',
    email: 'ahmad.rizki@email.com',
    experience: `Saya adalah Software Engineer dengan 3 tahun pengalaman dalam pengembangan aplikasi web modern. 

**Pengalaman Kerja:**
- Senior Frontend Developer di PT Digital Solutions (2022-2024)
- Full Stack Developer di Startup Tech (2021-2022)
- Junior Developer di Web Agency (2020-2021)

**Proyek yang Dikerjakan:**
- E-commerce platform dengan React dan Node.js
- Dashboard admin dengan TypeScript dan Material-UI
- Mobile app dengan React Native
- API development dengan Express.js dan MongoDB

**Keahlian Teknis:**
- Frontend: React, Vue.js, TypeScript, HTML/CSS
- Backend: Node.js, Express.js, Python, Django
- Database: MongoDB, PostgreSQL, MySQL
- Tools: Git, Docker, AWS, CI/CD
- Testing: Jest, Cypress, Postman`,
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Express.js', 'Git', 'Docker', 'AWS']
  }
}

export default function DemoPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldName)
    toast.success(`${fieldName} berhasil disalin!`)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Link
              href="/"
              className="flex items-center text-blue-600 hover:text-blue-800 mr-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Demo Data untuk Testing</h1>
          <p className="text-xl text-gray-600">
            Gunakan data berikut untuk mencoba fitur HR dan Looker
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* HR Demo Data */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Data untuk HR</h2>
            </div>

            <div className="space-y-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Perusahaan
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={demoData.hr.companyName}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                  />
                  <button
                    onClick={() => copyToClipboard(demoData.hr.companyName, 'Nama Perusahaan')}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {copiedField === 'Nama Perusahaan' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lokasi
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={demoData.hr.location}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                  />
                  <button
                    onClick={() => copyToClipboard(demoData.hr.location, 'Lokasi')}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {copiedField === 'Lokasi' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Lowongan
                </label>
                <div className="relative">
                  <textarea
                    value={demoData.hr.jobDescription}
                    readOnly
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 resize-none"
                  />
                  <button
                    onClick={() => copyToClipboard(demoData.hr.jobDescription, 'Deskripsi Lowongan')}
                    className="absolute top-2 right-2 p-2 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {copiedField === 'Deskripsi Lowongan' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Copy All HR Data */}
              <button
                onClick={() => {
                  const allData = `Nama Perusahaan: ${demoData.hr.companyName}\nLokasi: ${demoData.hr.location}\n\nDeskripsi Lowongan:\n${demoData.hr.jobDescription}`
                  copyToClipboard(allData, 'Semua Data HR')
                }}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Copy className="w-4 h-4 mr-2" />
                Salin Semua Data HR
              </button>

              <div className="text-center">
                <Link
                  href="/?role=hr"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Coba Fitur HR
                </Link>
              </div>
            </div>
          </div>

          {/* Looker Demo Data */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Data untuk Job Seeker</h2>
            </div>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={demoData.looker.name}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                  />
                  <button
                    onClick={() => copyToClipboard(demoData.looker.name, 'Nama')}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {copiedField === 'Nama' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={demoData.looker.email}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                  />
                  <button
                    onClick={() => copyToClipboard(demoData.looker.email, 'Email')}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {copiedField === 'Email' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pengalaman
                </label>
                <div className="relative">
                  <textarea
                    value={demoData.looker.experience}
                    readOnly
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 resize-none"
                  />
                  <button
                    onClick={() => copyToClipboard(demoData.looker.experience, 'Pengalaman')}
                    className="absolute top-2 right-2 p-2 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {copiedField === 'Pengalaman' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={demoData.looker.skills.join(', ')}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                  />
                  <button
                    onClick={() => copyToClipboard(demoData.looker.skills.join(', '), 'Skills')}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {copiedField === 'Skills' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Copy All Looker Data */}
              <button
                onClick={() => {
                  const allData = `Nama: ${demoData.looker.name}\nEmail: ${demoData.looker.email}\n\nPengalaman:\n${demoData.looker.experience}\n\nSkills: ${demoData.looker.skills.join(', ')}`
                  copyToClipboard(allData, 'Semua Data Job Seeker')
                }}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <Copy className="w-4 h-4 mr-2" />
                Salin Semua Data Job Seeker
              </button>

              <div className="text-center">
                <Link
                  href="/?role=looker"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <User className="w-4 h-4 mr-2" />
                  Coba Fitur Job Seeker
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Cara Menggunakan Demo Data</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-medium text-blue-900 mb-3">Untuk HR:</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Klik "Coba Fitur HR" atau pilih "Saya HR" di halaman utama</li>
                <li>Salin data perusahaan, lokasi, dan deskripsi lowongan</li>
                <li>Paste ke form yang sesuai</li>
                <li>Klik "Cari Kandidat" untuk melihat hasil matching</li>
              </ol>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-green-900 mb-3">Untuk Job Seeker:</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Klik "Coba Fitur Job Seeker" atau pilih "Saya Job Seeker" di halaman utama</li>
                <li>Salin data nama, email, pengalaman, dan skills</li>
                <li>Paste ke form yang sesuai</li>
                <li>Klik "Cari Lowongan" untuk melihat hasil matching</li>
              </ol>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Tips Testing:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Data demo ini sudah dioptimalkan untuk memberikan hasil matching yang baik</li>
              <li>• Anda juga bisa mencoba dengan data sendiri untuk melihat perbedaan hasil</li>
              <li>• Sistem akan mencari kandidat/lowongan dengan similarity score tertinggi</li>
              <li>• Jika tidak ada hasil, coba ubah deskripsi atau pengalaman</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 