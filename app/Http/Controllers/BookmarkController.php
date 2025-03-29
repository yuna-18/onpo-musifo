<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class BookmarkController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $bookmarks = Bookmark::where('user_id', Auth::id())->get();

    return Inertia::render('Bookmark', [
      'authUser' => Auth::user(),
      'bookmarks' => $bookmarks,
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create(Request $request)
{
    // ブックマークレットから渡されたパラメータを利用してフォームの初期値を設定
    $initialData = [
        'title' => $request->query('title', 'お気に入り'),
        'url' => $request->query('url', ''),
    ];
    // Inertia を使っている場合、初期データをpropsに渡す
    return Inertia::render('BookmarkCreate', [
        'initialData' => $initialData,
    ]);
}

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $now = now();

    $validated = $request->validate([
      'url' => 'required|url',
      'title' => 'nullable|max:30',
      'comment' => 'nullable',
      'notify_opt_in' => 'nullable|in:0,1',
      'notify_at' => [
        'nullable',
        'date',
        // カスタムルール: 現在時刻の1時間後より未来でなければならない
        function ($attribute, $value, $fail) use ($now) {
          // $now->copy()で現在時刻のクローンを作成
          if (strtotime($value) < strtotime($now->copy()->addHour())) {
            $fail($attribute . 'は現在時刻より1時間以上先でなければなりません。');
          }
        }
      ],
    ], [
      'url.required' => 'URLは必ず入力してください。',
      'title.max' => '30文字未満で入力してください。',
    ]);

    // データ作成
    $bookmark = Bookmark::create([
      'url' => $validated['url'],
      'title' => $validated['title'] ?? null,
      'comment' => $validated['comment'] ?? null,
      'notify_opt_in' => (int) $request->input('notify_opt_in', 0),
      'notify_at' => $validated['notify_at'] ?? null,
    ]);

    // 登録完了後は一覧ページへリダイレクトする例
    return redirect()->route('favorite')->with('success', 'ブックマークが登録されました。');
  }

  /**
   * Display the specified resource.
   */
  public function show(Bookmark $bookmark)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Bookmark $bookmark)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Bookmark $bookmark)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Bookmark $bookmark)
  {
    //
  }
}
