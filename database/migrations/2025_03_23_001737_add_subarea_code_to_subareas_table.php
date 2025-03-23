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
    Schema::table('subareas', function (Blueprint $table) {
      $table->string('subarea_code', 50)->unique()->after('name'); // ユニークインデックスを付与
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('subareas', function (Blueprint $table) {
      $table->dropUnique(['subarea_code']); // インデックスを先に削除
      $table->dropColumn('subarea_code');   // カラム削除
    });
  }
};
