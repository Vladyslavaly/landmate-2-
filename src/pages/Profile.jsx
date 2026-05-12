import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import {
  User,
  Trophy,
  Gamepad2,
  Flame,
  BookOpen,
  Brain,
  LogOut,
  Star,
  Target,
  BarChart3,
  Crown,
  Clock,
  Zap
} from 'lucide-react'

function Profile() {
  const [user, setUser] = useState(null)
  const [xp, setXp] = useState(0)
  const [status, setStatus] = useState('Free')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)

      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid)
        const userSnap = await getDoc(userRef)

        if (userSnap.exists()) {
          setXp(userSnap.data().xp || 0)
          setStatus(userSnap.data().status || 'Free')
        }
      }
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    await signOut(auth)
    setUser(null)
    setXp(0)
    setStatus('Free')
    alert('Вихід виконано')
  }

  const level =
    xp >= 300 ? 'Intermediate' :
    xp >= 100 ? 'Elementary' :
    'Beginner'

  const completedLessons = Math.min(Math.floor(xp / 20), 10)
  const progressPercent = Math.min(completedLessons * 10, 100)
  const streak = Math.min(Math.floor(xp / 50) + 1, 14)
  const nextLevelXP = xp < 100 ? 100 - xp : xp < 300 ? 300 - xp : 0

  if (!user) {
    return (
      <div className="page">
        <div className="auth-card">
          <h1>Профіль недоступний</h1>
          <p>Увійди в акаунт, щоб бачити свій прогрес.</p>

          <Link className="btn primary" to="/auth">
            Увійти
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Профіль користувача</h1>
        <p>Тут зберігається прогрес, XP, статус підписки, досягнення та AI-рекомендації.</p>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <div className="avatar">
            <User size={34} />
          </div>

          <h2>{user.email}</h2>
          <p>Рівень англійської: {level}</p>

          <p className={status === 'Premium' ? 'premium-status' : ''}>
            <Crown size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Статус: {status}
          </p>

          <button className="btn primary" onClick={logout} style={{ marginTop: '20px' }}>
            <LogOut size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Вийти
          </button>
        </div>

        <div className="stats-card">
          <h3>
            <BarChart3 size={22} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Навчальна статистика
          </h3>

          <div className="stat-row">
            <span>XP</span>
            <strong>{xp}</strong>
          </div>

          <div className="stat-row">
            <span>Рівень</span>
            <strong>{level}</strong>
          </div>

          <div className="stat-row">
            <span>Пройдено уроків</span>
            <strong>{completedLessons} / 10</strong>
          </div>

          <div className="stat-row">
            <span>Підписка</span>
            <strong>{status}</strong>
          </div>

          <div className="progress">
            <p>Загальний прогрес</p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="profile-mini-card">
          <Zap size={26} />
          <h3>{streak} днів</h3>
          <p>Навчальний streak</p>
        </div>

        <div className="profile-mini-card">
          <Clock size={26} />
          <h3>{completedLessons * 10} хв</h3>
          <p>Орієнтовний час навчання</p>
        </div>

        <div className="profile-mini-card">
          <Target size={26} />
          <h3>{nextLevelXP === 0 ? 'Max' : `${nextLevelXP} XP`}</h3>
          <p>До наступного рівня</p>
        </div>

        <div className="badges-card">
          <h3>
            <Trophy size={22} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Досягнення
          </h3>

          <div className="badges">
            {completedLessons >= 1 && <span><Star size={16} /> Перший урок</span>}
            {xp >= 20 && <span><Gamepad2 size={16} /> Перша гра</span>}
            {xp >= 100 && <span><Flame size={16} /> Активний учень</span>}
            {xp >= 300 && <span><Trophy size={16} /> Intermediate рівень</span>}

            {status === 'Premium' && (
              <span><Crown size={16} /> Premium учасник</span>
            )}

            {xp < 20 && (
              <span><BookOpen size={16} /> Почни перший урок</span>
            )}
          </div>
        </div>

        <div className="badges-card">
          <h3>
            <Brain size={22} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            AI-рекомендації
          </h3>

          <div className="recommendations">
            {xp < 50 && (
              <>
                <div className="recommendation-item">
                  <BookOpen size={18} />
                  Повтори базові слова Beginner рівня.
                </div>

                <div className="recommendation-item">
                  <Gamepad2 size={18} />
                  Виконай міні-гру Word Match для закріплення слів.
                </div>
              </>
            )}

            {xp >= 50 && xp < 120 && (
              <>
                <div className="recommendation-item">
                  <Target size={18} />
                  Пройди урок з теми Travel Vocabulary.
                </div>

                <div className="recommendation-item">
                  <BookOpen size={18} />
                  Повтори Present Simple та неправильні дієслова.
                </div>
              </>
            )}

            {xp >= 120 && (
              <>
                <div className="recommendation-item">
                  <Target size={18} />
                  Спробуй уроки рівня Intermediate.
                </div>

                <div className="recommendation-item">
                  <Brain size={18} />
                  Система рекомендує більше вправ на speaking.
                </div>
              </>
            )}

            {status === 'Premium' && (
              <div className="recommendation-item">
                <Crown size={18} />
                Premium відкрив розширені AI-рекомендації та додаткові уроки.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile