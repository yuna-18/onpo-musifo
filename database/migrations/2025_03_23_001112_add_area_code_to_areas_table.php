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
    Schema::table('areas', function (Blueprint $table) {
      $table->string('area_code', 20)->unique()->after('name'); // ユニークインデックスを付与
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('areas', function (Blueprint $table) {
      $table->dropUnique(['area_code']); // インデックスを先に削除
      $table->dropColumn('area_code');   // カラム削除
    });
  }
};
