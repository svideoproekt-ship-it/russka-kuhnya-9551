import SEO from '../components/SEO';

function Contacts() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(160deg, #0B2118 0%, #1B4332 40%, #2D6A4F 100%)', 
      color: '#F8F9FA', 
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <SEO 
        title="Контакты — Связаться с автором | Русская Кухня"
        description="Свяжитесь с автором проекта Русская Кухня. Предложения, сотрудничество и вопросы по рецептам."
        keywords="контакты, связь, автор, сотрудничество, обратная связь"
        url="https://russka-kuhnya-9551.vercel.app/contacts"
      />

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#A8E6CF' }}>Контакты</h1>
        
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '30px' }}>
          Мы всегда рады обратной связи! Если у вас есть вопросы по рецептам, предложения по сотрудничеству 
          или вы просто хотите поделиться своим кулинарным успехом — напишите нам.
        </p>

        <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '30px', borderRadius: '16px', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#6BCB77' }}>Электронная почта</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
            📧 <a href="mailto:svideoproekt@gmail.com" style={{ color: '#A8E6CF', textDecoration: 'none' }}>svideoproekt@gmail.com</a>
          </p>
          <p style={{ color: '#B8D4B8', fontSize: '0.9rem' }}>
            Отвечаем в течение 24 часов.
          </p>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '30px', borderRadius: '16px', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#6BCB77' }}>Социальные сети</h2>
          <p style={{ lineHeight: '1.6' }}>
            Подписывайтесь на наши обновления, чтобы первыми узнавать о новых рецептах и кухонных хитростях:
          </p>
          <ul style={{ marginTop: '15px', paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>🔔 <strong>Push-уведомления:</strong> Нажмите на колокольчик на главной странице сайта.</li>
            <li>📱 <strong>Telegram:</strong> (Ссылка появится после создания канала)</li>
            <li> <strong>ВКонтакте:</strong> (Ссылка появится после создания группы)</li>
          </ul>
        </div>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', fontStyle: 'italic', color: '#B8D4B8' }}>
          Спасибо, что готовите вместе с нами!
        </p>
      </div>
    </div>
  );
}

export default Contacts;