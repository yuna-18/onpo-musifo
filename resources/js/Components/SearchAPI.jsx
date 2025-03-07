import React, { useEffect } from 'react';

const GoogleCSE = () => {
  useEffect(() => {
    // 既に同じスクリプトが読み込まれていないかチェック
    if (!document.querySelector('script[src="https://cse.google.com/cse.js?cx=349714df9516f4648"]')) {
      const script = document.createElement('script');
      script.src = 'https://cse.google.com/cse.js?cx=349714df9516f4648';
      script.async = true;
      script.onload = () => {
        // スクリプト読み込み完了後、CSE をレンダリング
        if (window.google && window.google.search) {
          window.google.search.cse.element.render({
            div: "google_search",
            tag: 'search'
          });
        }
      };
      document.body.appendChild(script);
    } else {
      // スクリプトが既に読み込まれている場合は、すぐにレンダリングを試みる
      if (window.google && window.google.search) {
        window.google.search.cse.element.render({
          div: "google_search",
          tag: 'search'
        });
      }
    }
  }, []); // コンポーネントのマウント時のみ実行

  // CSE の結果が表示される div に id を付与
  return <div id="google_search" className="gcse-searchresults-only"></div>;
};

export default GoogleCSE;