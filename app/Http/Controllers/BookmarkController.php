<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use function Termwind\render;

class BookmarkController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $bookmarks = Bookmark::where('user_id', Auth::id())->latest()->get();

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
      'authUser' => Auth::user(), // ← 追加
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $now = now();
    $convertedNotifyAt = null;

    $validated = $request->validate([
      'url' => 'required|url',
      'title' => 'nullable|max:30',
      'comment' => 'nullable',
      'notify_opt_in' => 'nullable|in:0,1',
      'notify_at' => [
        'nullable',
        function ($attribute, $value, $fail) use (&$convertedNotifyAt, $now) {
          if ($value) {
            try {
              // フロントからの "YYYY-MM-DDTHH:MM" を "YYYY-MM-DD HH:MM:00" に変換
              $converted = \Carbon\Carbon::createFromFormat('Y-m-d\TH:i', $value);
              if ($converted->lt($now->copy()->addHour())) {
                $fail('通知日時は現在時刻より1時間以上先でなければなりません。');
              }
              $convertedNotifyAt = $converted->format('Y-m-d H:i:s');
            } catch (\Exception $e) {
              $fail('通知日時の形式が正しくありません。');
            }
          }
        }
      ],
    ], [
      'url' => 'URLの形式を満たしていません。',
      'url.required' => 'URLは必ず入力してください。',
      'title.max' => '30文字未満で入力してください。',
    ]);

    $bookmark = Bookmark::create([
      'user_id'       => Auth::id(),
      'url'           => $validated['url'],
      'title'         => $validated['title'] ?? null,
      'comment'       => $validated['comment'] ?? null,
      'notify_opt_in' => (int) $request->input('notify_opt_in', 0),
      'notify_at'     => $convertedNotifyAt,
    ]);

    return response()->json(['message' => 'ブックマークが登録されました。']);
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
    return Inertia::render('BookmarkEdit', [
      'authUser' => Auth::user(),
      'bookmark' => $bookmark,
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Bookmark $bookmark)
{
    $now = now();
    $convertedNotifyAt = null;

    $validated = $request->validate([
        'url' => 'required|url',
        'title' => 'nullable|max:30',
        'comment' => 'nullable',
        'notify_opt_in' => 'nullable|in:0,1',
        'notify_at' => [
            'nullable',
            function ($attribute, $value, $fail) use (&$convertedNotifyAt, $now) {
                if ($value) {
                    try {
                        $converted = \Carbon\Carbon::createFromFormat('Y-m-d\TH:i', $value);
                        if ($converted->lt($now->copy()->addHour())) {
                            $fail('通知日時は現在時刻より1時間以上先でなければなりません。');
                        }
                        $convertedNotifyAt = $converted->format('Y-m-d H:i:s');
                    } catch (\Exception $e) {
                        $fail('通知日時の形式が正しくありません。');
                    }
                }
            }
        ],
    ], [
        'url.required' => 'URLは必ず入力してください。',
        'title.max' => '30文字未満で入力してください。',
    ]);

    $bookmark->update([
        'user_id'       => Auth::id(),
        'url'           => $validated['url'],
        'title'         => $validated['title'] ?? null,
        'comment'       => $validated['comment'] ?? null,
        'notify_opt_in' => (int) $request->input('notify_opt_in', 0),
        'notify_at'     => $convertedNotifyAt,
    ]);

    return redirect()->route('favorite');
}


  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Bookmark $bookmark)
  {
    $bookmark->delete();
  }
}
