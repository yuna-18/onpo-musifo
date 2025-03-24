<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MusicCategoriesSeeder extends Seeder
{
    public function run()
    {
        DB::table('music_categories')->insert([
            [
                'id' => 1,
                'name' => 'アンサンブル・室内楽',
                'en_name' => 'chamber',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 2,
                'name' => 'クラシック(オーケストラ大編成)',
                'en_name' => 'orchestra',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 3,
                'name' => 'クラシック(ソロ)',
                'en_name' => 'solo',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 4,
                'name' => 'ジャズ・ビッグバンド',
                'en_name' => 'jazz',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 5,
                'name' => '吹奏楽・ブラスバンド',
                'en_name' => 'brass_band',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 6,
                'name' => 'ピアノ',
                'en_name' => 'piano',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 7,
                'name' => '邦楽・和楽器',
                'en_name' => 'japanese',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 8,
                'name' => 'ポピュラー・軽音楽',
                'en_name' => 'pops',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 9,
                'name' => 'その他',
                'en_name' => 'other',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
