<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Area;
use App\Models\Subarea;
use App\Models\MusicCategory;
use App\Models\MusicInstCategory;
use App\Models\MusicInst;

class RegisterController extends Controller
{
  public function store(Request $request)
  {
    $validated = $request->validate([
      'name' => ['required', 'string', 'max:255', 'regex:/^[^\s　]+$/u'], // スペース禁止
      'furigana' => ['required', 'string', 'max:255', 'regex:/^[ァ-ヶー]+$/u'], // カタカナのみ（スペースなし）
      'email' => 'required|email|unique:users,email',
      'password' => 'required|string|min:8',
      'newsletter_opt_in' => 'nullable|in:0,1',
      'email_notify_opt_in' => 'nullable|in:0,1',
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
    ], [
      'required' => '必須項目です。',
      'name.regex' => 'スペースなしで入力してください。',
      'furigana.regex' => 'カタカナ（スペースなし）で入力してください。',
      'email' => 'メールアドレスの形式で入力してください。',
      'email.unique' => 'このメールアドレスは既に登録されています。',
      'password.min' => 'パスワードは8文字以上で入力してください。',
    ]);

    $user = User::create([
      'name' => $validated['name'],
      'furigana' => $validated['furigana'],
      'email' => $validated['email'],
      'password' => Hash::make($validated['password']),
      // 保存時
      'newsletter_opt_in' => (int) $request->input('newsletter_opt_in', 0),
      'email_notify_opt_in' => (int) $request->input('email_notify_opt_in', 0),
    ]);

    $now = now();

    $user->areas()->attach(
      collect($validated['area_ids'] ?? [])->mapWithKeys(fn($id) => [$id => ['created_at' => $now, 'updated_at' => $now]])->toArray()
    );
    $user->subareas()->attach(
      collect($validated['subarea_ids'] ?? [])->mapWithKeys(fn($id) => [$id => ['created_at' => $now, 'updated_at' => $now]])->toArray()
    );
    $user->musicCategories()->attach(
      collect($validated['music_category_ids'] ?? [])->mapWithKeys(fn($id) => [$id => ['created_at' => $now, 'updated_at' => $now]])->toArray()
    );
    $user->musicInstCategories()->attach(
      collect($validated['music_inst_category_ids'] ?? [])->mapWithKeys(fn($id) => [$id => ['created_at' => $now, 'updated_at' => $now]])->toArray()
    );
    $user->musicInsts()->attach(
      collect($validated['music_inst_ids'] ?? [])->mapWithKeys(fn($id) => [$id => ['created_at' => $now, 'updated_at' => $now]])->toArray()
    );

    Auth::login($user);
    return redirect()->route('top')->with('message', 'ユーザー登録が完了しました！トップ画面へ移ります。');
  }

  public function create(Request $request)
  {
    $formData = $request->all();
    $areas = Area::select('id as value', 'name as label')->get();
    $musicCategories = MusicCategory::select('id as value', 'name as label')->get();
    $musicInstCategories = MusicInstCategory::select('id as value', 'name as label')->get();
    $musicCategoryToInstCategoryMap = [];

    $subareas = Subarea::select('id as value', 'name as label')->get();
    $musicInsts = MusicInst::select('id as value', 'name as label')->get();

    $relationInstCategories = DB::table('music_categories_music_inst_categories')->get();
    foreach ($relationInstCategories as $rel) {
      $musicCategoryToInstCategoryMap[$rel->music_category_id][] = $rel->music_inst_category_id;
    }

    $instCategoryToInstruments = MusicInst::select('id', 'music_inst_category_id')
      ->get()
      ->groupBy('music_inst_category_id')
      ->mapWithKeys(fn($items, $key) => [(string) $key => $items->pluck('id')->values()->toArray()]);

    $areaToSubarea = Subarea::select('id', 'area_id')
      ->get()
      ->groupBy('area_id')
      ->mapWithKeys(fn($items, $key) => [(string) $key => $items->pluck('id')->values()->toArray()]);

    return Inertia::render('Auth/Register', [
      'areas' => $areas,
      'subareas' => $subareas,
      'areaToSubarea' => $areaToSubarea,
      'musicCategories' => $musicCategories,
      'musicInstCategories' => $musicInstCategories,
      'musicInsts' => $musicInsts,
      'musicCategoryToInstCategoryMap' => $musicCategoryToInstCategoryMap,
      'instCategoryToInstruments' => $instCategoryToInstruments,
      'formData' => $formData,
    ]);
  }

  public function confirm(Request $request)
  {
    $validated = $request->validate([
      'name' => ['required', 'string', 'max:255', 'regex:/^[^\s　]+$/u'], // スペース禁止
      'furigana' => ['required', 'string', 'max:255', 'regex:/^[ァ-ヶー]+$/u'], // カタカナのみ（スペースなし）
      'email' => 'required|email',
      'password' => 'required|string|min:8',
      // バリデーション
      'newsletter_opt_in' => 'nullable|in:0,1',
      'email_notify_opt_in' => 'nullable|in:0,1',
      'area_ids' => 'nullable|array',
      'subarea_ids' => 'nullable|array',
      'music_category_ids' => 'nullable|array',
      'music_inst_category_ids' => 'nullable|array',
      'music_inst_ids' => 'nullable|array',
    ], [
      'required' => '必須項目です。',
      'name.regex' => 'スペースなしで入力してください。',
      'furigana.regex' => 'カタカナ（スペースなし）で入力してください。',
      'email' => 'メールアドレスの形式で入力してください。',
      'email.unique' => 'このメールアドレスは既に登録されています。',
      'password.min' => 'パスワードは8文字以上で入力してください。',
    ]);

    $areaLabels = Area::whereIn('id', $request->input('area_ids', []))->pluck('name')->toArray();
    $subareaLabels = Subarea::whereIn('id', $request->input('subarea_ids', []))->pluck('name')->toArray();
    $musicCategoryLabels = MusicCategory::whereIn('id', $request->input('music_category_ids', []))->pluck('name')->toArray();
    $musicInstCategoryLabels = MusicInstCategory::whereIn('id', $request->input('music_inst_category_ids', []))->pluck('name')->toArray();
    $musicInstLabels = MusicInst::whereIn('id', $request->input('music_inst_ids', []))->pluck('name')->toArray();

    return Inertia::render('Auth/RegisterConfirm', [
      'canRegister' => $validated,
      'areaLabels' => $areaLabels,
      'subareaLabels' => $subareaLabels,
      'musicCategoryLabels' => $musicCategoryLabels,
      'musicInstCategoryLabels' => $musicInstCategoryLabels,
      'musicInstLabels' => $musicInstLabels,
    ]);
  }
}
