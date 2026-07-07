import SEO from '../components/SEO';

function Privacy() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(160deg, #0B2118 0%, #1B4332 40%, #2D6A4F 100%)', 
      color: '#F8F9FA', 
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <SEO 
        title="Политика конфиденциальности | Русская Кухня"
        description="Политика конфиденциальности сайта Русская Кухня. Как мы собираем, используем и защищаем ваши данные."
        keywords="политика конфиденциальности, cookies, персональные данные, защита данных"
        url="https://russka-kuhnya-9551.vercel.app/privacy"
      />

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#A8E6CF' }}>Политика конфиденциальности</h1>
        <p style={{ color: '#B8D4B8', marginBottom: '30px' }}>Последнее обновление: Июль 2026 г.</p>
        
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#6BCB77' }}>1. Общие положения</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
          Настоящая Политика конфиденциальности описывает, как сайт «Русская Кухня» (далее — Сайт) собирает, 
          использует и защищает информацию, которую вы предоставляете при использовании нашего ресурса.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#6BCB77' }}>2. Какие данные мы собираем</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
          Мы можем собирать следующие типы данных:
        </p>
        <ul style={{ lineHeight: '1.6', paddingLeft: '20px', marginBottom: '20px' }}>
          <li><strong>Технические данные:</strong> IP-адрес, тип браузера, операционная система (собирается автоматически через Яндекс.Метрику и Google Analytics для улучшения работы сайта).</li>
          <li><strong>Данные подписки:</strong> Если вы подписываетесь на push-уведомления или email-рассылку, мы сохраняем ваш email или ID устройства для отправки новостей.</li>
        </ul>

        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#6BCB77' }}>3. Использование файлов Cookie</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
          Сайт использует файлы cookie для сохранения ваших настроек, анализа трафика и работы push-уведомлений. 
          Вы можете отключить cookie в настройках вашего браузера, но это может повлиять на функциональность сайта.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#6BCB77' }}>4. Передача данных третьим лицам</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
          Мы не продаем и не передаем ваши личные данные третьим лицам, за исключением случаев, предусмотренных законодательством РФ.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#6BCB77' }}>5. Контакты</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
          Если у вас есть вопросы по поводу данной Политики конфиденциальности, пожалуйста, свяжитесь с нами по адресу: 
          <a href="mailto:svideoproekt@gmail.com" style={{ color: '#A8E6CF', marginLeft: '5px' }}>svideoproekt@gmail.com</a>
        </p>
      </div>
    </div>
  );
}

export default Privacy;