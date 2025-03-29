import React from 'react';
import {Head, Link, useForm} from '@inertiajs/react';
import Header from '@/Components/Header';
import * as Images from '../img';
import {Button, AnchorButton} from 'smarthr-ui';

const Bookmark = ({authUser, bookmarks}) => {
  const {delete: destroy, processing} = useForm();

  return (
    <>
      <Head title="音すくい | お気に入り" />
      <Header authUser={authUser} />
      <main className="pt-[148px] px-4 md:px-8 text-[var(--color-text-primary)]">
        <h2 className='font-bold text-3xl text-center'>お気に入り一覧</h2>
        <Link
          href={route('favorite.howtosave')}
          className="font-normal text-base/[1.7] hover:opacity-90 underline block ml-auto w-fit"
        >
          ❓お気に入り一覧への追加方法
        </Link>
        <ul className='pt-12'>
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id} className='flex items-center justify-between'>
              <div className='flex flex-col gap-y-2 font-bold leading-[1.7]'>
                <a href={bookmark.url} className='text-xl leading-[1.6] underline'>{bookmark.title ?? 'お気に入り'}</a>
                <p>{bookmark.comment ?? 'ー'}</p>
                <p>{bookmark.notify_at ?? 'ー'}</p>
              </div>
              <div className='flex flex-col md:flex-row w-[80px] md:w-[256px] gap-y-2 md:gap-x-4'>
                <Button
                  onClick={() => {
                    if (confirm('本当に削除しますか？')) {
                      destroy(route('favorite.destroy', bookmark.id));
                    }
                  }}
                  prefix=""
                  size="default"
                  suffix=""
                  variant="secondary"
                  wide
                  disabled={processing}
                  className='h-[44px] bg-[var(--color-white)] text-[var(--color-warning)] font-bold text-base/[1] border-[var(--color-warning)] hover:bg-[var(--color-warning-bg-hover)] hover:border-[var(--color-warning)]'
                >
                  <span className='flex items-center'>
                    <Images.BookmarkRemoveIcon alt="" className='w-5 fill-[var(--color-warning]' />
                    削除
                  </span>
                </Button>

                <AnchorButton
                  href={route('favorite.edit', bookmark.id)}
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
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Bookmark;