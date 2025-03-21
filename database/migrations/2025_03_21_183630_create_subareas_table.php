<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subareas', function (Blueprint $table) {
            $table->id();                      // id
            $table->string('name', 100);       // 地域区分名
            // AreasテーブルのFK
            $table->foreignId('area_id')
                  ->constrained('areas')
                  ->cascadeOnDelete();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        // 外部キーを先にdrop → テーブルdrop（安全策）
        Schema::table('subareas', function (Blueprint $table) {
            $table->dropConstrainedForeignId('area_id');
        });
        Schema::dropIfExists('subareas');
    }
};