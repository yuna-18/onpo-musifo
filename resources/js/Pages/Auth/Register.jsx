import React, {useState} from 'react';
import {Head, Link, useForm} from '@inertiajs/react';
import Header from '@/Components/Header';
import {createTheme, ThemeProvider, FormControl, Fieldset, Cluster, Stack, Center} from 'smarthr-ui';
import {Input, Select, MultiComboBox, CheckBox, Button, AnchorButton} from 'smarthr-ui';

export default function Register ({authUser}) {
  const theme = createTheme();
  const {data, setData, post, processing, errors, reset} = useForm({
    name: '',
    email: '',
    password: '',
    area_ids: [],
    subarea_ids: [],
    music_category_ids: [],
    music_inst_category_ids: [],
    music_inst_ids: [],
  });
  // note仮の連動マスターデータ（実際は Laravel から props で渡す想定）
  const musicCategoryToInstCategoryMap = {
    1: [101, 102],       // アンサンブル・室内楽 → 弦楽器・金管楽器
    2: [102, 103],       // クラシック(大編成) → 金管楽器・打楽器
    3: [101],            // クラシック・ソロ → 弦楽器
    4: [103],            // ジャズ・ビッグバンド → 打楽器
    5: [102],            // 吹奏楽・ブラスバンド → 金管楽器
    6: [104],            // ピアノ → 鍵盤楽器
    7: [105],            // 邦楽・和楽器 → 和楽器
    8: [101, 103],       // ポピュラー・軽音楽 → 弦楽器・打楽器
    9: [106],            // その他 → その他カテゴリ
  };
  

  const instCategoryToInstruments = {
    101: [1001, 1002], // 弦楽器 → バイオリン、チェロ
    102: [1003, 1004], // 金管楽器 → トランペット、ホルン
    103: [1005, 1006], // 打楽器 → ドラム、ティンパニ
    104: [1007],       // 鍵盤楽器 → ピアノ
    105: [1008, 1009], // 和楽器 → 三味線、尺八
    106: [1010],       // その他 → その他楽器
  };
  

  const instCategoryOptions = [
    { label: '弦楽器', value: 101 },
    { label: '金管楽器', value: 102 },
    { label: '打楽器', value: 103 },
    { label: '鍵盤楽器', value: 104 },
    { label: '和楽器', value: 105 },
    { label: 'その他', value: 106 },
  ];
  

  const instOptions = [
    { label: 'バイオリン', value: 1001 },
    { label: 'チェロ', value: 1002 },
    { label: 'トランペット', value: 1003 },
    { label: 'ホルン', value: 1004 },
    { label: 'ドラム', value: 1005 },
    { label: 'ティンパニ', value: 1006 },
    { label: 'ピアノ', value: 1007 },
    { label: '三味線', value: 1008 },
    { label: '尺八', value: 1009 },
    { label: 'その他楽器', value: 1010 },
  ];
  


  const topPagePath = import.meta.env.VITE_HOME_PATH || '/';
  const isLoggedIn = Boolean(authUser);

  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectedSubAreas, setSelectedSubAreas] = useState([]);
  const [selectedMusicCategories, setSelectedMusicCategories] = useState([]);
  const [selectedMusicInstCategories, setSelectedMusicInstCategories] = useState([]);
  const [selectedMusicInsts, setSelectedMusicInsts] = useState([]);

  // チェックボックスで選んだ音楽カテゴリIDに応じて、 表示すべき楽器カテゴリを絞る処理
  const filteredInstCategoryOptions = instCategoryOptions.filter((instCat) => {
    const result = selectedMusicCategories.some((catId) =>
      musicCategoryToInstCategoryMap[catId]?.includes(instCat.value)
    );
    console.log('instCat.value:', instCat.value, '| matches any music category:', result);
    return result;
  });

  // マルチコンボボックスで選んだ楽器カテゴリIDに応じて、 表示すべき楽器名を絞る処理
  const filteredInstOptions = instOptions.filter((inst) => {
    return selectedMusicInstCategories.some((cat) =>
      instCategoryToInstruments[cat.value]?.includes(inst.value)
    );
  });

  // 音楽カテゴリの選択状態をトグルする処理
  const handleMusicCategoryChange = (musicCatId) => {
    let newSelected;
    if (selectedMusicCategories.includes(musicCatId)) {
      // すでに選ばれていたら除外
      newSelected = selectedMusicCategories.filter((id) => id !== musicCatId);
    } else {
      // 選ばれていなければ追加
      newSelected = [...selectedMusicCategories, musicCatId];
    }
    setSelectedMusicCategories(newSelected);
    setData('music_category_ids', newSelected); // バックエンド送信用
    console.log('selectedMusicCategories', selectedMusicCategories);
    console.log('musicCategoryToInstCategoryMap', musicCategoryToInstCategoryMap);

  };



  const submit = (e) => {
    e.preventDefault();
    post(route('register.store')); // 自作ルートに飛ばす
  };


  return (
    <ThemeProvider theme={theme}>
      <Head title="音すくい | 新規登録" />
      <Header authUser={authUser} />
      <main className='pt-[132px] text-[var(--color-text-primary)]  bg-[var(--color-background)]'>
        <h2 className='font-bold text-3xl text-center'>ユーザー登録</h2>

        <form onSubmit={submit} className='w-[90vw] md:w-[80vw] lg:w-[60vw] mt-8 mx-auto'>
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
              statusLabelProps={{
                children: '任意',
                type: 'grey'
              }}
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
                // 選択済みアイテムの例（中身は実際のデータに応じて変更）
                selectedItems={selectedAreas}
                onSelect={(item) => {
                  const newSelected = [...selectedAreas, item];
                  setSelectedAreas(newSelected);
                  setData('area_ids', newSelected.map((item) => item.value));
                }}
                onDelete={(targetItem) => {
                  const newSelected = selectedAreas.filter((item) => item.value !== targetItem.value);
                  setSelectedAreas(newSelected);
                  setData('area_ids', newSelected.map((item) => item.value));
                }}
              />
            </FormControl>
            {/* 地域区分 ←Checkbox */}
            {/* <Fieldset
              title="地域区分"
              errorMessages=""
              exampleMessage=""
              helpMessage="地域に合わせた、より詳細な情報をお届けしやすくするために必要です。(複数選択可)"
              supplementaryMessage=""
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
                  value={data.fav_other}
                  onChange={(e) => setData('fav_other', e.target.value)}
                  className=''
                >
                  その他
                </CheckBox>

              </Cluster>
            </Fieldset> */}
            {/* 経験・興味のある音楽ジャンル ←CheckBox */}
            <Fieldset
              errorMessages=""
              exampleMessage=""
              helpMessage="検索・メルマガ配信のために利用します。(複数選択可)"
              supplementaryMessage=""
              title="経験・興味のある音楽カテゴリ"
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
                  checked={selectedMusicCategories.includes(1)} // IDを指定
                  onChange={() => handleMusicCategoryChange(1)}
                  className=''
                >
                  アンサンブル・室内楽
                </CheckBox>

                <CheckBox
                  id="fav_orchestra"
                  name="fav_orchestra"
                  checked={selectedMusicCategories.includes(2)} // IDを指定
                  onChange={() => handleMusicCategoryChange(2)}
                  className=''
                >
                  クラシック(オーケストラ大編成)
                </CheckBox>

                <CheckBox
                  id="fav_solo"
                  name="fav_solo"
                  checked={selectedMusicCategories.includes(3)} // IDを指定
                  onChange={() => handleMusicCategoryChange(3)}
                  className=''
                >
                  クラシック・ソロ
                </CheckBox>

                <CheckBox
                  id="fav_jazz"
                  name="fav_jazz"
                  checked={selectedMusicCategories.includes(4)} // IDを指定
                  onChange={() => handleMusicCategoryChange(4)}
                  className=''
                >
                  ジャズ・ビッグバンド
                </CheckBox>

                <CheckBox
                  id="fav_brass_band"
                  name="fav_brass_band"
                  checked={selectedMusicCategories.includes(5)} // IDを指定
                  onChange={() => handleMusicCategoryChange(5)}
                  className=''
                >
                  吹奏楽・ブラスバンド
                </CheckBox>

                <CheckBox
                  id="fav_piano"
                  name="fav_piano"
                  checked={selectedMusicCategories.includes(6)} // IDを指定
                  onChange={() => handleMusicCategoryChange(6)}
                  className=''
                >
                  ピアノ
                </CheckBox>

                <CheckBox
                  id="fav_japanese"
                  name="fav_japanese"
                  checked={selectedMusicCategories.includes(7)} // IDを指定
                  onChange={() => handleMusicCategoryChange(7)}
                  className=''
                >
                  邦楽・和楽器
                </CheckBox>

                <CheckBox
                  id="fav_pops"
                  name="fav_pops"
                  checked={selectedMusicCategories.includes(8)} // IDを指定
                  onChange={() => handleMusicCategoryChange(8)}
                  className=''
                >
                  ポピュラー・軽音楽
                </CheckBox>
                <CheckBox
                  id="fav_other"
                  name="fav_other"
                  checked={selectedMusicCategories.includes(9)} // IDを指定
                  onChange={() => handleMusicCategoryChange(9)}
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
            {/* 経験・興味のある楽器カテゴリ */}
            <Fieldset
              errorMessages=""
              exampleMessage=""
              helpMessage="おおまかな楽器の分類を選択してください。(複数選択可)"
              supplementaryMessage=""
              title="経験・興味のある楽器カテゴリ"
              statusLabelProps={{
                children: '任意',
                type: 'grey'
              }}
              className='block'
            >
              <Stack>
                <MultiComboBox
                  items={filteredInstCategoryOptions}
                  selectedItems={selectedMusicInstCategories}
                  onSelect={(item) => {
                    const newSelected = [...selectedMusicInstCategories, item];
                    setSelectedMusicInstCategories(newSelected);
                    setData('music_inst_category_ids', newSelected.map((item) => item.value));
                  }}
                  onDelete={(targetItem) => {
                    const newSelected = selectedMusicInstCategories.filter((item) => item.value !== targetItem.value);
                    setSelectedMusicInstCategories(newSelected);
                    setData('music_inst_category_ids', newSelected.map((item) => item.value));
                  }}
                />
              </Stack>
            </Fieldset>
            {/* 経験・興味のある楽器名 */}
            <Fieldset
              errorMessages=""
              exampleMessage=""
              helpMessage="楽器の中でも細かな分類を選択してください。(複数選択可)"
              supplementaryMessage=""
              title="経験・興味のある楽器名"
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
                selectedItems={selectedMusicInsts}
                onSelect={(item) => {
                  const newSelected = [...selectedMusicInsts, item];
                  setSelectedMusicInsts(newSelected);
                  setData('music_inst_ids', newSelected.map((item) => item.value));
                }}
                onDelete={(targetItem) => {
                  const newSelected = selectedMusicInsts.filter((item) => item.value !== targetItem.value);
                  setSelectedMusicInsts(newSelected);
                  setData('music_inst_ids', newSelected.map((item) => item.value));
                }}
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
