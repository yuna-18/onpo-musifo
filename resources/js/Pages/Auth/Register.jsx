import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import {Head, Link, useForm} from '@inertiajs/react';

import {createTheme, ThemeProvider, Stack} from 'smarthr-ui';
import {Input, Select, CheckBox} from 'smarthr-ui';
import 'smarthr-ui/smarthr-ui.css';


export default function Register () {
  const theme = createTheme();
  const {data, setData, post, processing, errors, reset} = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();

    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Head title="音報 | ユーザー登録" />
      <h2 className='font-bold text-3xl text-center pt-8'>ユーザー登録</h2>

      <form onSubmit={submit} className='flex flex-col mt-12 mx-auto px-40'>
        <Stack>
          {/* 氏名 */}
          <div>
            {/* <InputLabel htmlFor="name" value="Name" />

            <TextInput
              id="name"
              name="name"
              value={data.name}
              className="mt-1 block w-full"
              autoComplete="name"
              isFocused={true}
              onChange={(e) => setData('name', e.target.value)}
              required
            /> */}

            <label>
              <p>氏名{''}</p>
              <Input
                id="name"
                name="name"
                value={data.name}
                autoComplete="name"
                autoFocus
                type='text'
                required
                onChange={(e) => setData('name', e.target.value)}
                className=''
              />
            </label>
            {/* <InputError message={errors.name} className="mt-2" /> */}
          </div>
          {/* フリガナ */}
          <div>
            <label>
              <p>フリガナ{''}</p>
              <Input
                id="furigana"
                name="furigana"
                value={data.furigana}
                autoComplete="furigana"
                autoFocus
                type='text'
                required
                onChange={(e) => setData('furigana', e.target.value)}
                className=''
              />
            </label>
            {/* <InputError message={errors.name} className="mt-2" /> */}
          </div>
          {/* 都道府県 */}
          <div>
            <label>
              <p>都道府県{''}</p>
              <Select
                id="prefecture"
                name="prefecture"
                value={data.prefecture}
                autoComplete="prefecture"
                autoFocus
                type='text'
                required
                hasBlank
                onChange={(e) => setData('prefecture', e.target.value)}
                className=''

                options={[
                  {
                    label: '北海道',
                    value: '1'
                  },
                  {
                    label: '青森',
                    value: '2'
                  },
                  {
                    label: '岩手',
                    value: '3'
                  },
                  {
                    label: '宮城',
                    value: '4'
                  },
                  {
                    label: '秋田',
                    value: '5'
                  },
                  {
                    label: '山形',
                    value: '6'
                  },
                  {
                    label: '福島',
                    value: '7'
                  },
                  {
                    label: '茨城',
                    value: '8'
                  },
                  {
                    label: '栃木',
                    value: '9'
                  },
                  {
                    label: '群馬',
                    value: '10'
                  },
                  {
                    label: '埼玉',
                    value: '11'
                  },
                  {
                    label: '千葉',
                    value: '12'
                  },
                  {
                    label: '東京',
                    value: '13'
                  },
                  {
                    label: '神奈川',
                    value: '14'
                  },
                  {
                    label: '新潟',
                    value: '15'
                  },
                  {
                    label: '富山',
                    value: '16'
                  },
                  {
                    label: '石川',
                    value: '17'
                  },
                  {
                    label: '福井',
                    value: '18'
                  },
                  {
                    label: '山梨',
                    value: '19'
                  },
                  {
                    label: '長野',
                    value: '20'
                  },
                  {
                    label: '岐阜',
                    value: '21'
                  },
                  {
                    label: '静岡',
                    value: '22'
                  },
                  {
                    label: '愛知',
                    value: '23'
                  },
                  {
                    label: '三重',
                    value: '24'
                  },
                  {
                    label: '滋賀',
                    value: '25'
                  },
                  {
                    label: '京都',
                    value: '26'
                  },
                  {
                    label: '大阪',
                    value: '27'
                  },
                  {
                    label: '兵庫',
                    value: '28'
                  },
                  {
                    label: '奈良',
                    value: '29'
                  },
                  {
                    label: '和歌山',
                    value: '30'
                  },
                  {
                    label: '鳥取',
                    value: '31'
                  },
                  {
                    label: '島根',
                    value: '32'
                  },
                  {
                    label: '岡山',
                    value: '33'
                  },
                  {
                    label: '広島',
                    value: '34'
                  },
                  {
                    label: '山口',
                    value: '35'
                  },
                  {
                    label: '徳島',
                    value: '36'
                  },
                  {
                    label: '香川',
                    value: '37'
                  },
                  {
                    label: '愛媛',
                    value: '38'
                  },
                  {
                    label: '高知',
                    value: '39'
                  },
                  {
                    label: '福岡',
                    value: '40'
                  },
                  {
                    label: '佐賀',
                    value: '41'
                  },
                  {
                    label: '長崎',
                    value: '42'
                  },
                  {
                    label: '熊本',
                    value: '43'
                  },
                  {
                    label: '大分',
                    value: '44'
                  },
                  {
                    label: '宮崎',
                    value: '45'
                  },
                  {
                    label: '鹿児島',
                    value: '46'
                  },
                  {
                    label: '沖縄',
                    value: '47'
                  }
                ]}

              />
            </label>
            {/* <InputError message={errors.name} className="mt-2" /> */}
          </div>
          {/* 好きな音楽ジャンル */}
          <div>
            {/* <label> */}
              <p>好きな音楽ジャンル{''}</p>
              <CheckBox
                id="wind_music"
                name="wind_music"
                value={data.wind_music}
                autoComplete="wind_music"
                autoFocus
                type='text'
                required
                onChange={(e) => setData('wind_music', e.target.value)}
                className=''
              >
              吹奏楽
              </CheckBox>
              <CheckBox
                id="classic"
                name="classic"
                value={data.classic}
                autoComplete="classic"
                autoFocus
                type='text'
                required
                onChange={(e) => setData('classic', e.target.value)}
                className=''
              >
              クラシック
              </CheckBox>
            {/* </label> */}
            {/* <InputError message={errors.name} className="mt-2" /> */}
          </div>
        </Stack>
      </form>
    </ThemeProvider>
  );
}
