<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('music_inst_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('name_abbr', 100)->nullable();
            $table->string('en_name', 100);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('music_inst_categories');
    }
};
