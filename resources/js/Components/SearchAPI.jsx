import React, { useEffect } from 'react';

const GoogleCSE = () => {
  useEffect(() => {
    // 既に同じスクリプトが読み込まれていないかチェック
    if (!document.querySelector('script[src="https://cse.google.com/cse.js?cx=349714df9516f4648"]')) {
      const script = document.createElement('script');
      script.src = 'https://cse.google.com/cse.js?cx=349714df9516f4648';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return <div className="gcse-searchresults-only"></div>;
};

export default GoogleCSE;