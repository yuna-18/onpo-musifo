import React, { useEffect } from 'react';

const GoogleCSE = () => {
  useEffect(() => {
    const renderGoogleCSE = () => {
      // 変更：ターゲットのコンテナIDを "google-cse-container" に変更
      const container = document.getElementById("google-cse-container");
      if (container && container.childElementCount === 0 &&
          window.google && window.google.search && window.google.search.cse && window.google.search.cse.element) {
        window.google.search.cse.element.render({
          div: "google-cse-container", // ここも同様に変更
          tag: 'searchresults-only'
        });
      } else if (!container || container.childElementCount === 0) {
        // googleオブジェクトがまだ準備できていなければ再試行
        setTimeout(renderGoogleCSE, 500);
      }
    };

    if (!window.__gcse) {
      // explicit モードに設定して、コールバックでレンダリング
      window.__gcse = { parsetags: 'explicit', callback: renderGoogleCSE };
      const script = document.createElement('script');
      script.src = 'https://cse.google.com/cse.js?cx=349714df9516f4648';
      script.async = true;
      document.body.appendChild(script);
    } else {
      renderGoogleCSE();
    }
  }, []);

  // Inertia のコンテナとは別の場所に配置しているため、ここでは何もレンダリングしない
  return null;
};

export default GoogleCSE;