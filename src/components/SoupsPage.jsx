// src/components/SoupsPage.jsx
import React, { useState } from 'react';
import './SoupsPage.css';

const soupsData = [
  {
    id: 1,
    title: "Щи из свежей капусты",
    epoch: "Древняя Русь (IX век) - наши дни",
    time: "1 час 30 минут",
    image: "/images/soups/1szhi.png", // ✅ Заменено
    ingredients: [
      { name: "Говядина на кости", amount: 500, unit: "г" },
      { name: "Капуста свежая", amount: 300, unit: "г" },
      { name: "Картофель", amount: 3, unit: "шт" },
      { name: "Морковь", amount: 1, unit: "шт" },
      { name: "Лук репчатый", amount: 1, unit: "шт" },
      { name: "Томатная паста", amount: 2, unit: "ст. л." },
      { name: "Лавровый лист", amount: 1, unit: "шт" },
      { name: "Перец горошком", amount: 5, unit: "шт" },
      { name: "Сметана", amount: 100, unit: "г" },
      { name: "Зелень", amount: 50, unit: "г" }
    ],
    steps: [
      "Сварить бульон из говядины (1 час)",
      "Добавить нашинкованную капусту, варить 15 мин",
      "Добавить картофель кубиками",
      "Сделать зажарку из лука и моркови с томатом",
      "Добавить зажарку в щи, специи",
      "Варить еще 10 минут"
    ],
    history: "Щи — одно из древнейших русских блюд. Петр I любил простые щи и часто предпочитал их изысканным французским супам."
  },
  {
    id: 2,
    title: "Борщ украинский",
    epoch: "XVIII век",
    time: "2 часа",
    image: "/images/soups/2borch.png", // ✅ Заменено
    ingredients: [
      { name: "Свинина/говядина", amount: 600, unit: "г" },
      { name: "Свёкла", amount: 2, unit: "шт" },
      { name: "Капуста", amount: 200, unit: "г" },
      { name: "Картофель", amount: 3, unit: "шт" },
      { name: "Морковь", amount: 1, unit: "шт" },
      { name: "Лук", amount: 1, unit: "шт" },
      { name: "Томатная паста", amount: 3, unit: "ст. л." },
      { name: "Уксус 9%", amount: 1, unit: "ст. л." },
      { name: "Сахар", amount: 1, unit: "ч. л." },
      { name: "Чеснок", amount: 2, unit: "зубчика" }
    ],
    steps: [
      "Сварить мясной бульон",
      "Свёклу нарезать соломкой, потушить с уксусом и сахаром",
      "Добавить капусту и картофель в бульон",
      "Добавить свёклу, зажарку",
      "В конце добавить чеснок и зелень"
    ],
    history: "Екатерина II любила борщ и приказала поварам готовить его регулярно. Императрица Александра Фёдоровна (жена Николая II) также обожала этот суп."
  },
  {
    id: 3,
    title: "Солянка сборная мясная",
    epoch: "XVIII-XIX век",
    time: "1 час 15 минут",
    image: "/images/soups/3soljnka.png", // ✅ Заменено
    ingredients: [
      { name: "Говядина", amount: 300, unit: "г" },
      { name: "Ветчина", amount: 200, unit: "г" },
      { name: "Колбаса копчёная", amount: 200, unit: "г" },
      { name: "Почки говяжьи", amount: 200, unit: "г" },
      { name: "Огурцы солёные", amount: 3, unit: "шт" },
      { name: "Лук", amount: 2, unit: "шт" },
      { name: "Томатная паста", amount: 3, unit: "ст. л." },
      { name: "Маслины", amount: 100, unit: "г" },
      { name: "Каперсы", amount: 50, unit: "г" },
      { name: "Лимон", amount: 1, unit: "шт" }
    ],
    steps: [
      "Сварить бульон из говядины",
      "Мясо нарезать кубиками",
      "Огурцы нарезать, потушить",
      "Лук обжарить с томатом",
      "В бульон добавить мясо, огурцы, зажарку",
      "Добавить маслины, каперсы, лимон",
      "Подавать со сметаной"
    ],
    history: "Любимое блюдо Ф.М. Достоевского. Александр Пушкин также упоминает солянку в своих произведениях как популярное блюдо в трактирах."
  },
  {
    id: 4,
    title: "Рассольник домашний",
    epoch: "XV век",
    time: "1 час 30 минут",
    image: "/images/soups/4rassol.png", // ✅ Заменено
    ingredients: [
      { name: "Говяжьи почки", amount: 400, unit: "г" },
      { name: "Перловая крупа", amount: 100, unit: "г" },
      { name: "Огурцы солёные", amount: 3, unit: "шт" },
      { name: "Картофель", amount: 3, unit: "шт" },
      { name: "Морковь", amount: 1, unit: "шт" },
      { name: "Лук", amount: 1, unit: "шт" },
      { name: "Рассол огуречный", amount: 1, unit: "стакан" },
      { name: "Сметана", amount: 100, unit: "г" }
    ],
    steps: [
      "Почки вымочить, отварить (1 час)",
      "Перловку отварить отдельно",
      "Огурцы нарезать, потушить",
      "В бульон добавить картофель",
      "Добавить почки, перловку, огурцы",
      "Влить рассол, довести до кипения",
      "Добавить зажарку"
    ],
    history: "Иван Грозный очень любил рассольник. Это был один из основных супов на царском столе в XVI веке."
  },
  {
    id: 5,
    title: "Окрошка на квасу",
    epoch: "XVIII век",
    time: "40 минут",
    image: "/images/soups/5okroshka.png", // ✅ Заменено
    ingredients: [
      { name: "Говядина отварная", amount: 300, unit: "г" },
      { name: "Редис", amount: 200, unit: "г" },
      { name: "Огурцы свежие", amount: 3, unit: "шт" },
      { name: "Картофель варёный", amount: 3, unit: "шт" },
      { name: "Яйца", amount: 4, unit: "шт" },
      { name: "Зелень (укроп, лук)", amount: 100, unit: "г" },
      { name: "Квас хлебный", amount: 1.5, unit: "л" },
      { name: "Горчица", amount: 1, unit: "ст. л." },
      { name: "Сметана", amount: 100, unit: "г" }
    ],
    steps: [
      "Все ингредиенты нарезать кубиками",
      "Смешать мясо, овощи, яйца",
      "Добавить мелко нарезанную зелень",
      "Залить квасом",
      "Добавить горчицу, соль",
      "Подавать со сметаной",
      "Обязательно охладить"
    ],
    history: "Любимое летнее блюдо А.С. Пушкина, который посвятил окрошке строки в своих письмах. Также её обожал В.И. Ленин."
  },
  {
    id: 6,
    title: "Щи суточные (кислые)",
    epoch: "X век",
    time: "2 часа + сутки настаивания",
    image: "/images/soups/6szhi.png", // ✅ Добавлено
    ingredients: [
      { name: "Говядина", amount: 500, unit: "г" },
      { name: "Капуста квашеная", amount: 400, unit: "г" },
      { name: "Капуста свежая", amount: 200, unit: "г" },
      { name: "Грибы сушёные", amount: 50, unit: "г" },
      { name: "Лук", amount: 1, unit: "шт" },
      { name: "Мука", amount: 1, unit: "ст. л." },
      { name: "Сметана", amount: 100, unit: "г" }
    ],
    steps: [
      "Сварить бульон с грибами",
      "Квашеную капусту потушить отдельно",
      "Добавить свежую капусту в бульон",
      "Добавить тушёную квашеную капусту",
      "Варить 30 минут",
      "Оставить на сутки в прохладном месте",
      "Перед подачей разогреть"
    ],
    history: "Любимое блюдо Николая II и всей царской семьи. Суточные щи считались особенно вкусными после настаивания."
  },
  {
    id: 7,
    title: "Ботвинья холодная",
    epoch: "XVII век",
    time: "1 час 30 минут",
    image: "/images/soups/7botvinya.png", // ✅ Добавлено
    ingredients: [
      { name: "Свёкла молодая с ботвой", amount: 500, unit: "г" },
      { name: "Щавель", amount: 200, unit: "г" },
      { name: "Шпинат", amount: 200, unit: "г" },
      { name: "Осетр/сёмга", amount: 400, unit: "г" },
      { name: "Огурцы свежие", amount: 2, unit: "шт" },
      { name: "Хрен тёртый", amount: 2, unit: "ст. л." },
      { name: "Квас хлебный", amount: 1, unit: "л" },
      { name: "Лёд", amount: 1, unit: "пакет" }
    ],
    steps: [
      "Отварить рыбу, нарезать",
      "Ботву свёклы, щавель, шпинат отварить",
      "Протереть зелень через сито",
      "Добавить нарезанные огурцы",
      "Залить квасом",
      "Добавить рыбу, хрен",
      "Подавать со льдом"
    ],
    history: "Любимое летнее блюдо Александра III. Также ботвинью очень любил А.П. Чехов, упоминавший её в рассказах."
  },
  {
    id: 8,
    title: "Калья с рыбой",
    epoch: "XVI-XVII век",
    time: "1 час 15 минут",
    image: "/images/soups/8kalya.png", // ✅ Добавлено
    ingredients: [
      { name: "Судак/щука", amount: 600, unit: "г" },
      { name: "Огурцы солёные", amount: 3, unit: "шт" },
      { name: "Лук", amount: 1, unit: "шт" },
      { name: "Рассол огуречный", amount: 1, unit: "стакан" },
      { name: "Корень петрушки", amount: 1, unit: "шт" },
      { name: "Перец чёрный", amount: 5, unit: "шт" },
      { name: "Икра красная", amount: 50, unit: "г" }
    ],
    steps: [
      "Рыбу очистить, нарезать",
      "Огурцы нарезать кубиками",
      "Сварить бульон из рыбы",
      "Добавить огурцы, лук",
      "Влить рассол",
      "Варить 20 минут",
      "Добавить специи",
      "Подавать с икрой"
    ],
    history: "Калья была популярна при дворе Ивана Грозного. Упоминается в «Домострое» как праздничное блюдо."
  },
  {
    id: 9,
    title: "Похлёбка гороховая",
    epoch: "Древняя Русь",
    time: "2 часа",
    image: "/images/soups/9pokhlebka.png", // ✅ Добавлено
    ingredients: [
      { name: "Горох колотый", amount: 300, unit: "г" },
      { name: "Говядина/свинина", amount: 400, unit: "г" },
      { name: "Картофель", amount: 2, unit: "шт" },
      { name: "Морковь", amount: 1, unit: "шт" },
      { name: "Лук", amount: 1, unit: "шт" },
      { name: "Чеснок", amount: 2, unit: "зубчика" },
      { name: "Гренки из чёрного хлеба", amount: 100, unit: "г" }
    ],
    steps: [
      "Горох замочить на 2 часа",
      "Сварить мясной бульон",
      "Добавить горох, варить 1 час",
      "Добавить картофель",
      "Сделать зажарку",
      "Добавить в похлёбку",
      "Подавать с гренками и чесноком"
    ],
    history: "Основное блюдо простого народа. Пётр I во время своих путешествий часто ел гороховую похлёбку с солдатами."
  },
  {
    id: 10,
    title: "Тюря луковая",
    epoch: "X-XV век",
    time: "30 минут",
    image: "/images/soups/10tyura.png", // ✅ Добавлено
    ingredients: [
      { name: "Лук репчатый", amount: 4, unit: "шт" },
      { name: "Хлеб чёрный", amount: 200, unit: "г" },
      { name: "Квас", amount: 1, unit: "л" },
      { name: "Соль", amount: 1, unit: "ч. л." },
      { name: "Хрен", amount: 1, unit: "ст. л." },
      { name: "Зелень", amount: 50, unit: "г" }
    ],
    steps: [
      "Лук нарезать кольцами",
      "Хлеб нарезать кубиками, подсушить",
      "Залить лук квасом",
      "Добавить хлеб",
      "Посолить",
      "Оставить на 15 минут",
      "Подавать холодным"
    ],
    history: "Древнейшее блюдо бедных слоёв населения. Упоминается в летописях времен Владимира Красное Солнышко."
  },
  {
    id: 11,
    title: "Свекольник холодный",
    epoch: "XIX век",
    time: "1 час",
    image: "/images/soups/11svetolnik.png", // ✅ Добавлено
    ingredients: [
      { name: "Свёкла", amount: 4, unit: "шт" },
      { name: "Огурцы свежие", amount: 3, unit: "шт" },
      { name: "Яйца варёные", amount: 4, unit: "шт" },
      { name: "Зелень (укроп, лук)", amount: 100, unit: "г" },
      { name: "Кефир/квас", amount: 1, unit: "л" },
      { name: "Сметана", amount: 100, unit: "г" },
      { name: "Горчица", amount: 1, unit: "ч. л." }
    ],
    steps: [
      "Свёклу отварить, натереть",
      "Огурцы нарезать кубиками",
      "Яйца нарезать",
      "Смешать свёклу с кефиром",
      "Добавить огурцы, яйца, зелень",
      "Добавить горчицу",
      "Подавать холодным со сметаной"
    ],
    history: "Популярное летнее блюдо в помещичьих усадьбах XIX века. Любимое блюдо И.С. Тургенева."
  },
  {
    id: 12,
    title: "Грибной суп из сушёных грибов",
    epoch: "XV-XVI век",
    time: "1 час 30 минут",
    image: "/images/soups/12gribniy.png", // ✅ Добавлено
    ingredients: [
      { name: "Грибы сушёные", amount: 100, unit: "г" },
      { name: "Картофель", amount: 3, unit: "шт" },
      { name: "Перловая крупа", amount: 50, unit: "г" },
      { name: "Лук", amount: 1, unit: "шт" },
      { name: "Морковь", amount: 1, unit: "шт" },
      { name: "Сметана", amount: 100, unit: "г" },
      { name: "Зелень", amount: 50, unit: "г" }
    ],
    steps: [
      "Грибы замочить на 2 часа",
      "Сварить грибы (40 мин)",
      "Добавить перловку",
      "Добавить картофель",
      "Сделать зажарку",
      "Добавить в суп",
      "Подавать со сметаной"
    ],
    history: "Постное блюдо, популярное во все времена. Екатерина II любила грибные супы из белых грибов."
  },
  {
    id: 13,
    title: "Лапша домашняя с курицей",
    epoch: "XVIII век",
    time: "1 час 30 минут",
    image: "/images/soups/13lapsha.png", // ✅ Добавлено
    ingredients: [
      { name: "Курица", amount: 1, unit: "шт" },
      { name: "Мука", amount: 2, unit: "стакана" },
      { name: "Яйца", amount: 2, unit: "шт" },
      { name: "Вода", amount: 100, unit: "мл" },
      { name: "Морковь", amount: 1, unit: "шт" },
      { name: "Лук", amount: 1, unit: "шт" },
      { name: "Зелень", amount: 50, unit: "г" }
    ],
    steps: [
      "Сварить куриный бульон (1 час)",
      "Приготовить тесто для лапши",
      "Раскатать, нарезать лапшу",
      "Добавить лапшу в бульон",
      "Варить 10 минут",
      "Добавить овощи",
      "Посыпать зеленью"
    ],
    history: "Любимое блюдо Николая Гоголя, который упоминает его в «Мёртвых душах». Также этот суп любила А.А. Ахматова."
  },
  {
    id: 14,
    title: "Хакасский суп с бараниной",
    epoch: "Традиционная сибирская кухня",
    time: "1 час 45 минут",
    image: "/images/soups/14hakasskiy.png", // ✅ Добавлено
    ingredients: [
      { name: "Баранина", amount: 500, unit: "г" },
      { name: "Картофель", amount: 4, unit: "шт" },
      { name: "Морковь", amount: 1, unit: "шт" },
      { name: "Лук", amount: 1, unit: "шт" },
      { name: "Перец острый", amount: 1, unit: "шт" },
      { name: "Чеснок", amount: 3, unit: "зубчика" },
      { name: "Зира", amount: 1, unit: "ч. л." },
      { name: "Кориандр", amount: 1, unit: "ч. л." }
    ],
    steps: [
      "Баранину нарезать, обжарить",
      "Сварить бульон (1 час)",
      "Добавить картофель",
      "Добавить овощи",
      "Добавить специи, перец",
      "В конце добавить чеснок",
      "Дать настояться"
    ],
    history: "Традиционное блюдо сибирских народов. Популярно среди старообрядцев, переселившихся в Сибирь."
  },
  {
    id: 15,
    title: "Уха из осетра",
    epoch: "XVI-XVII век",
    time: "1 час",
    image: "/images/soups/15uxa.png", // ✅ Добавлено
    ingredients: [
      { name: "Осётр", amount: 800, unit: "г" },
      { name: "Вода", amount: 2, unit: "л" },
      { name: "Картофель", amount: 3, unit: "шт" },
      { name: "Морковь", amount: 1, unit: "шт" },
      { name: "Лук", amount: 1, unit: "шт" },
      { name: "Лавровый лист", amount: 2, unit: "шт" },
      { name: "Перец горошком", amount: 5, unit: "шт" },
      { name: "Водка", amount: 50, unit: "мл" },
      { name: "Зелень укропа", amount: 50, unit: "г" }
    ],
    steps: [
      "Рыбу очистить, нарезать порционно",
      "Сварить бульон из головы и хвоста (30 мин)",
      "Процедить бульон",
      "Добавить картофель, морковь",
      "Добавить куски рыбы",
      "Варить 15 минут",
      "Добавить специи, зелень",
      "Перед подачей влить водку (традиция)"
    ],
    history: "Царь Алексей Михайлович (отец Петра I) обожал уху. При его дворе существовала специальная должность — «уховар»."
  }
];

