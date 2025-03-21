<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->id();                     // id
            $table->string('name', 100);      // 市区町村名
            // SubareasテーブルのFK
            $table->foreignId('sub_area_id')
                  ->constrained('subareas')
                  ->cascadeOnDelete();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::table('cities', function (Blueprint $table) {
            $table->dropConstrainedForeignId('sub_area_id');
        });
        Schema::dropIfExists('cities');
    }
};
