import { useState, useEffect } from 'react'
import { api } from '../lib/api'
import { authApi } from '../api/auth'
import type { User, LoginInput, RegisterInput } from '../types/auth' // RegisterInput を追加

const TOKEN_KEY = 'auth_token'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY)
      if (!token) {
        if (isMounted) setIsLoading(false)
        return
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      try {
        const fetchedUser = await authApi.me()
        if (isMounted) setUser(fetchedUser)
      } catch {
        localStorage.removeItem(TOKEN_KEY)
        delete api.defaults.headers.common['Authorization']
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    checkAuth()

    return () => {
      isMounted = false
    }
  }, [])

  const login = async (input: LoginInput) => {
    const { user, token } = await authApi.login(input)
    localStorage.setItem(TOKEN_KEY, token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(user)
    return user
  }

  const register = async (input: RegisterInput) => {
    const { user, token } = await authApi.register(input)
    localStorage.setItem(TOKEN_KEY, token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(user)
    return user
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } finally {
      localStorage.removeItem(TOKEN_KEY)
      delete api.defaults.headers.common['Authorization']
      setUser(null)
    }
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const isLoggedIn = user !== null

  return { user, isLoggedIn, isLoading, login, register, logout , updateUser ,}
}