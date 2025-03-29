<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Bookmark extends Model
{
  use SoftDeletes; // ← これを追加！

  protected $fillable = [
    'user_id',
    'url',
    'title',
    'comment',
    'notify_opt_in',
    'notify_at'
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}