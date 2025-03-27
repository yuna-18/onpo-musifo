<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('music_categories_music_inst_categories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('music_category_id');
            $table->unsignedBigInteger('music_inst_category_id');
            $table->timestamps();

            // 短めの制約名を手動で付与
            $table->foreign('music_category_id', 'fk_mcm_cat')
                ->references('id')->on('music_categories')
                ->onDelete('cascade');

            $table->foreign('music_inst_category_id', 'fk_mcm_inst_cat')
                ->references('id')->on('music_inst_categories')
                ->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('music_categories_music_inst_categories');
    }
};