// Authentication utilities for the skill-swap application

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

// Set authentication token in cookies
export function setAuthToken(token: string) {
  document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`
}

// Set session token in cookies
export function setSessionToken(token: string) {
  document.cookie = `session-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`
}

// Get authentication token from cookies
export function getAuthToken(): string | null {
  const cookies = document.cookie.split(';')
  const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth-token='))
  return authCookie ? authCookie.split('=')[1] : null
}

// Get session token from cookies
export function getSessionToken(): string | null {
  const cookies = document.cookie.split(';')
  const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('session-token='))
  return sessionCookie ? sessionCookie.split('=')[1] : null
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!(getAuthToken() || getSessionToken())
}

// Clear authentication tokens
export function clearAuthTokens() {
  document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  document.cookie = 'session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
}

// Login function
export async function login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    // In a real app, this would be an API call
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      const data = await response.json()
      setAuthToken(data.token)
      setSessionToken(data.sessionToken)
      return { success: true, user: data.user }
    } else {
      const error = await response.json()
      return { success: false, error: error.message || 'Login failed' }
    }
  } catch (error) {
    return { success: false, error: 'Network error' }
  }
}

// Logout function
export function logout() {
  clearAuthTokens()
  // Redirect to home page
  window.location.href = '/'
}

// Get current user (you would typically fetch this from an API)
export async function getCurrentUser(): Promise<User | null> {
  if (!isAuthenticated()) {
    return null
  }

  try {
    const response = await fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    })

    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error('Error fetching current user:', error)
  }

  return null
} 