<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subarea extends Model
{
  public function users()
  {
    return $this->belongsToMany(User::class, 'users_subareas');
  }
  
  public function cities()
  {
    return $this->hasMany(City::class);
  }
}
