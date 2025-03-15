<?php
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
  return Inertia::render('Top', [
    'authUser' => optional(Auth::user())->toArray(), // null の場合は null を返す
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
  ]);
})->name('top');

Route::middleware('auth')->group(function () {
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/favorite', function () {
  return Inertia::render('Favorite', [
    'authUser' => optional(Auth::user())->toArray(), // null の場合は null を返す
  ]);
})->name('favorite');

Route::get('/smarthr-test', function () {
  return Inertia::render('SmarthrTest');
});

require __DIR__ . '/auth.php';
