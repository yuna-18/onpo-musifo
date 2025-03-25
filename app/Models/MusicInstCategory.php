<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MusicInstCategory extends Model
{
  // 新しいテーブル名を指定
  protected $table = 'music_inst_categories';

  public function musicCategories()
  {
    return $this->belongsToMany(MusicCategory::class, 'music_categories_music_inst_categories');
  }
  
  public function users()
{
    return $this->belongsToMany(User::class, 'users_music_inst_categories');
}
}
