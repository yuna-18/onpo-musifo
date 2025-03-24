<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    // 旧テーブル名: music_insts, 新テーブル名: new_music_insts
    Schema::rename('users_music_insts', 'users_music_inst_categories');
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::rename('users_music_inst_categories', 'users_music_insts');
  }
};
