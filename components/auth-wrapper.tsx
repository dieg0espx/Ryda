"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import Introduction from "@/components/introduction"
import AuthForm from "@/components/auth-form"

interface AuthWrapperProps {
  children: React.ReactNode
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { user, isLoading } = useAuth()
  const [showIntroduction, setShowIntroduction] = useState(true)
  const [showAuth, setShowAuth] = useState(false)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  if (!user) {
    if (showIntroduction && !showAuth) {
      return (
        <Introduction
          onComplete={() => {
            setShowIntroduction(false)
            setShowAuth(true)
          }}
        />
      )
    }

    if (showAuth || !showIntroduction) {
      return (
        <AuthForm
          onSuccess={() => {
            setShowAuth(false)
            setShowIntroduction(false)
          }}
        />
      )
    }
  }

  return <>{children}</>
}
