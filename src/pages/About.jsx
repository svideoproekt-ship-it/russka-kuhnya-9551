import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';

function About() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(160deg, #0B2118 0%, #1B4332 40%, #2D6A4F 100%)', 
      color: '#F8F9FA', 
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <SEO 
        title="О проекте Русская Кухня — История и миссия | Русская Кухня"
        description="Узнайте историю создания сайта Русская Кухня. Наша миссия — сохранить традиционные бабушкины рецепты для будущих поколений."
        keywords="о нас, русская кухня, история проекта, миссия сайта, автор рецептов"
        url="https://russka-kuhnya-9551.vercel.app/about"
      />
      <Breadcrumbs />

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#A8E6CF' }}>О проекте "Русская Кухня"</h1>
        
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '30px' }}>
          Приветствую вас, дорогие гости! Меня зовут Виктор, и я рад видеть вас на страницах нашего кулинарного проекта.
        </p>

        <h2 style={{ fontSize: '1.8rem', marginBottom: '15px', color: '#6BCB77' }}>Наша история</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '30px' }}>
          Всё началось с простой идеи: сохранить те самые вкусы детства. Рецепты, которые передавались из поколения в поколение, 
          часто теряются в современном ритме жизни. Этот сайт создан, чтобы собрать в одном месте лучшие традиционные рецепты 
          русской кухни — от наваристых щей и классического борща до румяных пирожков и ароматных блинов.
        </p>

        <h2 style={{ fontSize: '1.8rem', marginBottom: '15px', color: '#6BCB77' }}>Наша миссия</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '30px' }}>
          Мы верим, что еда — это не просто способ утолить голод, а настоящая культура и связь поколений. 
          Наша цель — сделать традиционную русскую кухню доступной, понятной и любимой для каждой семьи. 
          Каждый рецепт на сайте проверен, снабжён пошаговыми фото и маленькими хитростями, которые помогут 
          вам приготовить блюдо так, как готовила бы ваша бабушка.
        </p>

        <h2 style={{ fontSize: '1.8rem', marginBottom: '15px', color: '#6BCB77' }}>Почему нам можно доверять</h2>
        <ul style={{ lineHeight: '1.6', paddingLeft: '20px', marginBottom: '30px' }}>
          <li>✅ <strong>Только проверенные рецепты:</strong> Мы не публикуем ничего, что не приготовили бы сами.</li>
          <li>✅ <strong>Пошаговые инструкции:</strong> Даже новичок справится с нашими подробными гайдами.</li>
          <li>✅ <strong>Уважение к традициям:</strong> Мы сохраняем аутентичность, адаптируя рецепты под современные реалии.</li>
        </ul>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', fontStyle: 'italic', color: '#B8D4B8' }}>
          Готовьте с душой, и пусть на вашем столе всегда будет вкусно!
        </p>
      </div>
    </div>
  );
}

export default About;