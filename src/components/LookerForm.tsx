'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { User, ArrowLeft, Send, Building2, CheckCircle } from 'lucide-react'
import { MatchResult } from '@/types'
import toast from 'react-hot-toast'
import RichTextEditor from './RichTextEditor'

interface LookerFormData {
  name: string
  email: string
  phone: string
  experience: string
  education: string
  skills: string
}

interface LookerFormProps {
  onBack: () => void
}

export default function LookerForm({ onBack }: LookerFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [matches, setMatches] = useState<MatchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [experience, setExperience] = useState('')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LookerFormData>()

  const onSubmit = async (data: LookerFormData) => {
    if (!experience.trim()) {
      toast.error('Pengalaman kerja wajib diisi')
      return
    }

    setIsLoading(true)
    setIsTransitioning(true)
    toast.loading('Mencari lowongan yang cocok...')

    try {
      const skillsArray = data.skills.split(',').map(skill => skill.trim()).filter(skill => skill)

      const response = await fetch('/api/looker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cvData: {
            ...data,
            experience: experience,
            skills: skillsArray
          }
        }),
      })

      const result = await response.json()

      if (result.success) {
        setMatches(result.matches || result.similarJobs || [])
        
        // Check if matches are found
        const matchCount = (result.matches || result.similarJobs || []).length
        if (matchCount > 0) {
          toast.success(`Berhasil menemukan ${matchCount} lowongan yang cocok!`)
        } else {
          toast.error('Tidak ada lowongan yang cocok ditemukan. Coba ubah pengalaman atau skills.')
        }
        
        // Add a small delay to show the success message before transitioning
        setTimeout(() => {
          setShowResults(true)
          setIsTransitioning(false)
        }, 1000)
      } else {
        toast.error(result.error || 'Terjadi kesalahan')
        setIsTransitioning(false)
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Terjadi kesalahan saat mencari lowongan')
      setIsTransitioning(false)
    } finally {
      setIsLoading(false)
      toast.dismiss()
    }
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 animate-fadeIn">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <button
                onClick={() => setShowResults(false)}
                className="flex items-center text-green-600 hover:text-green-800 mr-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Form
              </button>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Building2 className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Hasil Pencarian Lowongan
                </h2>
              </div>
            </div>

            {matches.length > 0 ? (
              <div className="space-y-4">
                <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">
                      Ditemukan {matches.length} lowongan yang cocok
                    </span>
                  </div>
                </div>
                
                {matches.map((match, index) => (
                  <div key={match.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-green-600 font-semibold text-sm">
                            {index + 1}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {match.title || 'Lowongan'}
                        </h3>
                      </div>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {Math.round((match.similarity || 0) * 100)}% Match
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <strong>Perusahaan:</strong> {match.company || 'Tidak tersedia'}
                      </div>
                      <div>
                        <strong>Lokasi:</strong> {match.location || 'Tidak tersedia'}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                      {match.description || 'Tidak tersedia'}
                    </div>
                    
                    {match.requirements && match.requirements.length > 0 && (
                      <div className="mt-3">
                        <strong className="text-sm text-gray-600">Persyaratan:</strong>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {match.requirements.map((req, reqIndex) => (
                            <span
                              key={reqIndex}
                              className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg font-medium">Tidak ada lowongan yang ditemukan</p>
                <p className="text-gray-400 text-sm mt-2 mb-4">
                  Coba ubah pengalaman kerja atau skills untuk mendapatkan hasil yang lebih baik
                </p>
                <button
                  onClick={() => setShowResults(false)}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Edit CV
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4 ${isTransitioning ? 'opacity-50' : ''}`}>
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <button
              onClick={onBack}
              className="flex items-center text-green-600 hover:text-green-800 mr-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </button>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Submit CV
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Nama wajib diisi' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Masukkan nama lengkap"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  {...register('email', { required: 'Email wajib diisi' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Masukkan email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor Telepon
              </label>
              <input
                type="tel"
                {...register('phone')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Masukkan nomor telepon (opsional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pengalaman Kerja
              </label>
              <RichTextEditor
                value={experience}
                onChange={setExperience}
                placeholder="Jelaskan pengalaman kerja, tanggung jawab, dan pencapaian Anda..."
                className="min-h-[300px]"
              />
              {!experience.trim() && (
                <p className="mt-1 text-sm text-red-600">Pengalaman kerja wajib diisi</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pendidikan
              </label>
              <textarea
                {...register('education')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Jelaskan latar belakang pendidikan Anda (opsional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills (pisahkan dengan koma)
              </label>
              <input
                type="text"
                {...register('skills')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Contoh: JavaScript, React, Node.js, MongoDB"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !experience.trim() || isTransitioning}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Mencari Lowongan...
                </div>
              ) : (
                <div className="flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  Cari Lowongan
                </div>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-900 mb-2">Tips:</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Jelaskan detail pengalaman kerja dan tanggung jawab</li>
              <li>• Sertakan skill dan teknologi yang dikuasai</li>
              <li>• Jelaskan pencapaian dan kontribusi di pekerjaan sebelumnya</li>
              <li>• Semakin detail, semakin akurat hasil matching</li>
              <li>• Gunakan formatting untuk membuat CV lebih mudah dibaca</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 