import {
  Crown,
  Check,
  Sparkles,
  Brain,
  Trophy,
  BarChart3
} from 'lucide-react'

import { auth, db } from '../firebase'

import {
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore'

function Premium() {
  const activatePremium = async () => {
    const user = auth.currentUser

    if (!user) {
      alert('Спочатку увійди в акаунт')
      return
    }

    const userRef = doc(db, 'users', user.uid)
    const userSnap = await getDoc(userRef)

    const currentXP = userSnap.exists()
      ? userSnap.data().xp || 0
      : 0

    await setDoc(userRef, {
      email: user.email,
      xp: currentXP,
      status: 'Premium'
    })

    alert('Premium активовано')
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Premium підписка</h1>

        <p>
          Відкрий додаткові можливості платформи LangMate
          та пришвидши вивчення англійської мови.
        </p>
      </div>

      <div className="premium-page">
        <div className="plan-card free-plan">
          <div className="plan-icon">
            <Sparkles size={34} />
          </div>

          <h2>Free</h2>
          <h1>$0</h1>

          <div className="plan-features">
            <div>
              <Check size={18} />
              Базові уроки
            </div>

            <div>
              <Check size={18} />
              Word Match гра
            </div>

            <div>
              <Check size={18} />
              XP система
            </div>
          </div>

          <button className="btn secondary">
            Поточний план
          </button>
        </div>

        <div className="plan-card premium-main">
          <div className="premium-badge">
            POPULAR
          </div>

          <div className="plan-icon crown">
            <Crown size={34} />
          </div>

          <h2>Premium</h2>
          <h1>$4.99</h1>

          <p className="price-text">
            / month
          </p>

          <div className="plan-features">
            <div>
              <Brain size={18} />
              AI-рекомендації
            </div>

            <div>
              <Trophy size={18} />
              Додаткові XP бонуси
            </div>

            <div>
              <BarChart3 size={18} />
              Розширена статистика
            </div>

            <div>
              <Check size={18} />
              Premium уроки
            </div>

            <div>
              <Check size={18} />
              Додаткові ігри
            </div>
          </div>

          <button
            className="btn primary premium-btn"
            onClick={activatePremium}
          >
            Активувати Premium
          </button>
        </div>
      </div>
    </div>
  )
}

export default Premium