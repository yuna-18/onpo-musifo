<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('music_insts', function (Blueprint $table) {
            $table->id();                          // id
            $table->string('name', 100);           // 大分類（日本語）
            $table->string('name_abbr', 50)->nullable();    // 日本語略称
            $table->string('en_name', 100);                  // 英語名
            $table->string('en_name_abbr', 50)->nullable();  // 英語略称
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('music_insts');
    }
};
