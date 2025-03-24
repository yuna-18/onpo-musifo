import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import {Head, Link, useForm} from '@inertiajs/react';

import {createTheme, ThemeProvider, FormControl, Fieldset, Cluster, Stack, Center} from 'smarthr-ui';
import {Input, Select, MultiComboBox, CheckBox, Button, AnchorButton} from 'smarthr-ui';

// todo MultiComboBoxはまだ未実装後で確認する
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
  
  const topPagePath = import.meta.env.VITE_HOME_PATH || '/';
  

  return (
    <ThemeProvider theme={theme}>
      <Head title="音すくい | 新規登録" />
      <main className='text-[var(--color-text-primary)]  bg-[var(--color-background)]'>
        <h2 className='font-bold text-3xl text-center pt-8 md:pt-16'>ユーザー登録</h2>

        <form onSubmit={submit} className='w-[90vw] md:w-[80vw] lg:w-[60vw] mt-8 md:mt-16 mx-auto'>
          <Stack className='pb-16'>
            {/* todo 入力フォーム・フォントのサイズ・間隔設定 */}
            {/* 氏名 */}
            <FormControl
              title="氏名"
              helpMessage=""
              exampleMessage=""
              errorMessages={''}
              supplementaryMessage=""
              statusLabelProps={{
                children: '必須',
                type: 'red'
              }}
            >
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
            </FormControl>
            {/* フリガナ */}
            <FormControl
              title="フリガナ"
              helpMessage="カタカナで入力してください。"
              exampleMessage=""
              errorMessages={''}
              supplementaryMessage=""
              statusLabelProps={{
                children: '必須',
                type: 'red'
              }}
            >
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
            </FormControl>
            {/* メールアドレス */}
            <FormControl
              title="メールアドレス"
              helpMessage=""
              exampleMessage=""
              errorMessages={''}
              supplementaryMessage=""
              statusLabelProps={{
                children: '必須',
                type: 'red'
              }}
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
                className=''
              />
            </FormControl>
            {/* パスワード */}
            <FormControl
              title="パスワード"
              helpMessage="英数字それぞれ1文字以上・20文字以内で入力してください。"
              exampleMessage=""
              errorMessages={''}
              supplementaryMessage=""
              statusLabelProps={{
                children: '必須',
                type: 'red'
              }}
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
                className=''
              />
            </FormControl>
            {/* 都道府県 MultiComboBox*/}
            <FormControl
              title="都道府県"
              helpMessage="地域に合わせた情報をお届けしやすくするために必要です。(複数選択可)"
              exampleMessage=""
              errorMessages={''}
              supplementaryMessage=""
            // statusLabelProps={{
            //   children: '必須',
            //   type: 'red'
            // }}
            >
              <MultiComboBox
                items={[
                  {
                    label: '北海道',
                    value: '1'
                  },
                  {
                    label: '青森県',
                    value: '2'
                  },
                  {
                    label: '岩手県',
                    value: '3'
                  },
                  {
                    label: '宮城県',
                    value: '4'
                  },
                  {
                    label: '秋田県',
                    value: '5'
                  },
                  {
                    label: '山形県',
                    value: '6'
                  },
                  {
                    label: '福島県',
                    value: '7'
                  },
                  {
                    label: '茨城県',
                    value: '8'
                  },
                  {
                    label: '栃木県',
                    value: '9'
                  },
                  {
                    label: '群馬県',
                    value: '10'
                  },
                  {
                    label: '埼玉県',
                    value: '11'
                  },
                  {
                    label: '千葉県',
                    value: '12'
                  },
                  {
                    label: '東京都',
                    value: '13'
                  },
                  {
                    label: '神奈川県',
                    value: '14'
                  },
                  {
                    label: '新潟県',
                    value: '15'
                  },
                  {
                    label: '富山県',
                    value: '16'
                  },
                  {
                    label: '石川県',
                    value: '17'
                  },
                  {
                    label: '福井県',
                    value: '18'
                  },
                  {
                    label: '山梨県',
                    value: '19'
                  },
                  {
                    label: '長野県',
                    value: '20'
                  },
                  {
                    label: '岐阜県',
                    value: '21'
                  },
                  {
                    label: '静岡県',
                    value: '22'
                  },
                  {
                    label: '愛知県',
                    value: '23'
                  },
                  {
                    label: '三重県',
                    value: '24'
                  },
                  {
                    label: '滋賀県',
                    value: '25'
                  },
                  {
                    label: '京都府',
                    value: '26'
                  },
                  {
                    label: '大阪府',
                    value: '27'
                  },
                  {
                    label: '兵庫県',
                    value: '28'
                  },
                  {
                    label: '奈良県',
                    value: '29'
                  },
                  {
                    label: '和歌山県',
                    value: '30'
                  },
                  {
                    label: '鳥取県',
                    value: '31'
                  },
                  {
                    label: '島根県',
                    value: '32'
                  },
                  {
                    label: '岡山県',
                    value: '33'
                  },
                  {
                    label: '広島県',
                    value: '34'
                  },
                  {
                    label: '山口県',
                    value: '35'
                  },
                  {
                    label: '徳島県',
                    value: '36'
                  },
                  {
                    label: '香川県',
                    value: '37'
                  },
                  {
                    label: '愛媛県',
                    value: '38'
                  },
                  {
                    label: '高知県',
                    value: '39'
                  },
                  {
                    label: '福岡県',
                    value: '40'
                  },
                  {
                    label: '佐賀県',
                    value: '41'
                  },
                  {
                    label: '長崎県',
                    value: '42'
                  },
                  {
                    label: '熊本県',
                    value: '43'
                  },
                  {
                    label: '大分県',
                    value: '44'
                  },
                  {
                    label: '宮崎県',
                    value: '45'
                  },
                  {
                    label: '鹿児島県',
                    value: '46'
                  },
                  {
                    label: '沖縄県',
                    value: '47'
                  }
                ]}
                onDelete={() => {}}
                onSelect={() => {}}
                // 選択済みアイテムの例（中身は実際のデータに応じて変更）
                selectedItems={[{}]}
              />
            </FormControl>
            {/* 地域区分 ←Checkbox */}
            {/* 好きな音楽ジャンル ←CheckBox */}
            <Fieldset
              errorMessages=""
              exampleMessage=""
              helpMessage="検索・メルマガ配信のために利用します。(複数選択可)"
              supplementaryMessage=""
              title="好きな音楽ジャンル"
              statusLabelProps={{
                children: '任意',
                type: 'grey'
              }}
            >
              <Cluster
                gap={{
                  column: 1.25,
                  row: 0.5
                }}>
                <CheckBox
                  id="fav_chamber"
                  name="fav_chamber"
                  value={data.fav_chamber}
                  onChange={(e) => setData('fav_chamber', e.target.value)}
                  className=''
                >
                  アンサンブル・室内楽
                </CheckBox>

                <CheckBox
                  id="fav_orchestra"
                  name="fav_orchestra"
                  value={data.fav_orchestra}
                  onChange={(e) => setData('fav_orchestra', e.target.value)}
                  className=''
                >
                  クラシック(オーケストラ大編成)
                </CheckBox>

                <CheckBox
                  id="fav_solo"
                  name="fav_solo"
                  value={data.fav_solo}
                  onChange={(e) => setData('fav_solo', e.target.value)}
                  className=''
                >
                  クラシック・ソロ
                </CheckBox>

                <CheckBox
                  id="fav_jazz"
                  name="fav_jazz"
                  value={data.fav_jazz}
                  onChange={(e) => setData('fav_jazz', e.target.value)}
                  className=''
                >
                  ジャズ・ビッグバンド
                </CheckBox>

                <CheckBox
                  id="fav_brass_band"
                  name="fav_brass_band"
                  value={data.fav_brass_band}
                  onChange={(e) => setData('fav_brass_band', e.target.value)}
                  className=''
                >
                  吹奏楽・ブラスバンド
                </CheckBox>

                <CheckBox
                  id="fav_piano"
                  name="fav_piano"
                  value={data.fav_piano}
                  onChange={(e) => setData('fav_piano', e.target.value)}
                  className=''
                >
                  ピアノ
                </CheckBox>

                <CheckBox
                  id="fav_japanese"
                  name="fav_japanese"
                  value={data.fav_japanese}
                  onChange={(e) => setData('fav_japanese', e.target.value)}
                  className=''
                >
                  邦楽・和楽器
                </CheckBox>

                <CheckBox
                  id="fav_pops"
                  name="fav_pops"
                  value={data.fav_pops}
                  onChange={(e) => setData('fav_pops', e.target.value)}
                  className=''
                >
                  ポピュラー・軽音楽
                </CheckBox>
                <CheckBox
                  id="fav_other"
                  name="fav_other"
                  value={data.pops}
                  onChange={(e) => setData('pops', e.target.value)}
                  className=''
                >
                  その他
                </CheckBox>

              </Cluster>
            </Fieldset>
            {/* メールマガジン */}
            <Fieldset
              errorMessages=""
              exampleMessage=""
              helpMessage="地域に基づいた情報を配信します。"
              supplementaryMessage=""
              title="メールマガジン"
              statusLabelProps={{
                children: '任意',
                type: 'grey'
              }}
            >
              <CheckBox
                id="japanese"
                name="japanese"
                value={data.japanese}
                onChange={(e) => setData('japanese', e.target.value)}
                className=''
              >
                受け取る
              </CheckBox>
            </Fieldset>
            {/* メール通知機能 */}
            <Fieldset
              errorMessages=""
              exampleMessage=""
              helpMessage="お気に入りしたサイトの情報をメールで希望日時に通知する機能です。"
              supplementaryMessage=""
              title="メール通知機能"
              statusLabelProps={{
                children: '任意',
                type: 'grey'
              }}
            >
              <CheckBox
                id="email_notify_opt_in"
                name="email_notify_opt_in"
                value={data.email_notify_opt_in}
                onChange={(e) => setData('email_notify_opt_in', e.target.value)}
                className=''
              >
                利用する
              </CheckBox>
            </Fieldset>
            {/* 経験楽器(大分類) */}
            <Fieldset
              errorMessages=""
              exampleMessage=""
              helpMessage="音楽ジャンルを選択後、おおまかな楽器の分類を選択してください。(複数選択可)"
              supplementaryMessage=""
              title="経験楽器(大分類)"
              statusLabelProps={{
                children: '任意',
                type: 'grey'
              }}
              className='block'
            >
              <Stack>
                {/* 経験した音楽ジャンル */}
                <Cluster
                  gap={{
                    column: 1.25,
                    row: 0.5
                  }}>
                  <CheckBox
                    id="exp_chamber"
                    name="exp_chamber"
                    value={data.exp_chamber}
                    onChange={(e) => setData('exp_chamber', e.target.value)}
                    className=''
                  >
                    アンサンブル・室内楽
                  </CheckBox>

                  <CheckBox
                    id="exp_orchestra"
                    name="exp_orchestra"
                    value={data.exp_orchestra}
                    onChange={(e) => setData('exp_orchestra', e.target.value)}
                    className=''
                  >
                    クラシック(オーケストラ大編成)
                  </CheckBox>

                  <CheckBox
                    id="exp_solo"
                    name="exp_solo"
                    value={data.exp_solo}
                    onChange={(e) => setData('exp_solo', e.target.value)}
                    className=''
                  >
                    クラシック・ソロ
                  </CheckBox>

                  <CheckBox
                    id="exp_jazz"
                    name="exp_jazz"
                    value={data.exp_jazz}
                    onChange={(e) => setData('exp_jazz', e.target.value)}
                    className=''
                  >
                    ジャズ・ビッグバンド
                  </CheckBox>

                  <CheckBox
                    id="exp_brass_band"
                    name="exp_brass_band"
                    value={data.exp_brass_band}
                    onChange={(e) => setData('exp_brass_band', e.target.value)}
                    className=''
                  >
                    吹奏楽・ブラスバンド
                  </CheckBox>

                  <CheckBox
                    id="exp_piano"
                    name="exp_piano"
                    value={data.exp_piano}
                    onChange={(e) => setData('exp_piano', e.target.value)}
                    className=''
                  >
                    ピアノ
                  </CheckBox>

                  <CheckBox
                    id="exp_japanese"
                    name="exp_japanese"
                    value={data.exp_japanese}
                    onChange={(e) => setData('exp_japanese', e.target.value)}
                    className=''
                  >
                    邦楽・和楽器
                  </CheckBox>

                  <CheckBox
                    id="exp_pops"
                    name="exp_pops"
                    value={data.exp_pops}
                    onChange={(e) => setData('exp_pops', e.target.value)}
                    className=''
                  >
                    ポピュラー・軽音楽
                  </CheckBox>
                  <CheckBox
                    id="exp_other"
                    name="exp_other"
                    value={data.exp_other}
                    onChange={(e) => setData('exp_other', e.target.value)}
                    className=''
                  >
                    その他
                  </CheckBox>
                </Cluster>
                <MultiComboBox
                  items={[
                    {
                      label: 'option 1',
                      value: 'value-1'
                    },
                    {
                      label: 'option 2',
                      value: 'value-2'
                    }
                  ]}
                  onDelete={() => {}}
                  onSelect={() => {}}
                  selectedItems={[
                    {}
                  ]}
                />
              </Stack>
            </Fieldset>
            {/* 経験楽器(小分類) */}
            <Fieldset
              errorMessages=""
              exampleMessage=""
              helpMessage="楽器の中でも細かな分類を選択してください。(複数選択可)"
              supplementaryMessage=""
              title="経験楽器(小分類)"
              statusLabelProps={{
                children: '任意',
                type: 'grey'
              }}
              className='block'
            >
              <MultiComboBox
                items={[
                  {
                    label: 'option 1',
                    value: 'value-1'
                  },
                  {
                    label: 'option 2',
                    value: 'value-2'
                  }
                ]}
                onDelete={() => {}}
                onSelect={() => {}}
                selectedItems={[
                  {}
                ]}
              />
            </Fieldset>
          </Stack>
          <div className='flex flex-col mx-auto md:flex-row w-[160px] md:w-[368px] gap-y-6 md:gap-x-12 pb-16'>
            <AnchorButton
              href={topPagePath}
              prefix=""
              size="default"
              suffix=""
              variant="secondary"
              wide
              className='h-[44px] bg-[var(--color-white)] font-bold text-base/[1] border-[var(--color-text-primary)] hover:bg-[var(--color-primary-bg-hover)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]'
            >
              キャンセル
            </AnchorButton>
            {/* todo 後で確認画面遷移ボタン実装 */}
            <AnchorButton
              href="../"
              prefix=""
              size="default"
              suffix=""
              variant="primary"
              wide
              disabled={processing}
              className='h-[44px] bg-[var(--color-primary)] font-bold text-base/[1] border-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-hover)] hover:border-[var(--color-primary-hover)]'
            >
              確認
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
        </form>
      </main>
    </ThemeProvider>
  );
}
