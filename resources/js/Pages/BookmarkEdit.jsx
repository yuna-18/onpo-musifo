import React from "react";
import { useForm, Head } from "@inertiajs/react";
import { createTheme, ThemeProvider, FormControl, Fieldset, Stack, Input, Button, Center, CheckBox } from 'smarthr-ui';

const BookmarkEdit = ({ authUser, bookmark }) => {
  const theme = createTheme();

  const { data, setData, patch, processing, errors } = useForm({
    url: bookmark.url || '',
    title: bookmark.title || '',
    comment: bookmark.comment || '',
    notify_opt_in: bookmark.notify_opt_in || 0,
    notify_at: bookmark.notify_at ? bookmark.notify_at.replace(' ', 'T') : '',
  });

  const submit = (e) => {
    e.preventDefault();
    patch(route('favorite.update', bookmark.id));
  };

  return (
    <ThemeProvider theme={theme}>
      <Head title="お気に入り編集" />
      <Center className=" bg-[var(--color-background)] h-screen overflow-y-auto">
        <main className='text-[var(--color-text-primary)] select-none'>
          <h2 className='font-bold text-3xl text-center mt-16'>ブックマーク編集</h2>
          <form onSubmit={submit}>
            <Stack className='w-fit mt-8 gap-y-2'>
              <FormControl title="URL(リンク)" htmlFor='url' errorMessages={errors.url ? [errors.url] : []}>
                <Input
                  id="url"
                  name="url"
                  value={data.url}
                  autoComplete="url"
                  autoFocus
                  type='text'
                  required
                  onChange={(e) => setData('url', e.target.value)}
                  className='w-[50vw] md:w-[40vw] min-w-[320px] max-w-[600px] h-[32px] border rounded-md p-2'
                />
              </FormControl>
              <FormControl title="タイトル" htmlFor='title' errorMessages={errors.title ? [errors.title] : []}>
                <Input
                  id="title"
                  name="title"
                  value={data.title}
                  type='text'
                  onChange={(e) => setData('title', e.target.value)}
                  className='w-[50vw] md:w-[40vw] min-w-[320px] max-w-[600px] h-[32px] border rounded-md p-2'
                />
              </FormControl>
              <FormControl title="メモ" htmlFor='comment'>
                <Input
                  id="comment"
                  name="comment"
                  value={data.comment}
                  type='text'
                  onChange={(e) => setData('comment', e.target.value)}
                  className='w-[50vw] md:w-[40vw] min-w-[320px] max-w-[600px] h-24 border rounded-md p-2'
                />
              </FormControl>
              {authUser.email_notify_opt_in === 1 && (
                <>
                  <Fieldset title="通知">
                    <CheckBox
                      id="notify_opt_in"
                      name="notify_opt_in"
                      checked={data.notify_opt_in === 1}
                      onChange={(e) => setData('notify_opt_in', e.target.checked ? 1 : 0)}
                    >
                      あり
                    </CheckBox>
                  </Fieldset>
                  {data.notify_opt_in === 1 && (
                    <FormControl title="通知日時" htmlFor='notify_at' errorMessages={errors.notify_at ? [errors.notify_at] : []}>
                      <Input
                        id="notify_at"
                        name="notify_at"
                        value={data.notify_at}
                        type='datetime-local'
                        onChange={(e) => setData('notify_at', e.target.value)}
                        className='h-[32px] border rounded-md p-2'
                      />
                    </FormControl>
                  )}
                </>
              )}
            </Stack>
            <div className='flex flex-col mx-auto mt-16 md:flex-row w-[160px] md:w-[368px] gap-y-6 md:gap-x-12 pb-16'>
              <Button
                onClick={() => history.back()}
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
                type='submit'
                prefix=""
                size="default"
                suffix=""
                variant="primary"
                wide
                disabled={processing}
                className='h-[44px] bg-[var(--color-primary)] font-bold text-base/[1] border-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-hover)] hover:border-[var(--color-primary-hover)]'
              >
                変更
              </Button>
            </div>
          </form>
        </main>
      </Center>
    </ThemeProvider>
  );
};

export default BookmarkEdit;