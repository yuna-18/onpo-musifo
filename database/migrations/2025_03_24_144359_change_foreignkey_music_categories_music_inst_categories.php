<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        // 外部キー制約の削除を raw SQL で行う
        try {
            DB::statement('ALTER TABLE `music_categories_music_inst_categories` DROP FOREIGN KEY `music_categories_music_inst_cateogries_music_inst_id_foreign`');
        } catch (\Exception $e) {
            // 既に削除済みなら無視
        }

        Schema::table('music_categories_music_inst_categories', function (Blueprint $table) {
            if (Schema::hasColumn('music_categories_music_inst_categories', 'music_inst_id')) {
                $table->renameColumn('music_inst_id', 'music_inst_category_id');
            }

            $table->foreign('music_inst_category_id', 'fk_mcmic')
                ->references('id')->on('music_inst_categories')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        try {
            DB::statement('ALTER TABLE `music_categories_music_inst_categories` DROP FOREIGN KEY `fk_mcmic`');
        } catch (\Exception $e) {
            // 既に削除済みなら無視
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
