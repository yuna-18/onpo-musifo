import React from 'react';

const BookmarkletLink = () => {
  const topPagePath = import.meta.env.VITE_HOME_PATH || '/';

  const handleClick = (e) => {
    e.preventDefault();
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    // ✅ let に変更して使い分け
    let popupUrl;
    if (topPagePath === '/') {
      popupUrl = `http://localhost/favorite/create?title=${title}&url=${url}`;
    } else {
      popupUrl = `https://snowtapir22.sakura.ne.jp${topPagePath}/favorite/create?title=${title}&url=${url}`;
    }

    window.open(popupUrl, 'BookmarkWindow', 'width=600,height=500');
  };

  return (
    <a href="#" onClick={handleClick}>
      音すくいお気に入り機能
    </a>
  );
};

export default BookmarkletLink;