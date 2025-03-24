<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        // 既存の外部キーが存在する場合のみ削除
        try {
            DB::statement('ALTER TABLE `music_insts` DROP FOREIGN KEY `music_inst_details_music_inst_id_foreign`');
        } catch (\Exception $e) {
            // 制約が存在しない場合は無視
        }

        // try {
        //     DB::statement('ALTER TABLE `music_insts` DROP FOREIGN KEY `music_insts_music_inst_id_foreign`');
        // } catch (\Exception $e) {
        //     // 制約が存在しない場合は無視
        // }

        Schema::table('music_insts', function (Blueprint $table) {
            // カラムが存在する場合のみ変更
            if (Schema::hasColumn('music_insts', 'music_inst_id')) {
                $table->renameColumn('music_inst_id', 'music_inst_category_id');
            }

            // 新しい外部キー制約の追加
            $table->foreign('music_inst_category_id', 'fk_music_inst_category')
                  ->references('id')->on('music_inst_categories')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        // 新しい外部キーが存在する場合のみ削除
        try {
            DB::statement('ALTER TABLE `music_insts` DROP FOREIGN KEY `fk_music_inst_category`');
        } catch (\Exception $e) {
            // 制約が存在しない場合は無視
        }

        Schema::table('music_insts', function (Blueprint $table) {
            // カラムが存在する場合のみ戻す
            if (Schema::hasColumn('music_insts', 'music_inst_category_id')) {
                $table->renameColumn('music_inst_category_id', 'music_inst_id');
            }

            // 元の外部キー制約を再追加
            $table->foreign('music_inst_id', 'music_inst_details_music_inst_id_foreign')
                  ->references('id')->on('music_insts')
                  ->onDelete('cascade');
        });
    }
};