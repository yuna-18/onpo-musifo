<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
  public function subareas()
  {
    return $this->hasMany(Subarea::class);
  }
  
  public function users()
{
    return $this->belongsToMany(User::class, 'users_areas');
}
}
