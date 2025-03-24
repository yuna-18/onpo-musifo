<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('music_insts', function (Blueprint $table) {
            // 1. 既存の外部キー制約を削除する
            // どちらの制約も削除しておきます
            $table->dropForeign('music_inst_details_music_inst_id_foreign');
            $table->dropForeign('music_insts_music_inst_id_foreign');

            // 2. カラム名を変更する
            $table->renameColumn('music_inst_id', 'music_inst_category_id');

            // 3. 新しい外部キー制約を追加する
            // 詳細テーブルのカラムが、新しいマスターテーブル (music_inst_categories) を参照するようにします
            $table->foreign('music_inst_category_id')
                  ->references('id')->on('music_inst_categories')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('music_insts', function (Blueprint $table) {
            // 1. 新しく追加した外部キー制約の削除
            $table->dropForeign(['music_inst_category_id']);

            // 2. カラム名を元に戻す
            $table->renameColumn('music_inst_category_id', 'music_inst_id');

            // 3. 元の状態に戻す外部キー制約を再追加する
            // ここでは、元々の定義に合わせて、self‐referential な外部キーを再追加しています
            $table->foreign('music_inst_id')
                  ->references('id')->on('music_insts')
                  ->onDelete('cascade');
        });
    }
};