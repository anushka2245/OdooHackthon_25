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
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        // Save tokens if provided
        if (data.token) {
          document.cookie = `auth-token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;
        }
        if (data.sessionToken) {
          document.cookie = `session-token=${data.sessionToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;
        }
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
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