<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
  public function up(): void
  {
    // 外部キー制約を安全に削除（元々の制約名が間違ってた可能性に備えたトライ）
    try {
      DB::statement('ALTER TABLE `music_categories_music_inst_categories` DROP FOREIGN KEY `music_categories_music_inst_categories_music_inst_id_foreign`');
    } catch (\Exception $e) {
      // 無視してOK
    }
    try {
      DB::statement('ALTER TABLE `music_categories_music_inst_categories` DROP FOREIGN KEY `fk_orig_mi`');
    } catch (\Exception $e) {
      // 無視してOK
    }

    Schema::table('music_categories_music_inst_categories', function (Blueprint $table) {
      // カラム名を変更（存在確認付き）
      if (Schema::hasColumn('music_categories_music_inst_categories', 'music_inst_id')) {
        $table->renameColumn('music_inst_id', 'music_inst_category_id');
      }

      // 新しい外部キー制約を追加（正しいテーブル名に対応）
      $table->foreign('music_inst_category_id', 'fk_mcmic')
        ->references('id')->on('music_inst_categories')
        ->onDelete('cascade');
    });
  }

  public function down(): void
  {
    if (!Schema::hasTable('music_categories_music_inst_categories')) {
      // テーブル自体がないなら処理しない
      return;
    }

    // 外部キー制約を削除（rollback時）
    try {
      DB::statement('ALTER TABLE `music_categories_music_inst_categories` DROP FOREIGN KEY `fk_mcmic`');
    } catch (\Exception $e) {
      // 無視
    }

    Schema::table('music_categories_music_inst_categories', function (Blueprint $table) {
      if (Schema::hasColumn('music_categories_music_inst_categories', 'music_inst_category_id')) {
        $table->renameColumn('music_inst_category_id', 'music_inst_id');
      }

      $table->foreign('music_inst_id', 'fk_orig_mi')
        ->references('id')->on('music_inst_categories')
        ->onDelete('cascade');
    });
  }
};
