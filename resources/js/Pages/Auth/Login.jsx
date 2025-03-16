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
          {/* <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            isFocused={true}
            onChange={(e) => setData('email', e.target.value)}
          />
          <InputError message={errors.email} className="mt-2" />
        </div> */}
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
              className='w-full'
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
              autoFocus
              type='password'
              required
              onChange={(e) => setData('password', e.target.value)}
              className='w-full'
            />
          </FormControl>
          {/* ログイン状態を保存する */}
          <div className="mt-4 block">
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
          </div>

          {/* ボタンエリア */}
          <div className='flex flex-col mx-auto md:flex-row w-[160px] md:w-[368px] gap-y-6 md:gap-x-12 pb-10 mt-16'>
            <AnchorButton
              href="/"
              prefix=""
              size="default"
              suffix=""
              variant="secondary"
              wide
              className='h-[44px] bg-[var(--color-white)] border-[var(--color-text)] hover:bg-[var(--color-main-lighten)] hover:text-[var(--color-main)] hover:border-[var(--color-main)]'
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
              className='h-[44px] bg-[var(--color-main)] border-[var(--color-main)] text-[var(--color-white)] hover:bg-[var(--color-main-darken)] hover:border-[var(--color-main-darken)]'
            >
              ログイン
            </Button>
          </div>
          {/* パスワード再設定 */}
          <div className="flex justify-center">
            {canResetPassword && (
              <Link
                href={route('password.request')}
                className="text-base font-bold underline text-[var(--color-main)] hover:bg-[var(--color-main-lighten)]"
              >
                パスワードの再設定
              </Link>
            )}

            {/* <PrimaryButton className="ms-4" disabled={processing}>
              ログイン
            </PrimaryButton> */}
          </div>
        </form>
      </Center>
    </>
  );
}
