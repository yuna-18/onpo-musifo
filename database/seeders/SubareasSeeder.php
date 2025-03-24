<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;

class SubareasSeeder extends Seeder
{
    public function run(): void
    {
        $csvPath = database_path('seeders/csv/subareas.csv');

        if (!File::exists($csvPath)) {
            $this->command->error("❌ CSVファイルが見つかりません: $csvPath");
            return;
        }

        $csvData = array_map('str_getcsv', file($csvPath));
        $headers = array_map('trim', array_shift($csvData));

        $now = Carbon::now();

        $insertData = [];
        foreach ($csvData as $row) {
            $row = array_map('trim', $row);
            $data = array_combine($headers, $row);

            // created_at / updated_at を追加
            $data['created_at'] = $now;
            $data['updated_at'] = $now;

            $insertData[] = $data;
        }

        DB::transaction(function () use ($insertData) {
            DB::table('subareas')->delete(); // truncateだと外部キーが邪魔するのでdelete()

            DB::table('subareas')->insert($insertData);
        });

        $this->command->info('✅ subareas table seeded successfully!');
    }
}