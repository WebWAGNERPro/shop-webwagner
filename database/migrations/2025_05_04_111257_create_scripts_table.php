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
        Schema::create('scripts', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->string('description');
            $table->decimal('price', 8, 2);
            $table->string('category');
            $table->decimal('rating', 3, 2)->default(0);
            $table->string('image')->nullable();
            $table->string('video')->nullable();
            $table->boolean('isNew')->default(false);
            $table->boolean('isFeatured')->default(false);
            $table->boolean('isOnSale')->default(false);
            $table->integer('discount')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scripts');
    }
};
