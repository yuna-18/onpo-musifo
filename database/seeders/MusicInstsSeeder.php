<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;

class MusicInstsSeeder extends Seeder
{
    public function run()
    {
        $now = Carbon::now();

        $csvPath = database_path('seeders/csv/music_insts.csv');

        $csv = array_map('str_getcsv', file($csvPath));

        // ヘッダーを削除
        $headers = array_shift($csv);

        $data = [];

        foreach ($csv as $row) {
            $data[] = [
                'name' => $row[1],
                'name_abbr' => $row[2] ?: null,
                'en_name' => $row[3],
                'en_name_abbr' => $row[4] ?: null,
                'music_inst_category_id' => $row[5],
                'sort_order' => $row[6] ?: 1,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        DB::table('music_insts')->insert($data);
    }
}