import { ArrowRight, TriangleAlert } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { AuthLayout } from '@/components/auth/AuthLayout'
import { TextField } from '@/components/auth/TextField'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { firstError, passwordRules, usernameRules } from '@/utils/password'

export function SignUpPage() {
  const { account, signUp } = useAuth()
  const navigate = useNavigate()

  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeat, setRepeat] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)

  if (account) return <Navigate to="/app" replace />

  const submit = async (event: FormEvent) => {
    event.preventDefault()

    const found: Record<string, string> = {}
    if (displayName.trim().length < 2) found.displayName = 'Skriv namnet du vill visas med.'
    const usernameError = firstError(usernameRules, username)
    if (usernameError) found.username = usernameError
    const passwordError = firstError(passwordRules, password)
    if (passwordError) found.password = passwordError
    if (password !== repeat) found.repeat = 'Lösenorden matchar inte.'

    setErrors(found)
    if (Object.keys(found).length > 0) return

    setBusy(true)
    const result = await signUp({ username, displayName, password })
    setBusy(false)
    if (result.ok) navigate('/app', { replace: true })
    else setErrors({ username: result.message })
  }

  return (
    <AuthLayout
      title="Skapa ett konto"
      description="Kontot skapas direkt. Du börjar från noll – inga kapitel klara och inga märken upplåsta."
      footer={
        <>
          Har du redan ett konto?{' '}
          <Link to="/logga-in" className="text-forest-700 font-medium hover:underline">
            Logga in
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="mt-8 space-y-4" noValidate>
        <TextField
          label="Namn"
          name="name"
          autoComplete="name"
          hint="Visas i appen, till exempel i hälsningen på startsidan."
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          error={errors.displayName}
        />
        <TextField
          label="Användarnamn"
          name="username"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          hint="Bokstäver, siffror, punkt, bindestreck eller understreck."
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          error={errors.username}
        />
        <TextField
          label="Lösenord"
          name="password"
          type="password"
          autoComplete="new-password"
          hint="Minst 4 tecken."
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
        />
        <TextField
          label="Upprepa lösenordet"
          name="repeat-password"
          type="password"
          autoComplete="new-password"
          value={repeat}
          onChange={(event) => setRepeat(event.target.value)}
          error={errors.repeat}
        />

        <Button
          type="submit"
          size="lg"
          fullWidth
          disabled={busy}
          iconRight={<ArrowRight className="size-4.5" />}
        >
          {busy ? 'Skapar kontot …' : 'Skapa konto'}
        </Button>
      </form>

      <p className="border-sand-200 bg-sand-100 text-ink-500 mt-6 flex items-start gap-2 rounded-2xl border p-4 text-xs leading-relaxed">
        <TriangleAlert className="text-amber-ochre mt-0.5 size-4 shrink-0" />
        <span>
          Kontot sparas bara i den här webbläsaren och lösenordet skickas aldrig till en server.
          Rensar du webbläsardata försvinner kontot. Välj därför ett lösenord du inte använder någon
          annanstans.
        </span>
      </p>
    </AuthLayout>
  )
}
