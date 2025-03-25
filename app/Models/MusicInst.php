<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MusicInst extends Model
{
    // 新しいテーブル名を指定
  protected $table = 'music_insts';
  
  public function musicInstCategory()
  {
    return $this->belongsTo(MusicInstCategory::class);
  }
  
  public function users()
{
    return $this->belongsToMany(User::class, 'users_music_insts');
}
}
