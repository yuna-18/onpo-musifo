import React, {useState, useEffect} from "react";
// useLocationは不要なので削除

import {createTheme, ThemeProvider, FormControl, Fieldset, Stack, Input, Button, Center} from 'smarthr-ui';
// Inertiaのヘッダーなど必要ならインポートする
// import { Head } from '@inertiajs/react'; // 例

const BookmarkCreate = ({authUser, initialData}) => {
  const theme = createTheme();

  // URLのクエリパラメータは window.location.search から取得
  const query = new URLSearchParams(window.location.search);
  const initialTitle = query.get('title') || 'お気に入り';
  const initialUrl = query.get('url') || '';

  const [data, setData] = useState({
    url: initialUrl,
    title: initialTitle,
    comment: '',
    notify_opt_in: 0,
    notify_at: '',
  });
  // useEffect(() => {
  // console.log('authUser', authUser.email_notify_opt_in)
  // }, [])

  // もしクエリパラメータが動的に変化する可能性があれば useEffect で更新できますが、
  // 通常は初回取得で十分です。

  const submit = async (e) => {
    e.preventDefault();
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    try {
      const response = await fetch('/favorite/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (response.ok) {
        alert('お気に入り一覧に追加されました');
        // 成功時にポップアップを閉じる
        window.close();
      } else {
        const text = await response.text();
        console.error('エラー内容:', text);
        // console.log(data);
        alert('登録に失敗しました: ' + text);
      }
    } catch (error) {
      console.error('通信エラー:', error);
      alert('登録中にエラーが発生しました');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* InertiaのHead等、必要ならここに追加 */}
      <Center className=" bg-[var(--color-background)] h-screen overflow-y-auto">
        <main className='text-[var(--color-text-primary)] select-none'>
          <h2 className='font-bold text-3xl text-center mt-16'>ブックマーク登録</h2>
          <form onSubmit={submit}>
            <Stack className='w-fit mt-8 gap-y-2'>
              <FormControl title="URL(リンク)" htmlFor='url' errorMessages={[]}>
                <Input
                  id="url"
                  name="url"
                  value={data.url}
                  autoComplete="url"
                  autoFocus
                  type='text'
                  required
                  onChange={(e) => setData({...data, url: e.target.value})}
                  className='w-[50vw] md:w-[40vw] min-w-[320px] max-w-[600px] h-[32px] border rounded-md p-2'
                />
              </FormControl>
              <FormControl title="タイトル" htmlFor='title'>
                <Input
                  id="title"
                  name="title"
                  value={data.title}
                  type='text'
                  onChange={(e) => setData({...data, title: e.target.value})}
                  className='w-[50vw] md:w-[40vw] min-w-[320px] max-w-[600px] h-[32px] border rounded-md p-2'
                />
              </FormControl>
              <FormControl title="メモ" htmlFor='comment'>
                <Input
                  id="comment"
                  name="comment"
                  value={data.comment}
                  type='text'
                  onChange={(e) => setData({...data, comment: e.target.value})}
                  className='w-[50vw] md:w-[40vw] min-w-[320px] max-w-[600px] h-24 border rounded-md p-2'
                />
              </FormControl>
              {authUser.email_notify_opt_in === 1 ? (
                <>
                  <Fieldset title="通知" className="">
                    <Input
                      id="notify_opt_in"
                      name="notify_opt_in"
                      type='checkbox'
                      checked={data.notify_opt_in === 1}
                      onChange={(e) => setData({...data, notify_opt_in: e.target.checked ? 1 : 0})}
                      className="p-0"
                    /> あり
                  </Fieldset>
                  {data.notify_opt_in === 1 ? (
                    <FormControl title="通知日時" htmlFor='notify_at' errorMessages={[]}>
                      <Input
                        id="notify_at"
                        name="notify_at"
                        value={data.notify_at}
                        type='datetime-local'
                        onChange={(e) => setData({...data, notify_at: e.target.value})}
                        className='h-[32px] border rounded-md p-2'
                      />
                    </FormControl>
                  ) : null}
                </>
              ) : null}
            </Stack>
            <div className='flex flex-col mx-auto mt-16 md:flex-row w-[160px] md:w-[368px] gap-y-6 md:gap-x-12 pb-16'>
              <Button
                onClick={() => window.close()}
                prefix=""
                size="default"
                suffix=""
                variant="secondary"
                wide
                className='h-[44px] bg-[var(--color-white)] font-bold text-base/[1] border-[var(--color-text-primary)] hover:bg-[var(--color-primary-bg-hover)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]'
              >
                キャンセル
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
          </form>
        </main>
      </Center>
    </ThemeProvider>
  );
};

export default BookmarkCreate;