<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MusicCategoriesMusicInstCategoriesSeeder extends Seeder
{
    public function run()
    {
        $now = Carbon::now();

        $data = [
            // サクソフォン
            ['music_category_id' => 1, 'music_inst_category_id' => 1, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 2, 'music_inst_category_id' => 1, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 4, 'music_inst_category_id' => 1, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 5, 'music_inst_category_id' => 1, 'created_at' => $now, 'updated_at' => $now],

            // クラリネット
            ['music_category_id' => 1, 'music_inst_category_id' => 2, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 2, 'music_inst_category_id' => 2, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 4, 'music_inst_category_id' => 2, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 5, 'music_inst_category_id' => 2, 'created_at' => $now, 'updated_at' => $now],

            // ダブルリード
            ['music_category_id' => 1, 'music_inst_category_id' => 3, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 2, 'music_inst_category_id' => 3, 'created_at' => $now, 'updated_at' => $now],

            // 木管楽器（その他）
            ['music_category_id' => 1, 'music_inst_category_id' => 4, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 2, 'music_inst_category_id' => 4, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 3, 'music_inst_category_id' => 4, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 4, 'music_inst_category_id' => 4, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 5, 'music_inst_category_id' => 4, 'created_at' => $now, 'updated_at' => $now],

            // 金管楽器
            ['music_category_id' => 1, 'music_inst_category_id' => 5, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 2, 'music_inst_category_id' => 5, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 3, 'music_inst_category_id' => 5, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 4, 'music_inst_category_id' => 5, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 5, 'music_inst_category_id' => 5, 'created_at' => $now, 'updated_at' => $now],

            // 弦楽器（弓）
            ['music_category_id' => 1, 'music_inst_category_id' => 6, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 2, 'music_inst_category_id' => 6, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 3, 'music_inst_category_id' => 6, 'created_at' => $now, 'updated_at' => $now],

            // 弦楽器（はじく）
            ['music_category_id' => 3, 'music_inst_category_id' => 7, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 7, 'music_inst_category_id' => 7, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 8, 'music_inst_category_id' => 7, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 9, 'music_inst_category_id' => 7, 'created_at' => $now, 'updated_at' => $now],

            // 打楽器
            ['music_category_id' => 2, 'music_inst_category_id' => 8, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 4, 'music_inst_category_id' => 8, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 5, 'music_inst_category_id' => 8, 'created_at' => $now, 'updated_at' => $now],

            // 鍵盤楽器
            ['music_category_id' => 1, 'music_inst_category_id' => 9, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 2, 'music_inst_category_id' => 9, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 3, 'music_inst_category_id' => 9, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 4, 'music_inst_category_id' => 9, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 5, 'music_inst_category_id' => 9, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 6, 'music_inst_category_id' => 9, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 7, 'music_inst_category_id' => 9, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 8, 'music_inst_category_id' => 9, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 9, 'music_inst_category_id' => 9, 'created_at' => $now, 'updated_at' => $now],

            // 電子楽器
            ['music_category_id' => 8, 'music_inst_category_id' => 10, 'created_at' => $now, 'updated_at' => $now],
            ['music_category_id' => 9, 'music_inst_category_id' => 10, 'created_at' => $now, 'updated_at' => $now],
        ];

        DB::table('music_categories_music_inst_categories')->insert($data);
    }
}
