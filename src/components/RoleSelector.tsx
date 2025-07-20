'use client'

import { useState } from 'react'
import { User, Building2, Play } from 'lucide-react'
import Link from 'next/link'

interface RoleSelectorProps {
  onRoleSelect: (role: 'hr' | 'looker') => void
}

export default function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Caker Simple
          </h1>
          <p className="text-xl text-gray-600">
            AI-powered job and CV matching platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* HR Card */}
          <div 
            className="bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-blue-200"
            onClick={() => onRoleSelect('hr')}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Sebagai HR
              </h2>
              <p className="text-gray-600 mb-6">
                Post lowongan kerja dan temukan kandidat yang cocok berdasarkan CV yang sudah ada
              </p>
              <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
                <strong>Fitur:</strong>
                <ul className="mt-2 space-y-1">
                  <li>• Upload deskripsi lowongan</li>
                  <li>• AI matching dengan CV database</li>
                  <li>• Top 5 kandidat terbaik</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Looker Card */}
          <div 
            className="bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-green-200"
            onClick={() => onRoleSelect('looker')}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Sebagai Looker
              </h2>
              <p className="text-gray-600 mb-6">
                Upload CV dan temukan lowongan kerja yang sesuai dengan pengalaman dan skill
              </p>
              <div className="bg-green-50 rounded-lg p-4 text-sm text-green-800">
                <strong>Fitur:</strong>
                <ul className="mt-2 space-y-1">
                  <li>• Upload CV dan pengalaman</li>
                  <li>• AI matching dengan job database</li>
                  <li>• Top 5 lowongan terbaik</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 mb-4">
            Pilih peran Anda untuk memulai
          </p>
          
          <Link
            href="/demo"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Play className="w-4 h-4 mr-2" />
            Lihat Demo Data
          </Link>
        </div>
      </div>
    </div>
  )
} 