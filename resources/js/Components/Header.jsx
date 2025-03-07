import {Link} from '@inertiajs/react';
import * as Images from '../img';

const Header = (auth) => {
  return (
    <header className="w-screen bg-[var(--color-primary)] text-[var(--color-white)]">
      <nav className="flex justify-between p-4 pt-12 md:p-8 items-center">
        <Link
          href="/"
          className="font-bold text-2xl/[1.5]"
        >
          音報
        </Link>
        <div className='underline'>
          {auth.user ? (
            <Link
              href={route('dashboard')}
              className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none fÏble:ring-white"
            >
              Dashboard
            </Link>
          ) : (
            <div className="block md:flex md:gap-x-8">
              <Link
                href={route('register')} className="flex font-bold text-base/[1] items-center">
                <Images.AccountIcon alt="" className='w-5 fill-[var(--color-white)]' />
                新規登録
              </Link>
              <Link
                href={route('login')}
                className="flex mt-1 md:mt-0 font-bold text-base/[1] items-center"
                >
                  <Images.LoginIcon alt="" className='w-5 fill-[var(--color-white)]' />
                ログイン
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;