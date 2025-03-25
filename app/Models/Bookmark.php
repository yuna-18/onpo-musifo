<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bookmark extends Model
{
  // ⭐️ここから下追加する
  // 追加：↓1行
  protected $fillable = [
    'url',
    'comment',
    'notify_opt_in',
    'notify_at'
  ];

  // 追加：userメソッド
  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
