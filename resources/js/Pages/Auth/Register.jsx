import React, {useState} from 'react';
import {Head, Link, useForm} from '@inertiajs/react';
import Header from '@/Components/Header';
import {createTheme, ThemeProvider, FormControl, Fieldset, Cluster, Stack, Center} from 'smarthr-ui';
import {Input, MultiComboBox, CheckBox, Button, AnchorButton} from 'smarthr-ui';

export default function Register ({authUser, areas, subareas, areaToSubarea, musicCategories, musicInstCategories, musicInsts, musicCategoryToInstCategoryMap, instCategoryToInstruments}) {
  const theme = createTheme();
  const {data, setData, post, processing, errors, reset} = useForm({
    name: '',
    furigana: '',
    email: '',
    password: '',
    area_ids: [],
    subarea_ids: [],
    music_category_ids: [],
    music_inst_category_ids: [],
    music_inst_ids: [],
  });
  // note仮の連動マスターデータ（実際は Laravel から props で渡す想定）


  // データベースから取得した地域データ
  const areaOptions = areas;
  const subareaOptions = subareas;
  // console.log('🧩 first few subareaOptions:', subareaOptions.slice(0, 5));
  // データベースから取得した音楽データ
  const musicCategoryOptions = musicCategories;
  const musicInstCategoryOptions = musicInstCategories;
  const musicInstOptions = musicInsts;



  const topPagePath = import.meta.env.VITE_HOME_PATH || '/';
  const isLoggedIn = Boolean(authUser);

  // MultiComboBoxで選んだ親アイテム
  const [selectedAreaItems, setSelectedAreaItems] = useState([]);

  const [selectedMusicInstCategoryItems, setSelectedMusicInstCategoryItems] = useState([]);
  // 表示されたCheckBoxの中で選ばれている子アイテム
  const [selectedMusicInstItems, setSelectedMusicInstItems] = useState([]);
  const [selectedSubareaItems, setSelectedSubareaItems] = useState([]);
  // 音楽カテゴリ状態保持
  const [selectedMusicCategories, setSelectedMusicCategories] = useState([]);

  // note汎用関数
  // マルチコンボボックスで選んだ結果から、表示すべきチェックボックスを絞る処理
  const getFilteredChildOptions = (selectedParents, relationMap, childOptions) => {
    // console.log('🐛 subarea filter:');
    // console.log('selectedAreaItems:', selectedAreaItems);
    // console.log('areaToSubarea:', areaToSubarea);
    // console.log('subareaOptions:', subareaOptions);

    return childOptions.filter((child) => {
      return selectedParents.some((parent) => {
        const parentId = String(parent.value);
        const childId = Number(child.value); // ← ここ修正！
        const childList = relationMap[parentId];

        if (!Array.isArray(childList)) return false;
        const matched = childList.includes(childId);
        return matched;
      });
    });
  };

  // チェックボックストグル管理
  const toggleItemInList = (currentList, item) => {
    const exists = currentList.some((i) => i.value === item.value);
    return exists
      ? currentList.filter((i) => i.value !== item.value)
      : [...currentList, item];
  };

  // チェックボックス→マルチコンボボックスの連動処理
  // 音楽カテゴリ→楽器カテゴリの連動
  const filteredMusicInstCategoryOptions = musicInstCategoryOptions.filter((instCat) =>
    selectedMusicCategories.some(
      (cat) => musicCategoryToInstCategoryMap[cat.value]?.includes(instCat.value)
    )
  );

  // マルチコンボボックス→チェックボックスの処理　それぞれ設定
  const filteredSubareaOptions = getFilteredChildOptions(
    selectedAreaItems,
    areaToSubarea,
    subareaOptions
  );
  // console.log('📦 表示する地域区分:', filteredSubareaOptions);

  const filteredMusicInstrumentOptions = getFilteredChildOptions(
    selectedMusicInstCategoryItems,
    instCategoryToInstruments,
    musicInstOptions
  );
  // console.log('🎵 表示する楽器名:', filteredMusicInstrumentOptions);



  const submit = (e) => {
    e.preventDefault();
    post(route('user.register'), {
      data,
    });
  };


  return (
    <ThemeProvider theme={theme}>
      <Head title="音すくい | 新規登録" />
      <Header authUser={authUser} />
      <main className='pt-[132px] text-[var(--color-text-primary)]  bg-[var(--color-background)] select-none'>
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
                className='h-[32px]'
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
                className='h-[32px]'
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
                className='h-[32px] w-1/2'
              />
            </FormControl>
            {/* パスワード */}
            <FormControl
              title="パスワード"
              helpMessage="8文字以上で入力してください。"
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
                className='h-[32px] w-1/2'
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
                items={areaOptions}
                // 選択済みアイテムの例（中身は実際のデータに応じて変更）
                selectedItems={selectedAreaItems}
                onSelect={(item) => {
                  if (!item?.value) return;
                  const newSelected = [...selectedAreaItems, item];
                  setSelectedAreaItems(newSelected);
                  setData('area_ids', newSelected.map((item) => item.value));
                }}
                onDelete={(targetItem) => {
                  if (!targetItem?.value) return;
                  const newSelected = selectedAreaItems.filter((item) => item.value !== targetItem.value);
                  setSelectedAreaItems(newSelected);
                  setData('area_ids', newSelected.map((item) => item.value));
                }}
              />
            </FormControl>
            {/* 地域区分 ←Checkbox */}
            <Fieldset
              title="地域区分"
              errorMessages=""
              exampleMessage=""
              helpMessage="地域に合わせた、より詳細な情報をお届けしやすくするために必要です。上の都道府県の入力欄に入力すると選択肢が表示されます。(複数選択可)"
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
                {filteredSubareaOptions.map((subarea) => (
                  <CheckBox
                    key={subarea.value}
                    id={`subarea_${subarea.value}`}
                    name={`subarea_${subarea.value}`}
                    checked={selectedSubareaItems.some((s) => s.value === subarea.value)}
                    onChange={() => {
                      const newList = toggleItemInList(selectedSubareaItems, subarea);
                      setSelectedSubareaItems(newList);
                      setData('subarea_ids', newList.map((i) => i.value));
                    }}
                  >
                    {subarea.label}
                  </CheckBox>
                ))}
              </Cluster>
            </Fieldset>
            {/* 経験・興味のある音楽ジャンル ←CheckBox */}
            <Fieldset
              errorMessages=""
              exampleMessage=""
              helpMessage="検索・メルマガ配信のために利用します。(複数選択可)"
              supplementaryMessage=""
              title="経験・興味のある音楽ジャンル"
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
                  checked={selectedMusicCategories.some((i) => i.value === 1)}
                  onChange={() => {
                    const item = {label: 'アンサンブル・室内楽', value: 1};
                    const newList = toggleItemInList(selectedMusicCategories, item);
                    setSelectedMusicCategories(newList);
                    setData('music_category_ids', newList.map((i) => i.value));
                  }}
                >
                  アンサンブル・室内楽
                </CheckBox>

                <CheckBox
                  id="fav_orchestra"
                  name="fav_orchestra"
                  checked={selectedMusicCategories.some((i) => i.value === 2)}
                  onChange={() => {
                    const item = {label: 'クラシック(オーケストラ大編成)', value: 2};
                    const newList = toggleItemInList(selectedMusicCategories, item);
                    setSelectedMusicCategories(newList);
                    setData('music_category_ids', newList.map((i) => i.value));
                  }}
                >
                  クラシック(オーケストラ大編成)
                </CheckBox>

                <CheckBox
                  id="fav_solo"
                  name="fav_solo"
                  checked={selectedMusicCategories.some((i) => i.value === 3)}
                  onChange={() => {
                    const item = {label: 'クラシック・ソロ', value: 3};
                    const newList = toggleItemInList(selectedMusicCategories, item);
                    setSelectedMusicCategories(newList);
                    setData('music_category_ids', newList.map((i) => i.value));
                  }}
                >
                  クラシック・ソロ
                </CheckBox>

                <CheckBox
                  id="fav_jazz"
                  name="fav_jazz"
                  checked={selectedMusicCategories.some((i) => i.value === 4)}
                  onChange={() => {
                    const item = {label: 'ジャズ・ビッグバンド', value: 4};
                    const newList = toggleItemInList(selectedMusicCategories, item);
                    setSelectedMusicCategories(newList);
                    setData('music_category_ids', newList.map((i) => i.value));
                  }}
                >
                  ジャズ・ビッグバンド
                </CheckBox>

                <CheckBox
                  id="fav_brass_band"
                  name="fav_brass_band"
                  checked={selectedMusicCategories.some((i) => i.value === 5)}
                  onChange={() => {
                    const item = {label: '吹奏楽・ブラスバンド', value: 5};
                    const newList = toggleItemInList(selectedMusicCategories, item);
                    setSelectedMusicCategories(newList);
                    setData('music_category_ids', newList.map((i) => i.value));
                  }}
                >
                  吹奏楽・ブラスバンド
                </CheckBox>

                <CheckBox
                  id="fav_piano"
                  name="fav_piano"
                  checked={selectedMusicCategories.some((i) => i.value === 6)}
                  onChange={() => {
                    const item = {label: 'ピアノ', value: 6};
                    const newList = toggleItemInList(selectedMusicCategories, item);
                    setSelectedMusicCategories(newList);
                    setData('music_category_ids', newList.map((i) => i.value));
                  }}
                >
                  ピアノ
                </CheckBox>

                <CheckBox
                  id="fav_japanese"
                  name="fav_japanese"
                  checked={selectedMusicCategories.some((i) => i.value === 7)}
                  onChange={() => {
                    const item = {label: '邦楽・和楽器', value: 7};
                    const newList = toggleItemInList(selectedMusicCategories, item);
                    setSelectedMusicCategories(newList);
                    setData('music_category_ids', newList.map((i) => i.value));
                  }}
                >
                  邦楽・和楽器
                </CheckBox>

                <CheckBox
                  id="fav_pops"
                  name="fav_pops"
                  checked={selectedMusicCategories.some((i) => i.value === 8)}
                  onChange={() => {
                    const item = {label: 'ポピュラー・軽音楽', value: 8};
                    const newList = toggleItemInList(selectedMusicCategories, item);
                    setSelectedMusicCategories(newList);
                    setData('music_category_ids', newList.map((i) => i.value));
                  }}
                >
                  ポピュラー・軽音楽
                </CheckBox>
                <CheckBox
                  id="fav_other"
                  name="fav_other"
                  checked={selectedMusicCategories.some((i) => i.value === 9)} // IDを指定
                  onChange={() => {
                    const item = {label: 'その他', value: 9};
                    const newList = toggleItemInList(selectedMusicCategories, item);
                    setSelectedMusicCategories(newList);
                    setData('music_category_ids', newList.map((i) => i.value));
                  }}
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
              helpMessage="楽器の分類を選択してください。上の音楽ジャンルの入力欄を入力すると選択肢が表示されます。(複数選択可)"
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
                  items={filteredMusicInstCategoryOptions}
                  selectedItems={selectedMusicInstCategoryItems}
                  onSelect={(item) => {
                    if (!item?.value) return;
                    const newSelected = [...selectedMusicInstCategoryItems, item];
                    setSelectedMusicInstCategoryItems(newSelected);
                    setData('music_inst_category_ids', newSelected.map((item) => item.value));
                  }}
                  onDelete={(targetItem) => {
                    if (!targetItem?.value) return;
                    const newSelected = selectedMusicInstCategoryItems.filter((item) => item.value !== targetItem.value);
                    setSelectedMusicInstCategoryItems(newSelected);
                    setData('music_inst_category_ids', newSelected.map((item) => item.value));
                  }}
                />
              </Stack>
            </Fieldset>
            {/* 経験・興味のある楽器名 */}
            <Fieldset
              errorMessages=""
              exampleMessage=""
              helpMessage="楽器名を選択してください。上の楽器カテゴリ入力欄で選択した内容に応じて表示されます。(複数選択可)"
              supplementaryMessage=""
              title="経験・興味のある楽器名"
              statusLabelProps={{
                children: '任意',
                type: 'grey'
              }}
              className='block'
            >
              <Cluster
                gap={{
                  column: 1.25,
                  row: 0.5
                }}>
                {filteredMusicInstrumentOptions.map((inst) => (
                  <CheckBox
                    key={inst.value}
                    id={`inst_${inst.value}`}
                    name={`inst_${inst.value}`}
                    checked={selectedMusicInstItems.some((i) => i.value === inst.value)}
                    onChange={() => {
                      const newList = toggleItemInList(selectedMusicInstItems, inst);
                      setSelectedMusicInstItems(newList);
                      setData('music_inst_ids', newList.map((i) => i.value));
                    }}
                  >
                    {inst.label}
                  </CheckBox>
                ))}
              </Cluster>
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
            <Button
              type='submit'
              prefix=""
              size="default"
              suffix=""
              variant="primary"
              wide
              disabled={processing}
              className='h-[44px] bg-[var(--color-primary)] font-bold text-base/[1] border-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-hover)] hover:border-[var(--color-primary-hover)]'
            >
              確認
            </Button>
          </div>
        </form>
      </main>
    </ThemeProvider >
  );
}
