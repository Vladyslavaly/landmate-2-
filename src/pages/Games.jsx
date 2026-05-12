import { useState } from 'react'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db, auth } from '../firebase'

const wordTasks = [
  {
    en: 'Apple',
    correct: 'Яблуко',
    answers: ['Яблуко', 'Вода', 'Книга', 'Друг']
  },
  {
    en: 'Water',
    correct: 'Вода',
    answers: ['Місто', 'Вода', 'Школа', 'Собака']
  },
  {
    en: 'Book',
    correct: 'Книга',
    answers: ['Квітка', 'Книга', 'Дім', 'Молоко']
  },
  {
    en: 'Friend',
    correct: 'Друг',
    answers: ['Сестра', 'Друг', 'Робота', 'Час']
  },
  {
    en: 'Airport',
    correct: 'Аеропорт',
    answers: ['Готель', 'Квиток', 'Аеропорт', 'Багаж']
  }
]

const quizTasks = [
  {
    sentence: 'I like apples',
    correct: 'Мені подобаються яблука',
    answers: [
      'Я читаю книгу',
      'Мені подобаються яблука',
      'Вона пʼє воду',
      'Ми йдемо додому'
    ]
  },
  {
    sentence: 'She drinks water',
    correct: 'Вона пʼє воду',
    answers: [
      'Вона пʼє воду',
      'Він читає книгу',
      'Я люблю яблука',
      'Ми в аеропорту'
    ]
  },
  {
    sentence: 'I have a ticket',
    correct: 'Я маю квиток',
    answers: [
      'Я маю квиток',
      'Я маю багаж',
      'Він має друга',
      'Вона має книгу'
    ]
  },
  {
    sentence: 'We are at the airport',
    correct: 'Ми в аеропорту',
    answers: [
      'Ми вдома',
      'Ми в готелі',
      'Ми в аеропорту',
      'Ми в школі'
    ]
  }
]

const addXP = async (points) => {
  const user = auth.currentUser

  if (!user) {
    alert('Спочатку увійди в акаунт')
    return null
  }

  const userRef = doc(db, 'users', user.uid)
  const userSnap = await getDoc(userRef)

  const currentXP = userSnap.exists()
    ? userSnap.data().xp || 0
    : 0

  const currentStatus = userSnap.exists()
    ? userSnap.data().status || 'Free'
    : 'Free'

  const newXP = currentXP + points

  await setDoc(userRef, {
    email: user.email,
    xp: newXP,
    status: currentStatus
  })

  return newXP
}

function Games() {
  const [wordIndex, setWordIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [message, setMessage] = useState('Обери правильний переклад')
  const [wordScore, setWordScore] = useState(0)

  const [quizIndex, setQuizIndex] = useState(0)
  const [quizSelected, setQuizSelected] = useState(null)
  const [quizMessage, setQuizMessage] = useState('Обери правильний переклад речення')
  const [quizScore, setQuizScore] = useState(0)

  const [xp, setXp] = useState(0)

  const currentWord = wordTasks[wordIndex]
  const currentQuiz = quizTasks[quizIndex]

  const checkAnswer = async (answer) => {
    setSelected(answer)

    if (answer === currentWord.correct) {
      const newXP = await addXP(10)

      if (newXP !== null) {
        setXp(newXP)
      }

      setWordScore(wordScore + 1)
      setMessage('Правильно! +10 XP')

      setTimeout(() => {
        if (wordIndex < wordTasks.length - 1) {
          setWordIndex(wordIndex + 1)
          setSelected(null)
          setMessage('Обери правильний переклад')
        } else {
          setMessage('Гру завершено! Усі слова пройдено.')
        }
      }, 700)
    } else {
      setMessage('Неправильно. Спробуй ще раз.')
    }
  }

  const checkQuiz = async (answer) => {
    setQuizSelected(answer)

    if (answer === currentQuiz.correct) {
      const newXP = await addXP(15)

      if (newXP !== null) {
        setXp(newXP)
      }

      setQuizScore(quizScore + 1)
      setQuizMessage('Правильно! +15 XP')

      setTimeout(() => {
        if (quizIndex < quizTasks.length - 1) {
          setQuizIndex(quizIndex + 1)
          setQuizSelected(null)
          setQuizMessage('Обери правильний переклад речення')
        } else {
          setQuizMessage('Quiz завершено! Усі речення пройдено.')
        }
      }, 700)
    } else {
      setQuizMessage('Не зовсім правильно. Спробуй ще раз.')
    }
  }

  const restartWordGame = () => {
    setWordIndex(0)
    setSelected(null)
    setMessage('Обери правильний переклад')
    setWordScore(0)
  }

  const restartQuiz = () => {
    setQuizIndex(0)
    setQuizSelected(null)
    setQuizMessage('Обери правильний переклад речення')
    setQuizScore(0)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Міні-ігри</h1>
        <p>
          Тренуй слова та речення через ігрові завдання.
          За правильні відповіді нараховується XP.
        </p>
      </div>

      <div className="games-grid">
        <div className="game-card">
          <div className="game-info">
            <span>Word Match</span>
            <span>{wordIndex + 1} / {wordTasks.length}</span>
          </div>

          <h2>{currentWord.en}</h2>
          <p>{message}</p>

          <div className="answer-grid">
            {currentWord.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => checkAnswer(answer)}
                className={selected === answer ? 'answer active' : 'answer'}
                disabled={message.includes('завершено')}
              >
                {answer}
              </button>
            ))}
          </div>

          <div className="game-bottom">
            <p>Правильних відповідей: {wordScore}</p>
            <button className="btn secondary" onClick={restartWordGame}>
              Почати заново
            </button>
          </div>
        </div>

        <div className="game-card">
          <div className="game-info">
            <span>Quick Quiz</span>
            <span>{quizIndex + 1} / {quizTasks.length}</span>
          </div>

          <h2>{currentQuiz.sentence}</h2>
          <p>{quizMessage}</p>

          <div className="answer-grid">
            {currentQuiz.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => checkQuiz(answer)}
                className={quizSelected === answer ? 'answer active' : 'answer'}
                disabled={quizMessage.includes('завершено')}
              >
                {answer}
              </button>
            ))}
          </div>

          <div className="game-bottom">
            <p>Правильних відповідей: {quizScore}</p>
            <button className="btn secondary" onClick={restartQuiz}>
              Почати заново
            </button>
          </div>
        </div>
      </div>

      <div className="xp-panel">
        Поточний XP після ігор: <strong>{xp}</strong>
      </div>
    </div>
  )
}

export default Games