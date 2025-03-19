import React from 'react';
import {Head} from '@inertiajs/react';
import Header from '@/Components/Header';
import * as Images from '../img';
import {Button, AnchorButton} from 'smarthr-ui';

const Favorite = ({authUser}) => {

  return (
    <>
      <Head title="音報 | お気に入り" />
      <Header authUser={authUser} />
      <main className="pt-[132px] px-4 md:px-8 text-[var(--color-text-primary)]">
        <h2 className='font-bold text-3xl text-center'>お気に入り一覧</h2>
        <ul className='pt-8'>
          <li className='flex items-center justify-between'>
            <div className='flex flex-col gap-y-2 font-bold leading-[1.7]'>
              <a href="" className='text-lg leading-[1.6] underline'>サイトタイトル</a>
              <p>メモ</p>
              <p>通知日時</p>
            </div>
            <div className='flex flex-col md:flex-row w-[80px] md:w-[256px] gap-y-2 md:gap-x-4'>
              <AnchorButton
                href="/"
                prefix=""
                size="default"
                suffix=""
                variant="secondary"
                wide
                className='h-[44px] bg-[var(--color-white)] text-[var(--color-warning)] font-bold text-base/[1] border-[var(--color-warning)] hover:bg-[var(--color-warning-bg-hover)] hover:border-[var(--color-warning)]'
              >
                <span className='flex items-center'>
                  <Images.BookmarkRemoveIcon alt="" className='w-5 fill-[var(--color-warning]' />
                  削除
                </span>
              </AnchorButton>
              {/* todo 後で確認画面遷移ボタン実装 */}
              <AnchorButton
                href="/"
                prefix=""
                size="default"
                suffix=""
                variant="secondary"
                wide
                className='h-[44px] bg-[var(--color-white)] text-[var(--color-primary)] font-bold text-base/[1] border-[var(--color-primary)] hover:bg-[var(--color-primary-bg-hover)] hover:border-[var(--color-primary)]'
              >
                <span className='flex items-center'>
                  <Images.EditIcon alt="" className='w-5 fill-[var(--color-primary]' />
                  編集
                </span>
              </AnchorButton>
              {/* <Button
            prefix=""
            size="default"
            suffix=""
            type='submit'
            variant="primary"
            className=''
            wide
          >
            確認
          </Button> */}
            </div>
          </li>
        </ul>
      </main>
    </>
  );
};

export default Favorite;