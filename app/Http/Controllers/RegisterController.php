<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Area;
use App\Models\Subarea;
use App\Models\MusicCategory;
use App\Models\MusicInstCategory;
use App\Models\MusicInst;

class RegisterController extends Controller
{
  public function store(Request $request)
  {
    // バリデーション
    $validated = $request->validate([
      'name' => 'required|string|max:255',
      'furigana' => 'required|string|max:255',
      'email' => 'required|email|unique:users,email',
      'password' => 'required|string|min:8',

      // 任意の項目&中の値は整数限定
      'area_ids' => 'nullable|array',
      'area_ids.*' => 'integer|exists:areas,id',
      'subarea_ids' => 'nullable|array',
      'subarea_ids.*' => 'integer|exists:subareas,id',
      'music_category_ids' => 'nullable|array',
      'music_category_ids.*' => 'integer|exists:music_categories,id',
      'music_inst_category_ids' => 'nullable|array',
      'music_inst_category_ids.*' => 'integer|exists:music_inst_categories,id',
      'music_inst_ids' => 'nullable|array',
      'music_inst_ids.*' => 'integer|exists:music_insts,id',
    ]);

    // ユーザー作成
    $user = User::create([
      'name' => $validated['name'],
      'furigana' => $validated['furigana'],
      'email' => $validated['email'],
      'password' => Hash::make($validated['password']),
    ]);

    // 中間テーブルに関連データを保存
    $user->areas()->attach($validated['area_ids'] ?? []);
    $user->subareas()->attach($validated['subarea_ids'] ?? []);
    $user->musicCategories()->attach($validated['music_category_ids'] ?? []);
    $user->musicInstCategories()->attach($validated['music_inst_category_ids'] ?? []);
    $user->musicInsts()->attach($validated['music_inst_ids'] ?? []);

    // ログインさせる場合（任意）
    Auth::login($user);
    return redirect()->route('top')->with('message', 'ユーザー登録が完了しました！トップ画面へ移ります。');
  }

  public function create()
  {
    $areas = Area::select('id as value', 'name as label')->get();
    $subareas = Subarea::select('id as value', 'name as label')->get();
    $musicCategories = MusicCategory::select('id as value', 'name as label')->get();
    $musicInstCategories = MusicInstCategory::select('id as value', 'name as label')->get();
    $musicInsts = MusicInst::select('id as value', 'name as label')->get();

    return Inertia::render('Auth/Register', [
      'areas' => $areas,
      'subareas' => $subareas,
      'musicCategories' => $musicCategories,
      'musicInstCategories' => $musicInstCategories,
      'musicInsts' => $musicInsts,
    ]);
  }
}
