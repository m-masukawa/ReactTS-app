<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::create('inquiries', function (Blueprint $table) {
        $table->id();
        $table->string('titleJa', 100);
        $table->string('titleEn', 100);
        $table->text('contentJa');
        $table->text('contentEn');
        $table->string('requesterJa', 100);
        $table->string('requesterEn', 100);
        $table->string('status', 20)->default('pending');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inquiries');
    }
};
