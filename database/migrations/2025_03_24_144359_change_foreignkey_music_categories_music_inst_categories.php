<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('music_categories_music_inst_cateogries', function (Blueprint $table) {
            // もし旧カラムが存在していれば処理する
            if (Schema::hasColumn('music_categories_music_inst_cateogries', 'music_inst_id')) {
                // 既存の外部キー制約を削除（自動判定）
                try {
                    $table->dropForeign(['music_inst_id']);
                } catch (\Exception $e) {
                    // 外部キーがすでに削除されている場合は無視
                }

                // カラム名の変更
                $table->renameColumn('music_inst_id', 'music_inst_category_id');
            }
            
            // ここで、新しい外部キー制約が存在しない場合のみ追加
            // ※制約名 'fk_mcmic' を使って短い名前にしています
            // 外部キーがすでにあるかどうかは手動で確認してください
            $table->foreign('music_inst_category_id', 'fk_mcmic')
                  ->references('id')->on('music_inst_categories')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('music_categories_music_inst_cateogries', function (Blueprint $table) {
            // 新しい外部キー制約の削除
            try {
                $table->dropForeign('fk_mcmic');
            } catch (\Exception $e) {
                // 存在しなければ無視
            }
            
            // もし新しいカラムが存在していれば元に戻す
            if (Schema::hasColumn('music_categories_music_inst_cateogries', 'music_inst_category_id')) {
                $table->renameColumn('music_inst_category_id', 'music_inst_id');
            }
            
            // 元の外部キー制約を再追加
            // ※元の状態に戻すかどうかは運用次第です
            $table->foreign('music_inst_id', 'fk_orig_mi')
                  ->references('id')->on('music_inst_categories')
                  ->onDelete('cascade');
        });
    }
};
