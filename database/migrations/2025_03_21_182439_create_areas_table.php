<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('areas', function (Blueprint $table) {
            $table->id();                     // id (INT PK, AUTO_INCREMENT)
            $table->string('name', 100);      // 都道府県名 (NOT NULL)
            $table->timestamps();             // created_at, updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('areas');
    }
};