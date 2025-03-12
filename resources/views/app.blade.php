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
  <div id="google-cse-container"></div>
</body>

<script>
  function toggleGoogleCSEContainer() {
    // 例: トップページのパスを "/top" としている場合
    const container = document.getElementById("google-cse-container");
    if (!container) return;
    if (window.location.pathname === '/') {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  }

  // 初回ロード時
  document.addEventListener("DOMContentLoaded", toggleGoogleCSEContainer);
  // ブラウザの戻る・進むなどでのナビゲーション時
  window.addEventListener("popstate", toggleGoogleCSEContainer);
  // Inertia.js のページ遷移完了時に実行
  document.addEventListener("inertia:finish", toggleGoogleCSEContainer);
</script>

</html>