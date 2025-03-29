// BookmarkletGuide.jsx
import React from 'react';
import {Head, Link} from '@inertiajs/react';
import Header from '@/Components/Header';
import BookmarkletCodeBlock from '@/Components/BookmarkletCodeBlock';

const BookmarkletGuide = ({authUser}) => {
  return (
    <>
      <Head title="音すくい | お気に入り追加方法" />
      <Header authUser={authUser} />
      <main className="pt-[148px] px-4 md:px-8 text-[var(--color-text-primary)] max-w-3xl mx-auto">
        <h2 className="font-bold text-3xl text-center mb-8">お気に入り登録用ブックマークレット</h2>
        <BookmarkletCodeBlock />
        <div className="mt-12 text-center">
          <Link href="/favorite" className="text-base font-bold underline text-[var(--color-text)] hover:opacity-80">お気に入り一覧に戻る</Link>
        </div>
      </main>
    </>
  );
};

export default BookmarkletGuide;