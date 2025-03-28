import React, {useState, useEffect} from 'react';
import {Head, Link, useForm, router} from '@inertiajs/react';
import {Inertia} from '@inertiajs/inertia';
import Header from '@/Components/Header';
import {createTheme, ThemeProvider, FormControl, Fieldset, Cluster, Stack, Center} from 'smarthr-ui';
import {Input, MultiComboBox, CheckBox, Button, AnchorButton} from 'smarthr-ui';

export default function Register ({authUser, areas, subareas, areaToSubarea, musicCategories, musicInstCategories, musicInsts, musicCategoryToInstCategoryMap, instCategoryToInstruments, formData = {}}) {
  const theme = createTheme();
  const { data, setData, post, processing, errors, reset } = useForm({
    name: formData.name ?? '',
    furigana: formData.furigana ?? '',
    email: formData.email ?? '',
    password: formData.password ?? '',
    area_ids: formData.area_ids ?? [],
    subarea_ids: formData.subarea_ids ?? [],
    music_category_ids: formData.music_category_ids ?? [],
    newsletter_opt_in: formData.newsletter_opt_in ?? 0,
    email_notify_opt_in: formData.email_notify_opt_in ?? 0,
    music_inst_category_ids: formData.music_inst_category_ids ?? [],
    music_inst_ids: formData.music_inst_ids ?? [],
  });
  // データベースから取得した地域データ
  const areaOptions = areas;
  const subareaOptions = subareas;
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
  
  useEffect(() => {
    const initSelectedItems = (ids = [], options = []) => {
      const normalizedIds = ids.map((id) => Number(id));
      return options.filter((opt) => normalizedIds.includes(Number(opt.value)));
    };
  
    if (formData.area_ids?.length > 0) {
      const selected = initSelectedItems(formData.area_ids, areaOptions);
      setSelectedAreaItems(selected);
      console.log('✅ AreaItems:', selected);
    }
  
    if (formData.subarea_ids?.length > 0) {
      const selected = initSelectedItems(formData.subarea_ids, subareaOptions);
      setSelectedSubareaItems(selected);
    }
  
    if (formData.music_category_ids?.length > 0) {
      const selected = initSelectedItems(formData.music_category_ids, musicCategoryOptions);
      setSelectedMusicCategories(selected);
    }
  
    if (formData.music_inst_category_ids?.length > 0) {
      const selected = initSelectedItems(formData.music_inst_category_ids, musicInstCategoryOptions);
      setSelectedMusicInstCategoryItems(selected);
    }
  
    if (formData.music_inst_ids?.length > 0) {
      const selected = initSelectedItems(formData.music_inst_ids, musicInstOptions);
      setSelectedMusicInstItems(selected);
    }
  }, [
    formData,
    areaOptions,
    subareaOptions,
    musicCategoryOptions,
    musicInstCategoryOptions,
    musicInstOptions
  ]);

  // note汎用関数
  // マルチコンボボックスで選んだ結果から、表示すべきチェックボックスを絞る処理
  const getFilteredChildOptions = (selectedParents, relationMap, childOptions) => {
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

  const filteredMusicInstrumentOptions = getFilteredChildOptions(
    selectedMusicInstCategoryItems,
    instCategoryToInstruments,
    musicInstOptions
  );
  
  const confirm = (e) => {
    e.preventDefault();
    console.log("✅ confirm発火");
  
    post(route('user.register.confirm'), {
      preserveState: true,
      preserveScroll: true,
      onError: (errors) => {
        console.log('🚨 バリデーションエラー:', errors);
      },
      onSuccess: () => {
        console.log('✅ 確認画面へ遷移');
      },
    });
  };




  return (
    <ThemeProvider theme={theme}>
      <Head title="音すくい | 新規登録" />
      <Header authUser={authUser} />
      <main className='pt-[132px] text-[var(--color-text-primary)]  bg-[var(--color-background)] select-none'>
        <h2 className='font-bold text-3xl text-center'>ユーザー登録</h2>
        {/* optimize エラーが出た時にカーソルを入力欄に合わせる */}
        <form onSubmit={confirm}>
          <Stack className='w-[90vw] md:w-[80vw] lg:w-[60vw] mt-8 mx-auto gap-y-2'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              confirm();
            }
          }
          }
          >
            {/* todo 入力フォーム・フォントのサイズ・間隔設定 */}
            {/* 氏名 */}
            <FormControl
              autoBindErrorInput
              title="氏名"
              htmlFor='name'
              helpMessage="スペースなしで入力してください"
              exampleMessage="山田太郎"
              errorMessages={errors.name ? [errors.name] : []}
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
              autoBindErrorInput
              title="フリガナ"
              htmlFor='furigana'
              helpMessage="カタカナ（スペースなし）で入力してください。"
              exampleMessage="ヤマダタロウ"
              errorMessages={errors.furigana ? [errors.furigana] : []}
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
                type='text'
                required
                onChange={(e) => setData('furigana', e.target.value)}
                className='h-[32px]'
              />
            </FormControl>
            {/* メールアドレス */}
            <FormControl
              autoBindErrorInput
              title="メールアドレス"
              htmlFor='email'
              helpMessage=""
              exampleMessage=""
              errorMessages={errors.email ? [errors.email] : []}
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
              autoBindErrorInput
              title="パスワード"
              htmlFor='password'
              helpMessage="8文字以上で入力してください。"
              exampleMessage=""
              errorMessages={errors.password ? [errors.password] : []}
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
                autoComplete="new-password"
                type='password'
                required
                onChange={(e) => setData('password', e.target.value)}
                className='h-[32px] w-1/2'
              />
            </FormControl>
            {/* 都道府県 MultiComboBox*/}
            <FormControl
              title="都道府県"
              htmlFor='area'
              helpMessage="地域に合わせた情報をお届けしやすくするために必要です。(複数選択可)"
              exampleMessage=""
              supplementaryMessage="この項目を選択すると、地域区分の選択肢が表示されます。"
              statusLabelProps={{
                children: '任意',
                type: 'grey'
              }}
            >
              <MultiComboBox
                items={areaOptions}
                name='area'
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
              exampleMessage=""
              helpMessage="地域に合わせた、より詳細な情報をお届けしやすくするために必要です。(複数選択可)"
              supplementaryMessage="都道府県の項目を選択すると、選択肢が表示されます。"
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
              exampleMessage=""
              helpMessage="検索・メルマガ配信のために利用します。(複数選択可)"
              supplementaryMessage="この項目を選択すると、楽器カテゴリの項目が表示されます。"
              title="経験・興味のある音楽ジャンル"
              statusLabelProps={{
                children: '任意',
                type: 'grey',
              }}
            >
              <Cluster
                gap={{
                  column: 1.25,
                  row: 0.5,
                }}
              >
                {musicCategoryOptions.map((cat) => (
                  <CheckBox
                    key={cat.value}
                    id={`music_category_${cat.value}`}
                    name={`music_category_${cat.value}`}
                    checked={selectedMusicCategories.some((i) => i.value === cat.value)}
                    onChange={() => {
                      const item = {label: cat.label, value: cat.value};
                      const newList = toggleItemInList(selectedMusicCategories, item);
                      setSelectedMusicCategories(newList);
                      setData('music_category_ids', newList.map((i) => i.value));
                    }}
                  >
                    {cat.label}
                  </CheckBox>
                ))}
              </Cluster>
            </Fieldset>
            {/* メールマガジン */}
            <Fieldset
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
                id="newsletter_opt_in"
                name="newsletter_opt_in"
                checked={data.newsletter_opt_in === 1}
                onChange={(e) => setData('newsletter_opt_in', e.target.checked ? 1 : 0)}
              >
                受け取る
              </CheckBox>

            </Fieldset>
            {/* メール通知機能 */}
            <Fieldset
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
                checked={data.email_notify_opt_in === 1}
                onChange={(e) => setData('email_notify_opt_in', e.target.checked ? 1 : 0)}
              >
                利用する
              </CheckBox>
            </Fieldset>
            {/* 経験・興味のある楽器カテゴリ */}
            <Fieldset
              exampleMessage=""
              helpMessage="楽器の分類を選択してください。(複数選択可)"
              supplementaryMessage="音楽ジャンルを選択すると、選択肢が表示されます。"
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
                  name='music_inst_category'
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
              exampleMessage=""
              helpMessage="楽器名を選択してください。(複数選択可)"
              supplementaryMessage="楽器カテゴリを選択すると、選択肢が表示されます。"
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
        </form>
        <div className='flex flex-col mx-auto mt-16 md:flex-row w-[160px] md:w-[368px] gap-y-6 md:gap-x-12 pb-16'>
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
            type='button'
            onClick={confirm}
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
      </main>
    </ThemeProvider >
  );
}