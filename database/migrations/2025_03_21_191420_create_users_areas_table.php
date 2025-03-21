<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users_areas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                  ->constrained('users')
                  ->cascadeOnDelete();
            $table->foreignId('area_id')
                  ->constrained('areas')
                  ->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes(); // 論理削除
        });
    }

    public function down(): void
    {
        // 外部キー＆softDeletes を先にdrop → テーブルdrop
        Schema::table('users_areas', function (Blueprint $table) {
            $table->dropConstrainedForeignId('user_id');
            $table->dropConstrainedForeignId('area_id');
            $table->dropSoftDeletes();
        });
        Schema::dropIfExists('users_areas');
    }
};
