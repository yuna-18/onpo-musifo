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
        Schema::table('users', function (Blueprint $table) {
          $table->string('furigana')->after('name');
          $table->boolean('newsletter_opt_in')->default(false)->after('remember_token');
          $table->boolean('email_notify_opt_in')->default(false)->after('newsletter_opt_in');
          $table->softDeletes(); // deleted_atカラムを追加
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
      Schema::table('users', function (Blueprint $table) {
        // up() で追加したカラムを全て drop
        $table->dropColumn([
            'furigana',
            'newsletter_opt_in',
            'email_notify_opt_in',
        ]);

        // ソフトデリートカラムを削除
        $table->dropSoftDeletes();
    });
    }
};
