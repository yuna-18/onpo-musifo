import React from 'react';
import {Head} from '@inertiajs/react';
import Header from '@/Components/Header';

const Favorite = ({authUser}) => {

  return (
    <>
      <Head title="音報 | お気に入り" />
      <Header authUser={authUser} />
      <main className="pt-8 px-4 md:px-8">
        <h2 className='font-bold text-3xl text-center'>お気に入り一覧</h2>
      </main>
    </>
  );
};

export default Favorite;