const SoupsPage = () => {
  const [selectedSoup, setSelectedSoup] = useState(null);

  const openRecipe = (soup) => {
    setSelectedSoup(soup);
  };

  const closeRecipe = () => {
    setSelectedSoup(null);
  };

  return (
    <div className="soups-page">
      <header className="page-header">
        <h1>🍲 15 Рецептов супов русской кухни</h1> 
      </header>  
      
      <div className="cards-grid">
        {soupsData.map((soup) => (
          <div key={soup.id} className="card">
            <img 
              src={soup.image} 
              alt={soup.title} 
              className="card-image"
              onClick={() => openRecipe(soup)}
              style={{ cursor: 'pointer' }}
            />
            <div className="card-content">
              <h3>{soup.title}</h3>
              <p className="meta-info">
                <span>⏳ {soup.time}</span>
                <span>📜 {soup.epoch}</span>
              </p>
              <div className="card-actions">
                <button onClick={() => openRecipe(soup)}>
                  👁️ Рецепт
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedSoup && (
        <div className="modal-overlay" onClick={closeRecipe}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeRecipe}>✕</button>
            
            <h2>{selectedSoup.title}</h2>
            
            <img 
              src={selectedSoup.image} 
              alt={selectedSoup.title} 
              className="modal-image" 
            />
            
            <div className="recipe-details">
              <section>
                <h4>📝 Ингредиенты:</h4>
                <ul>
                  {selectedSoup.ingredients.map((ing, idx) => (
                    <li key={idx}>{ing.name} — {ing.amount} {ing.unit}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h4>👨‍🍳 Приготовление:</h4>
                <ol>
                  {selectedSoup.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </section>

              <section className="history-block">
                <h4>📚 Историческая справка:</h4>
                <p>{selectedSoup.history}</p>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoupsPage;