<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        // usersテーブル
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('furigana'); // 統合
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable(); // 統合
            $table->string('password');
            $table->rememberToken(); // 統合
            $table->boolean('newsletter_opt_in')->default(false); // 統合
            $table->boolean('email_notify_opt_in')->default(false); // 統合
            $table->timestamps();
            $table->softDeletes(); // 統合
        });

        // password_reset_tokens テーブル
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        // sessions テーブル
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    public function down(): void {
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('users');
    }
};