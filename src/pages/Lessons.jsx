import { useEffect, useState } from 'react'
import { db, auth } from '../firebase'
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'
import { Link } from 'react-router-dom'

function Lessons() {
  const [lessons, setLessons] = useState([])

  useEffect(() => {
    const loadLessons = async () => {
      const querySnapshot = await getDocs(collection(db, 'lessons'))

      const lessonsData = []

      querySnapshot.forEach((doc) => {
        lessonsData.push({
          id: doc.id,
          ...doc.data()
        })
      })

      setLessons(lessonsData)
    }

    loadLessons()
  }, [])

  const completeLesson = async () => {
    const user = auth.currentUser

    if (!user) {
      alert('Спочатку увійди в акаунт')
      return
    }

    const userRef = doc(db, 'users', user.uid)
    const userSnap = await getDoc(userRef)

    let currentXP = 0

    if (userSnap.exists()) {
      currentXP = userSnap.data().xp || 0
    }

    const newXP = currentXP + 10

    await setDoc(userRef, {
      email: user.email,
      xp: newXP
    })

    alert('Урок завершено! +10 XP')
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Уроки англійської</h1>
        <p>Навчальні матеріали, які додаються через адмін-панель LangMate.</p>
      </div>

      <div className="lesson-grid">
        {lessons.map((lesson) => (
          <div className="lesson-card" key={lesson.id}>
            <div className="lesson-top">
              <span>{lesson.level}</span>
              <span>+10 XP</span>
            </div>

            <h2>{lesson.title}</h2>

            <p>{lesson.description}</p>

            {lesson.example && (
              <div className="example-box">
                <strong>Приклад:</strong>
                <p>{lesson.example}</p>
              </div>
            )}

            <div className="words">
              {lesson.words?.map((word, index) => (
                <span key={index}>{word}</span>
              ))}
            </div>

            <Link className="btn primary" to={`/lesson/${lesson.id}`}>
  Відкрити урок
</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Lessons