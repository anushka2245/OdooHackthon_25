"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, isAuthenticated, getCurrentUser, logout as logoutUser } from '@/lib/auth'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = async () => {
    if (isAuthenticated()) {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error('Error refreshing user:', error)
        setUser(null)
      }
    } else {
      setUser(null)
    }
    setLoading(false)
  }

  const login = async (email: string, password: string) => {
    try {
      // This would be implemented with your actual login API
      // For now, we'll simulate a login
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        avatar: '/placeholder-user.jpg'
      }
      
      // Set mock tokens
      document.cookie = `auth-token=mock-token-${Date.now()}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`
      document.cookie = `session-token=mock-session-${Date.now()}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`
      
      setUser(mockUser)
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    }
  }

  const logout = () => {
    logoutUser()
    setUser(null)
  }

  useEffect(() => {
    refreshUser()
  }, [])

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 