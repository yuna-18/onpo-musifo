import React from 'react';

const BookmarkletLink = () => {
  const handleClick = (e) => {
    e.preventDefault();
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const popupUrl = `http://localhost/favorite/create?title=${title}&url=${url}`;
    window.open(popupUrl, 'BookmarkWindow', 'width=600,height=500');
  };

  return (
    <a href="#" onClick={handleClick}>
      音すくいお気に入り機能
    </a>
  );
};

export default BookmarkletLink;
// var popupUrl = 'https://snowtapir22.sakura.ne.jp/otosukui/favorite/create?title=' + title + '&url=' + url;<br />