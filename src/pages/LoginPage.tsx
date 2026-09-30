import { ArrowRight, Info, TriangleAlert } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

import { AuthLayout } from '@/components/auth/AuthLayout'
import { TextField } from '@/components/auth/TextField'
import { Button } from '@/components/ui/Button'
import { demoCredentials } from '@/data/accounts'
import { useAuth } from '@/hooks/useAuth'

export function LoginPage() {
  const { account, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/app'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>()
  const [busy, setBusy] = useState(false)

  if (account) return <Navigate to={from} replace />

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setError(undefined)
    setBusy(true)
    const result = await signIn(username, password)
    setBusy(false)
    if (result.ok) navigate(from, { replace: true })
    else setError(result.message)
  }

  const fillDemo = () => {
    setUsername(demoCredentials.username)
    setPassword(demoCredentials.password)
    setError(undefined)
  }

  return (
    <AuthLayout
      title="Logga in"
      description="Dina framsteg sparas per konto, så teori, prov och märken följer dig."
      footer={
        <>
          Har du inget konto?{' '}
          <Link to="/skapa-konto" className="text-forest-700 font-medium hover:underline">
            Skapa ett konto
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="mt-8 space-y-4">
        <TextField
          label="Användarnamn"
          name="username"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <TextField
          label="Lösenord"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error ? (
          <p
            role="alert"
            className="border-berry-500/25 bg-berry-50 text-berry-600 flex items-start gap-2 rounded-xl border p-3 text-sm"
          >
            <TriangleAlert className="mt-0.5 size-4 shrink-0" />
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          size="lg"
          fullWidth
          disabled={busy}
          iconRight={<ArrowRight className="size-4.5" />}
        >
          {busy ? 'Loggar in …' : 'Logga in'}
        </Button>
      </form>

      <div className="border-sand-200 bg-sand-100 mt-6 rounded-2xl border p-4">
        <p className="text-ink-700 flex items-start gap-2 text-sm font-medium">
          <Info className="text-forest-600 mt-0.5 size-4 shrink-0" />
          Testkonto
        </p>
        <p className="text-ink-500 mt-1.5 text-sm">
          Användarnamn <code className="text-ink-700 font-medium">{demoCredentials.username}</code>,
          lösenord <code className="text-ink-700 font-medium">{demoCredentials.password}</code>.
        </p>
        <Button variant="secondary" className="mt-3" onClick={fillDemo}>
          Fyll i testkontot
        </Button>
      </div>

      <p className="text-ink-400 mt-5 text-xs leading-relaxed">
        Inloggningen i den här prototypen är en demonstration. Konton sparas bara i din egen
        webbläsare och skickas aldrig till en server – använd därför inte ett lösenord du använder
        någon annanstans.
      </p>
    </AuthLayout>
  )
}
