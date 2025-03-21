<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookmarks', function (Blueprint $table) {
            $table->id();                                // id
            $table->string('url', 2083);                 // url
            $table->string('comment', 1000)->nullable(); // comment
            $table->boolean('notify_opt_in')->default(false);
            $table->timestamp('notify_at')->nullable();

            // 外部キー制約
            $table->foreignId('user_id')
                  ->constrained('users')
                  ->cascadeOnDelete();

            $table->timestamps();    // created_at, updated_at
            $table->softDeletes();   // deleted_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // 1. 外部キーを先に削除（推奨）
        Schema::table('bookmarks', function (Blueprint $table) {
            $table->dropConstrainedForeignId('user_id');
        });

        // 2. テーブルを削除
        Schema::dropIfExists('bookmarks');
    }
};