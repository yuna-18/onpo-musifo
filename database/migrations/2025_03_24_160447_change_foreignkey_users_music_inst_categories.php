<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        // 1. 外部キー制約の削除（変更対象のカラム: music_inst_id）
        try {
            DB::statement('ALTER TABLE `users_music_inst_categories` DROP FOREIGN KEY `users_music_inst_categories_music_inst_id_foreign`');
        } catch (\Exception $e) {
            // 制約が存在しなければ無視
        }

        Schema::table('users_music_inst_categories', function (Blueprint $table) {
            // 2. 旧カラム (music_inst_id) が存在している場合のみリネーム
            if (Schema::hasColumn('users_music_inst_categories', 'music_inst_id')) {
                $table->renameColumn('music_inst_id', 'music_inst_category_id');
            }
            // 3. 変更後のカラムに対して、新しい外部キー制約を追加（カスタム名 'fk_umic_mic' を指定）
            $table->foreign('music_inst_category_id', 'fk_umic_mic')
                  ->references('id')->on('music_inst_categories')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        // 1. 新規に追加した外部キー制約の削除
        try {
            DB::statement('ALTER TABLE `users_music_inst_categories` DROP FOREIGN KEY `fk_umic_mic`');
        } catch (\Exception $e) {
            // 存在しなければ無視
        }
        Schema::table('users_music_inst_categories', function (Blueprint $table) {
            // 2. カラム名を元に戻す（music_inst_category_id → music_inst_id）
            if (Schema::hasColumn('users_music_inst_categories', 'music_inst_category_id')) {
                $table->renameColumn('music_inst_category_id', 'music_inst_id');
            }
            // 3. 元の外部キー制約を再追加（自動生成の名前で再設定）
            $table->foreign('music_inst_id')
                  ->references('id')->on('music_inst_categories')
                  ->onDelete('cascade');
        });
    }
};