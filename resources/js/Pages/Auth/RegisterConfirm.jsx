import React from 'react';
import {Head} from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Header from '@/Components/Header';
import {Stack, MultiComboBox, CheckBox, Button, AnchorButton} from 'smarthr-ui';

const RegisterConfirm = ({authUser, canRegister, areaLabels, subareaLabels, musicCategoryLabels, musicInstCategoryLabels, musicInstLabels}) => {
  // console.log('props', canRegister);

  const submit = (e) => {
    e.preventDefault();
    Inertia.post(route('user.register.store'), canRegister);
  };

  return (
    <div className='bg-[var(--color-background)]'>
      <Head title="音すくい | 登録内容確認" />
      <Header authUser={authUser} />
      <main className="bg-[var(--color-background)] h-[100vh] pt-[132px] px-4 md:px-8 text-[var(--color-text-primary)]">
        <h2 className='font-bold text-3xl text-center'>登録内容確認</h2>
        <Stack className="bg-[var(--color-white)] border-[1px] border-[var(--color-border)] rounded-lg w-[90vw] md:w-[80vw] lg:w-[60vw] mt-8 mx-auto p-8"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              submit();
            }
          }}
        >
          <p className='font-normal text-xl/[1.5]'>以下の内容で登録します。よろしいですか？</p>
          <div className=''>
            <p className='font-normal text-xl/[1.5]'>氏名:  {canRegister.name}</p>
            <p className='font-normal text-xl/[1.5]'>フリガナ:  {canRegister.furigana}</p>
            <p className='font-normal text-xl/[1.5]'>メールアドレス:  {canRegister.email}</p>
            <p className='font-normal text-xl/[1.5]'>パスワード:  {'●'.repeat(canRegister.password.length)}</p>
            <p className='font-normal text-xl/[1.5]'>都道府県:  {areaLabels.join(', ')}</p>
            <p className='font-normal text-xl/[1.5]'>地域区分:  {subareaLabels.join(', ')}</p>
            <p className='font-normal text-xl/[1.5]'>経験・興味のある音楽ジャンル:  {musicCategoryLabels.join(', ')}</p>
            <p className='font-normal text-xl/[1.5]'>
              メルマガ配信:  {
                canRegister.newsletter_opt_in === 1 ? '受け取る' : '受け取らない'
              }
            </p>
            <p className='font-normal text-xl/[1.5]'>
              メール通知機能:  {
                canRegister.email_notify_opt_in === 1 ? '利用する' : '利用しない'
              }
            </p>
            <p className='font-normal text-xl/[1.5]'>経験・興味のある楽器カテゴリ:  {musicInstCategoryLabels.join(', ')}</p>
            <p className='font-normal text-xl/[1.5]'>経験・興味のある楽器名:  {musicInstLabels.join(', ')}</p>
          </div>
        </Stack>
        <div className='flex flex-col mx-auto mt-16 md:flex-row w-[160px] md:w-[368px] gap-y-6 md:gap-x-12 pb-16'>
          <Button
            onClick={() => Inertia.visit('/register', {
              method: 'get',
              data: canRegister,
              preserveState: true,
              preserveScroll: true,
            })}
            prefix=""
            size="default"
            suffix=""
            variant="secondary"
            wide
            className='h-[44px] bg-[var(--color-white)] font-bold text-base/[1] border-[var(--color-text-primary)] hover:bg-[var(--color-primary-bg-hover)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]'
          >
            戻る
          </Button>
          <Button
            type='button'
            onClick={submit}
            prefix=""
            size="default"
            suffix=""
            variant="primary"
            wide
            // disabled={processing}
            className='h-[44px] bg-[var(--color-primary)] font-bold text-base/[1] border-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-hover)] hover:border-[var(--color-primary-hover)]'
          >
            登録
          </Button>
        </div>
      </main >
    </div >
  );
};

export default RegisterConfirm;
