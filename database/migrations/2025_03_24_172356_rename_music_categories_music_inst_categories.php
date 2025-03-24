<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 誤字になっているテーブル名 "music_categories_music_inst_cateogries" が存在し、
        // かつ正しいテーブル "categories" が存在しない場合のみリネーム
        if (Schema::hasTable('music_categories_music_inst_cateogries') && ! Schema::hasTable('music_categories_music_inst_categories')) {
            Schema::rename('music_categories_music_inst_cateogries', 'music_categories_music_inst_categories');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // down() では、もし "categories" テーブルが存在していて、
        // "music_categories_music_inst_cateogries" が存在しなければ元に戻す
        if (Schema::hasTable('music_categories_music_inst_categories') && ! Schema::hasTable('music_categories_music_inst_cateogries')) {
            Schema::rename('music_categories_music_inst_categories', 'music_categories_music_inst_cateogries');
        }
    }
};
