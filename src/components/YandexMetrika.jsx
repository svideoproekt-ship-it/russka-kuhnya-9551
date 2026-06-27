import { useEffect } from 'react';

const YandexMetrika = () => {
  useEffect(() => {
    const counterId = 110199727;
    
    // Создаем скрипт Метрики
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {
          if (document.scripts[j].src === r) { return; }
        }
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
      })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${counterId}', 'ym');

      ym(${counterId}, 'init', {
        ssr:true,
        webvisor:true,
        clickmap:true,
        ecommerce:"dataLayer",
        referrer: document.referrer,
        url: location.href,
        accurateTrackBounce:true,
        trackLinks:true
      });
    `;
    document.head.appendChild(script);
    
    // Создаем noscript fallback (пиксель для отслеживания без JS)
    const noscript = document.createElement('noscript');
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.src = `https://mc.yandex.ru/watch/${counterId}`;
    img.style.position = 'absolute';
    img.style.left = '-9999px';
    img.alt = '';
    div.appendChild(img);
    noscript.appendChild(div);
    document.body.appendChild(noscript);
    
    return () => {
      // Очистка при размонтировании компонента
      if (script.parentNode) {
        document.head.removeChild(script);
      }
      if (noscript.parentNode) {
        document.body.removeChild(noscript);
      }
    };
  }, []);

  return null;
};

export default YandexMetrika;