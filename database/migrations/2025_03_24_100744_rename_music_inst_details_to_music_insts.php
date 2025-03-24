<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('music_inst_details', function (Blueprint $table) {
             // 旧テーブル名: music_insts, 新テーブル名: new_music_insts
        Schema::rename('music_inst_details', 'music_insts');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('music_inst_details', function (Blueprint $table) {
            // downメソッドでは元のテーブル名に戻す
        Schema::rename('music_insts', 'music_inst_details');
        });
    }
};
