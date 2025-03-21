<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subareas_cities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subarea_id')
                  ->constrained('subareas');
            $table->foreignId('city_id')
                  ->constrained('cities');
            $table->timestamps();
            // ソフトデリートや cascadeOnDelete は付けない方針
        });
    }

    public function down(): void
    {
        Schema::table('subareas_cities', function (Blueprint $table) {
            $table->dropConstrainedForeignId('subarea_id');
            $table->dropConstrainedForeignId('city_id');
        });
        Schema::dropIfExists('subareas_cities');
    }
};
