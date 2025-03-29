import React, {useState} from 'react';
import {Button, Stack, Textarea} from 'smarthr-ui';

const BookmarkletCodeBlock = () => {
  const [copied, setCopied] = useState(false);

  const bookmarkletCode = `javascript:(function(){
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    let popupUrl;
    const homePath = "${import.meta.env.VITE_HOME_PATH || '/'}";
  
    if (homePath === '/') {
      popupUrl = "http://localhost/favorite/create?title=" + title + "&url=" + url;
    } else {
      popupUrl = "https://snowtapir22.sakura.ne.jp" + homePath + "/favorite/create?title=" + title + "&url=" + url;
    }
  
    window.open(popupUrl, "BookmarkWindow", "width=600,height=500");
  })();`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bookmarkletCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('コピーに失敗しました');
    }
  };

  return (
    <Stack className="gap-y-4 max-w-3xl">
      <ol className="list-decimal pl-6 text-sm leading-relaxed">
        <li>以下のコードをコピーして、ブラウザのブックマークバーに貼り付けてください。<br />
        通常のブックマークと同様に名前をつけることもできます。(例：音すくいリスト追加)</li>
        <li>クリックすると開いているページをお気に入りに登録できます。</li>
      </ol>
      <Textarea
        readOnly
        value={bookmarkletCode}
        rows={6}
        className="font-mono text-xs"
      />
      <Button onClick={handleCopy} variant="primary" className='h-[44px] bg-[var(--color-primary)] font-bold text-base/[1] border-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-hover)] hover:border-[var(--color-primary-hover)]'>
        {copied ? 'コピーしました！' : 'コードをコピー'}
      </Button>
    </Stack>
  );
};

export default BookmarkletCodeBlock;