'use client'

import { useState } from 'react'
import RoleSelector from '@/components/RoleSelector'
import HRForm from '@/components/HRForm'
import LookerForm from '@/components/LookerForm'

type Role = 'hr' | 'looker' | null

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<Role>(null)

  const handleRoleSelect = (role: 'hr' | 'looker') => {
    setSelectedRole(role)
  }

  const handleBack = () => {
    setSelectedRole(null)
  }

  if (selectedRole === 'hr') {
    return <HRForm onBack={handleBack} />
  }

  if (selectedRole === 'looker') {
    return <LookerForm onBack={handleBack} />
  }

  return <RoleSelector onRoleSelect={handleRoleSelect} />
} 