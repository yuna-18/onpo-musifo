<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        // 既存の外部キー制約を raw SQL で削除（存在しなければ try-catch で無視）
        try {
            DB::statement('ALTER TABLE `users_music_insts` DROP FOREIGN KEY `users_music_insts_user_id_foreign`');
        } catch (\Exception $e) {
            // 制約が存在しなければ無視
        }
        try {
            DB::statement('ALTER TABLE `users_music_insts` DROP FOREIGN KEY `users_music_inst_details_music_inst_detail_id_foreign`');
        } catch (\Exception $e) {
            // 制約が存在しなければ無視
        }

        Schema::table('users_music_insts', function (Blueprint $table) {
            // 旧カラム (music_inst_detail_id) が存在する場合のみリネーム
            if (Schema::hasColumn('users_music_insts', 'music_inst_detail_id')) {
                $table->renameColumn('music_inst_detail_id', 'music_inst_category_id');
            }
            // 新しい外部キー制約の追加（カスタム名を指定して重複回避）
            $table->foreign('user_id', 'fk_users_mi_user')
                  ->references('id')->on('users')
                  ->onDelete('cascade');
            $table->foreign('music_inst_category_id', 'fk_users_mi_mic')
                  ->references('id')->on('music_inst_categories')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        // 新しい外部キー制約を raw SQL で削除
        try {
            DB::statement('ALTER TABLE `users_music_insts` DROP FOREIGN KEY `fk_users_mi_mic`');
        } catch (\Exception $e) { }
        try {
            DB::statement('ALTER TABLE `users_music_insts` DROP FOREIGN KEY `fk_users_mi_user`');
        } catch (\Exception $e) { }
        
        Schema::table('users_music_insts', function (Blueprint $table) {
            // 変更済みカラムが存在している場合、元に戻す
            if (Schema::hasColumn('users_music_insts', 'music_inst_category_id')) {
                $table->renameColumn('music_inst_category_id', 'music_inst_detail_id');
            }
            // 元の外部キー制約を再追加
            $table->foreign('user_id', 'users_music_inst_details_user_id_foreign')
                  ->references('id')->on('users')
                  ->onDelete('cascade');
            $table->foreign('music_inst_detail_id', 'users_music_inst_details_music_inst_detail_id_foreign')
                  ->references('id')->on('users_music_insts')
                  ->onDelete('cascade');
        });
    }
};
