<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\BookmarkController;

Route::get('/', function () {
  return Inertia::render('Top', [
    'authUser' => optional(Auth::user())->toArray(), // null の場合は null を返す
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
  ]);
})->name('top');

Route::middleware('auth')->group(function () {
  // マイページ
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

  // お気に入りページ（一覧表示）
  Route::get('/favorite', [BookmarkController::class, 'index'])->name('favorite');
  // 編集画面と更新処理
  Route::get('/favorite/{bookmark}/edit', [BookmarkController::class, 'edit'])->name('favorite.edit');
  Route::patch('/favorite/{bookmark}', [BookmarkController::class, 'update'])->name('favorite.update');
  // 削除
  Route::delete('/favorite/{bookmark}', [BookmarkController::class, 'destroy'])->name('favorite.destroy');
  // 外部登録フォームがあるなら
  Route::get('/favorite/create', [BookmarkController::class, 'create'])->name('favorite.create');
  Route::post('/favorite/store', [BookmarkController::class, 'store'])->name('favorite.store');


  Route::get('/favorite/how-to-save', function () {
    return Inertia::render('BookmarkletGuide', [
      'authUser' => optional(Auth::user())->toArray(),
    ]);
  })->name('favorite.howtosave');
});

Route::get('/smarthr-test', function () {
  return Inertia::render('SmarthrTest');
});

// ユーザー登録（自作フォーム）
// BreezeやJetstreamなどのauth.phpのregisterルートは使わない前提
Route::get('/register', [RegisterController::class, 'create'])->name('user.register');
Route::post('/register/confirm', [RegisterController::class, 'confirm'])->name('user.register.confirm');
Route::post('/register', [RegisterController::class, 'store'])->name('user.register.store');

require __DIR__ . '/auth.php';
