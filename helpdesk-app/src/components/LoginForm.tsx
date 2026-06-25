import { useForm } from 'react-hook-form'
import axios from 'axios'
import type { LoginInput, User } from '../types/auth'

type LaravelValidationError = {
  errors: Record<string, string[]>
}

type LoginFormProps = {
  onLogin: (input: LoginInput) => Promise<User>
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>()

  const onSubmit = async (data: LoginInput) => {
    try {
      await onLogin(data)
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 422) {
        const body = e.response.data as LaravelValidationError
        Object.entries(body.errors).forEach(([field, messages]) => {
          setError(field as keyof LoginInput, { type: 'server', message: messages[0] })
        })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #00ffff', borderRadius: '8px' }}>
      <h2 style={{ color: '#00ffff', textAlign: 'center' }}>ログイン</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>メールアドレス</label>
        <input
        id="email"
          type="email"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          {...register('email', { required: 'メールアドレスを入力してください' })}
        />
        {errors.email && <p style={{ color: 'red', marginTop: '5px' }}>{errors.email.message}</p>}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>パスワード</label>
        <input
        id="password"
          type="password"
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          {...register('password', { required: 'パスワードを入力してください' })}
        />
        {errors.password && <p style={{ color: 'red', marginTop: '5px' }}>{errors.password.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '10px', backgroundColor: '#00ffff', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
        {isSubmitting ? 'ログイン中...' : 'ログイン'}
      </button>
    </form>
  )
}