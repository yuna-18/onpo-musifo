<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
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
  Route::post('/favorite', [BookmarkController::class, 'store'])->name('favorite.store');
});


Route::get('/smarthr-test', function () {
  return Inertia::render('SmarthrTest');
});

require __DIR__ . '/auth.php';
