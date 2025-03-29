import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm} from '@inertiajs/react';

import {createTheme, ThemeProvider, FormControl, Fieldset, Cluster, Stack, Center} from 'smarthr-ui';
import {Input, Select, MultiComboBox, CheckBox, Button, AnchorButton} from 'smarthr-ui';
import 'smarthr-ui/smarthr-ui.css';

export default function Login ({status, canResetPassword}) {
  const {data, setData, post, processing, errors, reset} = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();

    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  const topPagePath = import.meta.env.VITE_HOME_PATH || '/';


  return (
    <>
      <Head title="音すくい | ログイン" />
      <Center verticalCentering className='min-h-screen text-[var(--color-text)] bg-[var(--color-background)]'>
        <h2 className='font-bold text-3xl text-center'>音すくい</h2>
        <h3 className='font-bold text-2xl text-center mt-8'>ログイン</h3>
        {status && (
          <div className="mb-4 text-sm font-medium text-green-600">
            {status}
          </div>
        )}



        <form onSubmit={submit} className='w-[320px] md:w-[368px] mt-8 mx-auto'>
          {/* todo フォームの大きさ・フォントサイズ設定 */}
          {/* メールアドレス */}
          <FormControl
            title="メールアドレス"
            helpMessage=""
            exampleMessage=""
            errorMessages={''}
            supplementaryMessage=""
            className=''
          >
            <Input
              id="email"
              name="email"
              value={data.email}
              autoComplete="email"
              autoFocus
              type='email'
              required
              onChange={(e) => setData('email', e.target.value)}
              className='w-full h-[32px]'
            />
          </FormControl>

          {/* パスワード */}
          <FormControl
            title="パスワード"
            helpMessage=""
            exampleMessage=""
            errorMessages={''}
            supplementaryMessage=""
            className='mt-6'
          >
            <Input
              id="password"
              name="password"
              value={data.password}
              autoComplete="password"
              type='password'
              required
              onChange={(e) => setData('password', e.target.value)}
              className='w-full h-[32px]'
            />
          </FormControl>
          {/* ログイン状態を保存する */}
          {/* <div className="mt-4 block">
            <label className="flex items-center">
              <Checkbox
                name="remember"
                checked={data.remember}
                onChange={(e) =>
                  setData('remember', e.target.checked)
                }
              />
              <span className="ml-2 text-base">
                ログイン状態を保存する
              </span>
            </label>
          </div> */}

          {/* ボタンエリア */}
          <div className='flex flex-col mx-auto md:flex-row w-[160px] md:w-[368px] gap-y-6 md:gap-x-12 pb-10 mt-16'>
            <AnchorButton
              href={topPagePath}
              prefix=""
              size="default"
              suffix=""
              variant="secondary"
              wide
              className='h-[44px] bg-[var(--color-white)] border-[var(--color-text)] font-bold text-base/[1] hover:bg-[var(--color-primary-bg-hover)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]'
            >
              キャンセル
            </AnchorButton>
            <Button
              prefix=""
              size="default"
              suffix=""
              type='submit'
              variant="primary"
              wide
              disabled={processing}
              className='h-[44px] bg-[var(--color-primary)] border-[var(--color-primary)] text-[var(--color-white)] font-bold text-base/[1] hover:bg-[var(--color-primary-hover)] hover:border-[var(--color-primary-hover)]'
            >
              ログイン
            </Button>
          </div>
          {/* パスワード再設定 */}
          {/* <div className="flex justify-center">
            {canResetPassword && (
              <Link
                href={route('password.request')}
                className="text-base font-bold underline text-[var(--color-primary)] hover:bg-[var(--color-primary-bg-hover)]"
              >
                パスワードの再設定
              </Link>
            )}
          </div> */}
        </form>
      </Center>
    </>
  );
}
