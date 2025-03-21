<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('music_categories_music_insts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('music_category_id')
                  ->constrained('music_categories');
            $table->foreignId('music_inst_id')
                  ->constrained('music_insts');
            $table->timestamps();
            // ソフトデリートや cascadeOnDelete は付けない方針
        });
    }

    public function down(): void
    {
        Schema::table('music_categories_music_insts', function (Blueprint $table) {
            $table->dropConstrainedForeignId('music_category_id');
            $table->dropConstrainedForeignId('music_inst_id');
        });
        Schema::dropIfExists('music_categories_music_insts');
    }
};
