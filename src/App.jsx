import './App.css'

import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from 'react-router-dom'

import Home from './pages/Home'
import Lessons from './pages/Lessons'
import Games from './pages/Games'
import Profile from './pages/Profile'
import Auth from './pages/Auth'
import Admin from './pages/Admin'
import Premium from './pages/Premium'
import LessonDetails from './pages/LessonDetails'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="top-navbar">
          <div className="nav-inner">
            <div className="logo">LangMate</div>

            <nav className="menu">
              <NavLink to="/">Головна</NavLink>
              <NavLink to="/lessons">Уроки</NavLink>
              <NavLink to="/games">Ігри</NavLink>
              <NavLink to="/profile">Профіль</NavLink>
              <NavLink to="/premium">Premium</NavLink>
              <NavLink to="/auth">Вхід</NavLink>
              <NavLink to="/admin">Адмін</NavLink>
            </nav>
          </div>
        </header>

        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/lesson/:id" element={<LessonDetails />} />
            <Route path="/games" element={<Games />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/premium" element={<Premium />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App