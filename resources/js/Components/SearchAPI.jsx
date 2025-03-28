import {useEffect} from 'react';
import {modifySearchLinkOpen} from '@/utils/modifySearchLinkOpen';

const GoogleCSE = () => {
  useEffect(() => {
    const isTopPage = () => {
      const path = window.location.pathname.replace(/\/$/, '');
      return path === '' || path === '/otosukui';
    };

    const container = document.getElementById('google-cse-container');
    if (!container || !isTopPage()) return;

    container.innerHTML = '';
    container.style.display = 'block';

    let observer = null;

    // SearchAPI.jsx の render 内を以下のように修正
    const waitForGscResults = () => {
      const interval = setInterval(() => {
        const target = document.querySelector('.gsc-results');
        console.log('checking for .gsc-results:', target);
        if (target) {
          clearInterval(interval);
          console.log('.gsc-results found! Observer set.');
          observer = new MutationObserver(() => {
            console.log('発火');
            modifySearchLinkOpen();
          });
          observer.observe(target, { childList: true, subtree: true });
          modifySearchLinkOpen();
        }
      }, 300);
    };

    const render = () => {
      console.log('render called');
      if (window.google?.search?.cse?.element) {
        window.google.search.cse.element.render({
          div: 'google-cse-container',
          tag: 'searchresults-only',
        });
        waitForGscResults();
      }
    };

    if (!window.__gcse) {
      console.log('初回読み込み：script追加');
      window.__gcse = {
        parsetags: 'explicit',
        callback: render,
      };
      const script = document.createElement('script');
      script.src = 'https://cse.google.com/cse.js?cx=349714df9516f4648';
      script.async = true;
      script.onload = () => {
        console.log('Google CSE script loaded');
      };
      document.body.appendChild(script);
    } else {
      console.log('既に __gcse 定義済み、render 呼び出し');
      render();
    }

    return () => {
      if (container) {
        container.innerHTML = '';
        container.style.display = 'none';
      }
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return null;
};

export default GoogleCSE;