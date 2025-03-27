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

    $user = User::create([
      'name' => $validated['name'],
      'furigana' => $validated['furigana'],
      'email' => $validated['email'],
      'password' => Hash::make($validated['password']),
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

  public function create()
  {
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
    ]);
  }
}
