<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    // User::factory(10)->create();
    // ここにまとめて書いておく！
    $this->call([
      AreasSeeder::class,
      // CitiesSeeder::class,
      // UsersSeeder::class,
      MusicCategoriesSeeder::class,
      MusicInstCategoriesSeeder::class,
      MusicCategoriesMusicInstCategoriesSeeder::class,
      MusicInstsSeeder::class,
      SubareasSeeder::class,
      // 他にもあれば追加
    ]);

    // User::factory()->create([
    //   'name' => 'Test User',
    //   'email' => 'test@example.com',
    // ]);
  }
}
