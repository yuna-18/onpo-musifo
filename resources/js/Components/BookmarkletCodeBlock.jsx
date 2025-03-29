// BookmarkletCodeBlock.jsx
import React, { useState } from 'react';
import { Button, Stack, Textarea } from 'smarthr-ui';

const BookmarkletCodeBlock = () => {
  const [copied, setCopied] = useState(false);

  const homePath = import.meta.env.VITE_HOME_PATH || '/';
  const popupBaseUrl =
    homePath === '/'
      ? 'http://localhost/favorite/create'
      : `https://your-production-domain.com${homePath}/favorite/create`;

  const bookmarkletCode = `javascript:(function(){
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const popupUrl = "${popupBaseUrl}?title=" + title + "&url=" + url;
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
        <li>
          以下のコードをコピーして、ブラウザのブックマークバーに貼り付けてください。<br />
          通常のブックマークと同様に名前をつけることもできます。(例：お気に入り追加)
        </li>
        <li>クリックすると、開いているページがブックマークとして登録されます。</li>
      </ol>
      <Textarea
        readOnly
        value={bookmarkletCode}
        rows={6}
        className="font-mono text-xs"
      />
      <Button
        onClick={handleCopy}
        variant="primary"
        className="h-[44px]"
      >
        {copied ? 'コピーしました！' : 'コードをコピー'}
      </Button>
    </Stack>
  );
};

export default BookmarkletCodeBlock;