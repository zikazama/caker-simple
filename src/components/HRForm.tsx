'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Building2, ArrowLeft, Send, Users, CheckCircle } from 'lucide-react'
import { MatchResult } from '@/types'
import toast from 'react-hot-toast'
import RichTextEditor from './RichTextEditor'

interface HRFormData {
  jobDescription: string
}

interface HRFormProps {
  onBack: () => void
}

export default function HRForm({ onBack }: HRFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [matches, setMatches] = useState<MatchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [jobDescription, setJobDescription] = useState('')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const { handleSubmit, formState: { errors } } = useForm<HRFormData>()

  const onSubmit = async (data: HRFormData) => {
    if (!jobDescription.trim()) {
      toast.error('Deskripsi lowongan wajib diisi')
      return
    }

    setIsLoading(true)
    setIsTransitioning(true)
    toast.loading('Mencari kandidat yang cocok...')

    try {
      const response = await fetch('/api/hr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobDescription: jobDescription
        }),
      })

      const result = await response.json()

      if (result.success) {
        setMatches(result.matches)
        
        // Check if matches are found
        if (result.matches && result.matches.length > 0) {
          toast.success(`Berhasil menemukan ${result.matches.length} kandidat yang cocok!`)
        } else {
          toast.error('Tidak ada kandidat yang cocok ditemukan. Coba ubah deskripsi lowongan.')
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
      toast.error('Terjadi kesalahan saat mencari kandidat')
      setIsTransitioning(false)
    } finally {
      setIsLoading(false)
      toast.dismiss()
    }
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 animate-fadeIn">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <button
                onClick={() => setShowResults(false)}
                className="flex items-center text-blue-600 hover:text-blue-800 mr-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Form
              </button>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Hasil Pencarian Kandidat
                </h2>
              </div>
            </div>

            {matches.length > 0 ? (
              <div className="space-y-4">
                <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">
                      Ditemukan {matches.length} kandidat yang cocok
                    </span>
                  </div>
                </div>
                
                {matches.map((match, index) => (
                  <div key={match.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-semibold text-sm">
                            {index + 1}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {match.name || 'Kandidat'}
                        </h3>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {Math.round((match.similarity || 0) * 100)}% Match
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <strong>Email:</strong> {match.email || 'Tidak tersedia'}
                      </div>
                      <div>
                        <strong>Pengalaman:</strong>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-700 bg-gray-50 p-3 rounded">
                      {match.experience || 'Tidak tersedia'}
                    </div>
                    
                    {match.skills && match.skills.length > 0 && (
                      <div className="mt-3">
                        <strong className="text-sm text-gray-600">Skills:</strong>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {match.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs"
                            >
                              {skill}
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
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg font-medium">Tidak ada kandidat yang ditemukan</p>
                <p className="text-gray-400 text-sm mt-2 mb-4">
                  Coba ubah deskripsi lowongan untuk mendapatkan hasil yang lebih baik
                </p>
                <button
                  onClick={() => setShowResults(false)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Edit Deskripsi Lowongan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 ${isTransitioning ? 'opacity-50' : ''}`}>
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <button
              onClick={onBack}
              className="flex items-center text-blue-600 hover:text-blue-800 mr-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </button>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Post Lowongan Kerja
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Lowongan Kerja
              </label>
              <RichTextEditor
                value={jobDescription}
                onChange={setJobDescription}
                placeholder="Masukkan deskripsi lengkap lowongan kerja, termasuk persyaratan, tanggung jawab, dan kualifikasi yang dibutuhkan..."
                className="min-h-[300px]"
              />
              {!jobDescription.trim() && (
                <p className="mt-1 text-sm text-red-600">Deskripsi lowongan wajib diisi</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !jobDescription.trim() || isTransitioning}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Mencari Kandidat...
                </div>
              ) : (
                <div className="flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  Cari Kandidat
                </div>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Tips:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Jelaskan detail persyaratan dan tanggung jawab</li>
              <li>• Sertakan skill dan teknologi yang dibutuhkan</li>
              <li>• Jelaskan budaya kerja dan benefit</li>
              <li>• Semakin detail, semakin akurat hasil matching</li>
              <li>• Gunakan formatting untuk membuat deskripsi lebih mudah dibaca</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 