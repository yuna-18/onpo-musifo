<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up(): void
  {
    // 正しいリネーム。スペルミスのある名前にリネーム（意図的）
    if (Schema::hasTable('music_categories_music_insts')) {
      Schema::rename('music_categories_music_insts', 'music_categories_music_inst_cateogries');
    }
  }

  public function down(): void
  {
    // 元に戻す（スペルミスから正しい名前へ）
    if (Schema::hasTable('music_categories_music_inst_cateogries')) {
      Schema::rename('music_categories_music_inst_cateogries', 'music_categories_music_insts');
    }
  }
};