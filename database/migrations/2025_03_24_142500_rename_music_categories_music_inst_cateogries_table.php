<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::rename('music_categories_music_inst_cateogries', 'music_categories_music_inst_categories');
    }

    public function down(): void
    {
        Schema::rename('music_categories_music_inst_categories', 'music_categories_music_inst_cateogries');
    }
};
