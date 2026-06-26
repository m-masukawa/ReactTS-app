import { useForm } from 'react-hook-form'
import axios from 'axios'
import type { RegisterInput } from '../types/auth'

type LaravelValidationError = {
  errors: Record<string, string[]>
}

type RegisterFormProps = {
  onRegister: (input: RegisterInput) => Promise<unknown>
  onSwitchToLogin: () => void
}

export function RegisterForm({ onRegister, onSwitchToLogin }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>()

  const password = watch('password', '')

  const onSubmit = async (data: RegisterInput) => {
    try {
      await onRegister(data)
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 422) {
        const body = e.response.data as LaravelValidationError
        Object.entries(body.errors).forEach(([field, messages]) => {
          setError(field as keyof RegisterInput, {
            type: 'server',
            message: messages[0],
          })
        })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px', margin: '20px auto' }}>
      <h2>アカウント作成</h2>

      <div>
        <label>名前</label>
        <input
          type="text"
          {...register('name', { required: '名前を入力してください' })}
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      </div>

      <div>
        <label>メールアドレス</label>
        <input
          type="email"
          {...register('email', { required: 'メールアドレスを入力してください' })}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>

      <div>
        <label>パスワード（8文字以上）</label>
        <input
          type="password"
          {...register('password', {
            required: 'パスワードを入力してください',
            minLength: { value: 8, message: '8文字以上で入力してください' },
          })}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
      </div>

      <div>
        <label>パスワード確認</label>
        <input
          type="password"
          {...register('password_confirmation', {
            required: '確認用パスワードを入力してください',
            validate: (value) => value === password || 'パスワードが一致しません',
          })}
        />
        {errors.password_confirmation && (
          <p style={{ color: 'red' }}>{errors.password_confirmation.message}</p>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '登録中...' : '登録する'}
        </button>
        <button type="button" onClick={onSwitchToLogin} style={{ marginLeft: '10px' }}>
          ログインに戻る
        </button>
      </div>
    </form>
  )
}