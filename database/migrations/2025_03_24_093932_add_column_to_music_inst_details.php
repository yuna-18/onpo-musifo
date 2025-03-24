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
      // マスターテーブルなので、必ずSeederで値を設定するならdefaultは必須ではないが、
      // 念のため0をデフォルトに設定し、unsignedとインデックスも付与しておく
      $table->unsignedInteger('sort_order')->default(0)->index()->after('en_name_abbr');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('music_inst_details', function (Blueprint $table) {
      $table->dropIndex(['sort_order']); // インデックスの削除
      $table->dropColumn('sort_order');
    });
  }
};
