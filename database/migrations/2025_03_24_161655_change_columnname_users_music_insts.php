<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        // 対象テーブル
        $tableName = 'users_music_insts';

        // カラム music_inst_category_id に対する外部キーが存在するかチェック
        $fkQuery = "SELECT CONSTRAINT_NAME 
            FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
            WHERE TABLE_SCHEMA = DATABASE() 
              AND TABLE_NAME = '{$tableName}' 
              AND COLUMN_NAME = 'music_inst_category_id'";
        $fkResults = DB::select($fkQuery);

        if (count($fkResults) > 0) {
            // 外部キー名が自動生成されている場合は、一般的に
            // 「users_music_insts_music_inst_category_id_foreign」
            // となっているはずなので、その名前で DROP を試みる
            try {
                DB::statement("ALTER TABLE `{$tableName}` DROP FOREIGN KEY `users_music_insts_music_inst_category_id_foreign`");
            } catch (\Exception $e) {
                // エラーが出た場合は無視
            }
        }

        // また、もし旧カラム名 (music_inst_detail_id) に対する外部キーが残っているなら削除
        $fkQuery2 = "SELECT CONSTRAINT_NAME 
            FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
            WHERE TABLE_SCHEMA = DATABASE() 
              AND TABLE_NAME = '{$tableName}' 
              AND COLUMN_NAME = 'music_inst_detail_id'";
        $fkResults2 = DB::select($fkQuery2);
        if (count($fkResults2) > 0) {
            try {
                DB::statement("ALTER TABLE `{$tableName}` DROP FOREIGN KEY `users_music_inst_details_music_inst_detail_id_foreign`");
            } catch (\Exception $e) {
                // 無視
            }
        }

        Schema::table($tableName, function (Blueprint $table) {
            // 旧カラム（music_inst_category_id）が存在している場合のみ、正しいカラム名に戻す
            if (Schema::hasColumn($table->getTable(), 'music_inst_category_id')) {
                $table->renameColumn('music_inst_category_id', 'music_inst_id');
            }
            // 新しい外部キー制約を追加
            // ここでは、カラム music_inst_id がマスターテーブル music_inst_categories の id を参照するようにする
            $table->foreign('music_inst_id', 'fk_users_mi_correct')
                  ->references('id')->on('music_inst_categories')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        $tableName = 'users_music_insts';

        // 新しく追加した外部キー制約の削除
        try {
            DB::statement("ALTER TABLE `{$tableName}` DROP FOREIGN KEY `fk_users_mi_correct`");
        } catch (\Exception $e) { }

        Schema::table($tableName, function (Blueprint $table) {
            // カラム名を元に戻す（music_inst_id → music_inst_category_id）
            if (Schema::hasColumn($table->getTable(), 'music_inst_id')) {
                $table->renameColumn('music_inst_id', 'music_inst_category_id');
            }
            // 元の外部キー制約を再追加（元々 self-referential だった場合の例）
            $table->foreign('music_inst_category_id', 'users_music_inst_details_music_inst_detail_id_foreign')
                  ->references('id')->on('users_music_insts')
                  ->onDelete('cascade');
        });
    }
};