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

    return Inertia::render('Favorite', [
      'authUser' => Auth::user(),
      'bookmarks' => $bookmarks,
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
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
