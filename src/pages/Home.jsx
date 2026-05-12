import { Link } from 'react-router-dom'

import {
  BookOpen,
  Gamepad2,
  Brain,
  Trophy,
  Star,
  Mail,
  Phone,
 MapPin,
  Crown,
  Sparkles,
  UserPlus,
  ArrowRight,
  MessageCircle
} from 'lucide-react'

function Home() {
  return (
    <div className="home-page">
      <section className="landing-hero hero-new">
  <div className="landing-left">
    <div className="badge">
      <Sparkles size={16} />
      AI English Learning Platform
    </div>

    <h1>
      Англійська, яка
      <br />
      підлаштовується під тебе
    </h1>

    <p>
      LangMate допомагає вчити слова, проходити короткі уроки,
      грати в міні-ігри та отримувати AI-рекомендації на основі
      твого прогресу.
    </p>

    <div className="hero-actions">
      <Link to="/lessons" className="btn primary">
        Почати навчання
        <ArrowRight size={18} />
      </Link>

      <Link to="/premium" className="btn secondary">
        Спробувати Premium
      </Link>
    </div>

    <div className="hero-benefits">
      <div>
        <strong>10 хв</strong>
        <span>на один урок</span>
      </div>

      <div>
        <strong>+XP</strong>
        <span>за кожне завдання</span>
      </div>

      <div>
        <strong>AI</strong>
        <span>підбір тем</span>
      </div>
    </div>
  </div>

  <div className="hero-product">
    <img
      className="hero-product-image"
      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop"
      alt=""
    />

    
  </div>
</section>

      <section className="feature-section">
        <div className="section-title">
          <h2>Що є у LangMate?</h2>
          <p>Усе, що потрібно для зручного та мотивуючого вивчення англійської.</p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <BookOpen />
            <h3>Інтерактивні уроки</h3>
            <p>Короткі пояснення, приклади речень, слова та практичні вправи.</p>
          </div>

          <div className="feature-card">
            <Gamepad2 />
            <h3>Навчальні ігри</h3>
            <p>Word Match і Quiz допомагають закріплювати лексику без нудного зубріння.</p>
          </div>

          <div className="feature-card">
            <Brain />
            <h3>AI-рекомендації</h3>
            <p>Система аналізує XP, прогрес і радить, які теми краще повторити.</p>
          </div>

          <div className="feature-card">
            <Trophy />
            <h3>XP та досягнення</h3>
            <p>Користувач отримує бали, відкриває бейджі та бачить власний прогрес.</p>
          </div>
        </div>
      </section>

      <section className="how-section">
        <div className="section-title">
          <h2>Як це працює?</h2>
          <p>Простий шлях користувача від реєстрації до стабільного прогресу.</p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <UserPlus />
            <h3>1. Створи акаунт</h3>
            <p>Зареєструйся та отримай власний профіль.</p>
          </div>

          <div className="step-card">
            <BookOpen />
            <h3>2. Проходь уроки</h3>
            <p>Обирай тему, вивчай слова та приклади.</p>
          </div>

          <div className="step-card">
            <Gamepad2 />
            <h3>3. Грай і практикуй</h3>
            <p>Закріплюй знання через ігрові завдання.</p>
          </div>

          <div className="step-card">
            <Brain />
            <h3>4. Отримуй поради</h3>
            <p>AI підкаже, що повторити далі.</p>
          </div>
        </div>
      </section>

      <section className="reviews-section">
        <div className="section-title">
          <h2>Відгуки користувачів</h2>
          <p>Невеликий слайдер з думками учнів про платформу.</p>
        </div>

        <div className="review-slider">
          <button className="slider-btn">‹</button>

          <div className="review-card">
            <div className="review-top">
              <div className="review-avatar">О</div>
              <div>
                <h3>Оля, студентка</h3>
                <div className="stars-text">★★★★★</div>
              </div>
            </div>
            <p>“Мені подобається, що навчання схоже на гру. Хочеться заходити щодня.”</p>
          </div>

          <div className="review-card">
            <div className="review-top">
              <div className="review-avatar">М</div>
              <div>
                <h3>Максим, початківець</h3>
                <div className="stars-text">★★★★★</div>
              </div>
            </div>
            <p>“AI підказує, що повторити. Я бачу слабкі місця і швидше рухаюсь далі.”</p>
          </div>

          <div className="review-card">
            <div className="review-top">
              <div className="review-avatar">А</div>
              <div>
                <h3>Анна, користувачка</h3>
                <div className="stars-text">★★★★★</div>
              </div>
            </div>
            <p>“Короткі уроки і XP дуже мотивують. Це цікавіше, ніж звичайний підручник.”</p>
          </div>

          <button className="slider-btn">›</button>
        </div>
      </section>

      <section className="premium-home-banner">
        <div>
          <div className="badge light-badge">
            <Crown size={16} />
            Premium
          </div>

          <h2>Premium відкриває більше можливостей</h2>

          <p>
            Отримай доступ до додаткових уроків, розширеної статистики,
            AI-плану навчання, більшої кількості ігор та бонусного XP.
          </p>

          <Link to="/premium" className="btn premium-light">
            Спробувати Premium
          </Link>
        </div>

        <div className="premium-phone">
          <Crown size={54} />
          <h3>Premium Plan</h3>
          <p>AI-план навчання</p>
          <p>Більше XP</p>
          <p>Детальна статистика</p>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <h2>LangMate</h2>
          <p>
            Платформа для вивчення англійської мови з AI,
            гейміфікацією та персональним прогресом.
          </p>

          <div className="socials">
            
          </div>
        </div>

        <div>
          <h3>Платформа</h3>
          <Link to="/lessons">Уроки</Link>
          <Link to="/games">Ігри</Link>
          <Link to="/profile">Профіль</Link>
          <Link to="/premium">Premium</Link>
        </div>

        <div>
          <h3>Компанія</h3>
          <a href="#">Про нас</a>
          <a href="#">Підтримка</a>
          <a href="#">Відгуки</a>
          <a href="#">Політика конфіденційності</a>
        </div>

        <div>
          <h3>Зв’язатися з нами</h3>
          <p><Mail size={16} /> support@langmate.com</p>
          <p><Phone size={16} /> +380 99 123 45 67</p>
          <p><MapPin size={16} /> Київ, Україна</p>
        </div>
      </footer>
    </div>
  )
}

export default Home