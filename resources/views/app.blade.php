<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title inertia>{{ config('app.name', 'Laravel') }}</title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.bunny.net">
  <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

  <!-- Scripts -->
  @routes
  @viteReactRefresh
  @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
  @inertiaHead
</head>

<body class="font-notosans antialiased">
  @inertia
  <!-- Google CSE 用の独立したコンテナ -->
  <div id="google-cse-container" style="display: none;"></div>
</body>

<script>
  // ✅ 検索窓の表示切り替え関数
  function toggleGoogleCSEContainer() {
    const container = document.getElementById("google-cse-container");
    if (!container) return;

    const hostname = window.location.hostname;
    const pathname = window.location.pathname.replace(/\/+$/, ''); // 末尾スラッシュ削除

    const isDev = hostname === 'localhost' || hostname === '127.0.0.1';
    const isTopPage =
      (isDev && pathname === '') ||              // ローカルは '/'
      (!isDev && pathname === '/otosukui');      // 本番は '/otosukui'

    container.style.display = isTopPage ? "block" : "none";
  }

  // ✅ Inertia.js 完了時に切り替え実行
  document.addEventListener("inertia:finish", toggleGoogleCSEContainer);

  // ✅ 初回ロードで実行
  toggleGoogleCSEContainer();
</script>

</html>