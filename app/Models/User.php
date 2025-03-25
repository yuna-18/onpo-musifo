<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
  /** @use HasFactory<\Database\Factories\UserFactory> */
  use HasFactory, Notifiable;

  /**
   * The attributes that are mass assignable.
   *
   * @var list<string>
   */
  protected $fillable = [
    'name',
    'email',
    'password',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var list<string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * Get the attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array
  {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
    ];
  }

  // 一番下に以下のメソッドを追加する。
  public function bookmarks()
  {
    // $thisは、Userモデルそのものと思ってください。
    return $this->hasMany(Bookmark::class);
  }

  // 音楽系
  public function musicCategories()
  {
    return $this->belongsToMany(MusicCategory::class, 'users_music_categories');
  }
  public function musicInstCategories()
  {
    return $this->belongsToMany(MusicInstCategory::class, 'users_music_inst_categories');
  }
  public function musicInsts()
  {
    return $this->belongsToMany(MusicInst::class, 'users_music_insts');
  }
  
  // 地域系
  public function areas()
  {
    return $this->belongsToMany(Area::class, 'users_areas');
  }
  public function subareas()
  {
    return $this->belongsToMany(Subarea::class, 'users_subareas');
  }
}
