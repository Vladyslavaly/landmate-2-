import { useState } from 'react'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'

import { auth } from '../firebase'

function Auth() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      alert('Акаунт створено')
    }

    catch (error) {
      alert(error.message)
    }
  }

  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      alert('Вхід успішний')
    }

    catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="page">

      <div className="auth-card">

        <h1>Вхід до LangMate</h1>
<p className="auth-subtitle">Увійди або створи акаунт, щоб зберігати прогрес.</p>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Пароль"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="btn primary"
          onClick={register}
        >
          Реєстрація
        </button>

        <button
          className="btn secondary"
          onClick={login}
        >
          Увійти
        </button>

      </div>
    </div>
  )
}

export default Auth