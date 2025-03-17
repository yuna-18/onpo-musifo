import React from 'react';
import {Link} from '@inertiajs/react';
import * as Images from '../img';
import {useForm} from '@inertiajs/react';

const Header = ({authUser}) => {
  // useForm() を使ってフォーム操作を簡単にする
  const {post} = useForm();

  const handleLogout = (e) => {
    e.preventDefault();
    // POST リクエストを /logout ルートに送信する
    post(route('logout'));
  };

  return (
    <header className="fixed w-[100vw] z-100 bg-[var(--color-primary)] text-[var(--color-white)]">
      <nav className="flex justify-between p-4 pt-12 md:p-8 items-center">
        <Link
          href="/"
          className="font-bold text-2xl/[1.5] hover:opacity-90"
        >
          音報
        </Link>
        {authUser ? (
          <div className='underline flex flex-col gap-x-6 relative md:flex-row-reverse'>
            <button
              onClick={handleLogout}
              className="flex font-bold text-base/[1] items-center ml-auto hover:opacity-90"
            >
              <Images.LogoutIcon alt="" className='w-5 fill-[var(--color-white)]' />
              ログアウト
            </button>
            <div className='flex gap-x-6 mt-1 md:mt-0'>
              <Link
                href={route('favorite')} className="flex font-bold text-base/[1] items-center hover:opacity-90">
                <Images.BookmarkIcon alt="" className='w-5 fill-[var(--color-white)]' />
                お気に入り
              </Link>
              <Link
                href='/'
                className="flex md:mt-0 font-bold text-base/[1] items-center hover:opacity-90"
              >
                <Images.AccountIcon alt="" className='w-5 fill-[var(--color-white)]' />
                マイページ
              </Link>
            </div>
          </div>
        ) : (
          <div className='underline flex flex-col md:flex-row md:gap-x-6'>
            <Link
              href={route('register')} className="flex font-bold text-base/[1] items-center hover:opacity-90">
              <Images.RegistrationIcon alt="" className='w-5 fill-[var(--color-white)] ' />
              新規登録
            </Link>
            <Link
              href={route('login')}
              className="flex mt-1 md:mt-0 font-bold text-base/[1] items-center hover:opacity-90"
            >
              <Images.LoginIcon alt="" className='w-5 fill-[var(--color-white)]' />
              ログイン
            </Link>
          </div>
        )}
      </nav>
    </header >
  );
};
export default Header;