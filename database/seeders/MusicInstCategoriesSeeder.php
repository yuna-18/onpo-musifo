<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MusicInstCategoriesSeeder extends Seeder
{
  public function run()
  {
    $now = Carbon::now();

    $data = [
      [
        'id' => 1,
        'name' => 'サクソフォン',
        'en_name' => 'Saxophone',
        'sort_order' => 1,
        'created_at' => $now,
        'updated_at' => $now,
      ],
      [
        'id' => 2,
        'name' => 'クラリネット',
        'en_name' => 'Clarinet',
        'sort_order' => 2,
        'created_at' => $now,
        'updated_at' => $now,
      ],
      [
        'id' => 3,
        'name' => 'ダブルリード',
        'en_name' => 'Double Reed',
        'sort_order' => 3,
        'created_at' => $now,
        'updated_at' => $now,
      ],
      [
        'id' => 4,
        'name' => '木管楽器（その他）',
        'en_name' => 'Woodwinds (Others)',
        'sort_order' => 4,
        'created_at' => $now,
        'updated_at' => $now,
      ],
      [
        'id' => 5,
        'name' => '金管楽器',
        'en_name' => 'Brass Instruments',
        'sort_order' => 5,
        'created_at' => $now,
        'updated_at' => $now,
      ],
      [
        'id' => 6,
        'name' => '弦楽器（弓）',
        'en_name' => 'Bowed Strings',
        'sort_order' => 6,
        'created_at' => $now,
        'updated_at' => $now,
      ],
      [
        'id' => 7,
        'name' => '弦楽器（はじく）',
        'en_name' => 'Plucked Strings',
        'sort_order' => 7,
        'created_at' => $now,
        'updated_at' => $now,
      ],
      [
        'id' => 8,
        'name' => '打楽器',
        'en_name' => 'Percussion',
        'sort_order' => 8,
        'created_at' => $now,
        'updated_at' => $now,
      ],
      [
        'id' => 9,
        'name' => '鍵盤楽器',
        'en_name' => 'Keyboard',
        'sort_order' => 9,
        'created_at' => $now,
        'updated_at' => $now,
      ],
      [
        'id' => 10,
        'name' => '電子楽器',
        'en_name' => 'Electronic Instruments',
        'sort_order' => 10,
        'created_at' => $now,
        'updated_at' => $now,
      ],
    ];

    DB::table('music_inst_categories')->insert($data);
  }
}
