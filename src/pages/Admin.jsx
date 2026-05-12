import { useState } from 'react'
import { auth, db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'

function Admin() {
  const adminEmail = 'nabimissss@gmail.com'

  const user = auth.currentUser

  const [title, setTitle] = useState('')
  const [level, setLevel] = useState('Beginner')
  const [description, setDescription] = useState('')
  const [words, setWords] = useState('')
  const [example, setExample] = useState('')

  if (!user) {
    return (
      <div className="page">
        <div className="auth-card">
          <h1>Потрібен вхід</h1>
          <p>Увійди в акаунт, щоб відкрити адмін-панель.</p>
        </div>
      </div>
    )
  }

  if (user.email !== adminEmail) {
    return (
      <div className="page">
        <div className="auth-card">
          <h1>Доступ заборонено</h1>
          <p>Ця сторінка доступна тільки адміністратору LangMate.</p>
        </div>
      </div>
    )
  }

  const addLesson = async () => {
    if (!title || !description || !words) {
      alert('Заповни назву, опис і слова')
      return
    }

    await addDoc(collection(db, 'lessons'), {
      title,
      level,
      description,
      words: words.split(',').map((word) => word.trim()),
      example,
      createdAt: new Date()
    })

    alert('Урок додано')

    setTitle('')
    setLevel('Beginner')
    setDescription('')
    setWords('')
    setExample('')
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Адмін-панель</h1>
        <p>Тут адміністратор може додавати навчальні матеріали для платформи LangMate.</p>
      </div>

      <div className="auth-card">
        <h1>Додати урок</h1>

        <input
          type="text"
          placeholder="Назва уроку"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option>Beginner</option>
          <option>Elementary</option>
          <option>Intermediate</option>
        </select>

        <input
          type="text"
          placeholder="Опис уроку"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Слова через кому: apple, water, book"
          value={words}
          onChange={(e) => setWords(e.target.value)}
        />

        <input
          type="text"
          placeholder="Приклад речення"
          value={example}
          onChange={(e) => setExample(e.target.value)}
        />

        <button className="btn primary" onClick={addLesson}>
          Зберегти урок
        </button>
      </div>
    </div>
  )
}

export default Admin