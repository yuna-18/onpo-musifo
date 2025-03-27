<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('users_music_inst_categories', function (Blueprint $table) {
          $table->id();
          $table->unsignedBigInteger('user_id');
          $table->unsignedBigInteger('music_inst_category_id');
          $table->timestamps();
          $table->softDeletes();

          // 短めの制約名を手動で付与
          $table->foreign('user_id', 'fk_umc_user')
              ->references('id')->on('users')
              ->onDelete('cascade');

          $table->foreign('music_inst_category_id', 'fk_umc_inst_cat')
              ->references('id')->on('music_inst_categories')
              ->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('users_music_inst_categories');
    }
};
