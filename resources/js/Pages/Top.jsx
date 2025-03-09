import React from 'react';
import {Head} from '@inertiajs/react';
import Header from '@/Components/Header';
import GoogleCSE from '@/Components/SearchAPI';

const Top = ({ authUser, canLogin, canRegister }) => {
  const isLoggedIn = Boolean(authUser);

  return (
    <>
      <Head title="音報 | トップページ" />
      <Header authUser={authUser}/>
      <main className="pt-8 px-4 md:px-8">
        <div className="">
          <p className="font-bold text-xl/[1.5]">音楽カテゴリ・楽器を入力して、<br className="sp" />イベントや演奏会情報を検索しよう!</p>
          <p className='font-normal text-base/[1.7] mt-8px'>検索結果をタブ毎に絞り込むことができます。</p>
        </div>
        <GoogleCSE />
      </main>
    </>
  );
}

export default Top;
