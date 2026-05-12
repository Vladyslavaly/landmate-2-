import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { auth, db } from '../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

function LessonDetails() {
  const { id } = useParams()
  const [lesson, setLesson] = useState(null)

  const [answer1, setAnswer1] = useState('')
  const [answer2, setAnswer2] = useState('')
  const [selectedWord, setSelectedWord] = useState('')
  const [selectedTranslation, setSelectedTranslation] = useState('')
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    const loadLesson = async () => {
      const lessonRef = doc(db, 'lessons', id)
      const lessonSnap = await getDoc(lessonRef)

      if (lessonSnap.exists()) {
        setLesson(lessonSnap.data())
      }
    }

    loadLesson()
  }, [id])

  const completeLesson = async () => {
    const user = auth.currentUser

    if (!user) {
      alert('Спочатку увійди в акаунт')
      return
    }

    if (!answer1 || !answer2 || !selectedWord || !selectedTranslation) {
      alert('Виконай усі завдання уроку')
      return
    }

    const userRef = doc(db, 'users', user.uid)
    const userSnap = await getDoc(userRef)

    const currentXP = userSnap.exists()
      ? userSnap.data().xp || 0
      : 0

    const currentStatus = userSnap.exists()
      ? userSnap.data().status || 'Free'
      : 'Free'

    await setDoc(userRef, {
      email: user.email,
      xp: currentXP + 20,
      status: currentStatus
    })

    setFinished(true)
    alert('Урок завершено! +20 XP')
  }

  if (!lesson) {
    return (
      <div className="page">
        <h1>Урок завантажується...</h1>
      </div>
    )
  }

  return (
    <div className="page">
      <Link className="btn secondary" to="/lessons">
        Назад до уроків
      </Link>

      <div className="lesson-detail-card active-lesson">
        <span className="lesson-level">{lesson.level}</span>

        <h1>{lesson.title}</h1>
        <p>{lesson.description}</p>

        <div className="example-box">
          <strong>Приклад речення:</strong>
          <p>{lesson.example || 'Приклад не додано.'}</p>
        </div>

        <h3>Слова уроку</h3>

        <div className="words">
          {lesson.words?.map((word, index) => (
            <span key={index}>{word}</span>
          ))}
        </div>

        <div className="tasks-block">
          <h2>Практичні завдання</h2>

          <div className="task-card">
            <span>Завдання 1</span>
            <h3>Обери правильний переклад слова “ticket”</h3>

            <div className="answer-grid">
              {['готель', 'квиток', 'багаж', 'аеропорт'].map((item) => (
                <button
                  key={item}
                  className={selectedWord === item ? 'answer active' : 'answer'}
                  onClick={() => setSelectedWord(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="task-card">
            <span>Завдання 2</span>
            <h3>Напиши англійською слово “готель”</h3>

            <input
              className="lesson-input"
              type="text"
              placeholder="Наприклад: hotel"
              value={answer1}
              onChange={(e) => setAnswer1(e.target.value)}
            />
          </div>

          <div className="task-card">
            <span>Завдання 3</span>
            <h3>Обери правильний переклад речення</h3>
            <p className="task-sentence">I have a ticket to London.</p>

            <div className="answer-grid">
              {[
                'Я маю квиток до Лондона',
                'Я живу в Лондоні',
                'Мені подобається готель',
                'Я загубила багаж'
              ].map((item) => (
                <button
                  key={item}
                  className={selectedTranslation === item ? 'answer active' : 'answer'}
                  onClick={() => setSelectedTranslation(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="task-card">
            <span>Завдання 4</span>
            <h3>Склади коротке речення зі словом “airport”</h3>

            <input
              className="lesson-input"
              type="text"
              placeholder="Наприклад: I am at the airport."
              value={answer2}
              onChange={(e) => setAnswer2(e.target.value)}
            />
          </div>
        </div>

        {finished && (
          <div className="success-box">
            Урок виконано. XP додано до профілю.
          </div>
        )}

        <button className="btn primary" onClick={completeLesson}>
          Завершити урок +20 XP
        </button>
      </div>
    </div>
  )
}

export default LessonDetails