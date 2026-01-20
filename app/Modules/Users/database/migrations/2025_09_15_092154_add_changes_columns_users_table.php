<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('name', 'first_name');
            $table->string('last_name')->nullable()->after('first_name');
            $table->string('role_id')->after('password');
            $table->foreign('role_id')
                ->references('id')
                ->on('roles')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->string('use_global')->default(1)->after('role_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {

        });
    }
};
