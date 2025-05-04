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
        Schema::table('scripts', function (Blueprint $table) {
            $table->integer('sales_count')->default(0);
            $table->text('requirements')->nullable();
            $table->text('documentation')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('scripts', function (Blueprint $table) {
            $table->dropColumn('sales_count');
            $table->dropColumn('requirements');
            $table->dropColumn('documentation');
        });
    }
};
