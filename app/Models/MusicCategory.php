<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MusicCategory extends Model
{
  // 新しいテーブル名を指定
  protected $table = 'music_categories';

  public function musicInstCategories()
  {
    return $this->belongsToMany(MusicInstCategory::class, 'music_categories_music_inst_categories');
  }
  
  public function users()
{
    return $this->belongsToMany(User::class, 'users_music_categories');
}

}
