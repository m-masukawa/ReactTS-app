import { renderHook, act, waitFor } from '@testing-library/react'
import { useAuth } from '../useAuth'

vi.mock('../../api/auth', () => ({
  authApi: {
    me: vi.fn(),
    login: vi.fn(),
    logout: vi.fn(),
  },
}))

import { authApi } from '../../api/auth'

beforeEach(() => {
  localStorage.clear()
  vi.clearAllMocks()
})

describe('useAuth', () => {
  it('トークンがない場合、isLoggedIn は false になる', async () => {
    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.isLoggedIn).toBe(false)
    expect(result.current.user).toBeNull()
  })

  it('有効なトークンがある場合、ユーザー情報が取得されてログイン状態になる', async () => {
    const mockUser = { id: 1, name: 'テストユーザー', email: 'test@example.com' }
    vi.mocked(authApi.me).mockResolvedValue(mockUser)
    
    localStorage.setItem('auth_token', 'valid-token')

    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.isLoggedIn).toBe(true)
    })

    expect(result.current.user).toEqual(mockUser)
  })

  it('login() を呼ぶとユーザー情報とトークンが保存される', async () => {
    const mockUser = { id: 1, name: 'テストユーザー', email: 'test@example.com' }
    vi.mocked(authApi.me).mockRejectedValue(new Error('no token'))
    vi.mocked(authApi.login).mockResolvedValue({ user: mockUser, token: 'new-token' })

    const { result } = renderHook(() => useAuth())
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: 'password123' })
    })

    expect(result.current.isLoggedIn).toBe(true)
    expect(result.current.user).toEqual(mockUser)
    expect(localStorage.getItem('auth_token')).toBe('new-token')
  })
})