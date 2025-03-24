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
    Schema::table('music_categories_music_insts', function (Blueprint $table) {
      // 旧テーブル名: music_insts, 新テーブル名: new_music_insts
      Schema::rename('music_categories_music_insts', 'music_categories_music_inst_cateogries');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('music_categories_music_insts', function (Blueprint $table) {
      // downメソッドでは元のテーブル名に戻す
      Schema::rename('music_categories_music_inst_categories', 'music_categories_music_insts');
    });
  }
};
