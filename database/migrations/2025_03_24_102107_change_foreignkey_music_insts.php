<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('music_insts', function (Blueprint $table) {
            // 外部キー制約が存在しない場合は削除不要
            // $table->dropForeign(['music_inst_id']);

            // カラム名の変更
            $table->renameColumn('music_inst_id', 'music_inst_category_id');

            // 新しい外部キー制約の追加（新しい親テーブルは music_inst_categories ）
            $table->foreign('music_inst_category_id')
                  ->references('id')->on('music_inst_categories')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('music_insts', function (Blueprint $table) {
            $table->dropForeign(['music_inst_category_id']);
            $table->renameColumn('music_inst_category_id', 'music_inst_id');

            // down()では元の外部キー制約を再追加します。元々の設定に合わせて参照先を指定してください。
            $table->foreign('music_inst_id')
                  ->references('id')->on('music_insts')
                  ->onDelete('cascade');
        });
    }
};