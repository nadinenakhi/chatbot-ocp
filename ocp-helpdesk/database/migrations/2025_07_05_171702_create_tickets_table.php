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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('description');
            $table->string('type');
            $table->string('service');
            $table->string('urgence');
            $table->timestamps();
        });
        Schema::table('tickets', function (Blueprint $table) {
        if (!Schema::hasColumn('tickets', 'statut')) {
            $table->string('statut')->default('en_attente')->after('urgence');
        }
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropColumn('statut');
        });
        Schema::table('tickets', function (Blueprint $table) {
        if (Schema::hasColumn('tickets', 'statut')) {
            $table->dropColumn('statut');
        }
    });
    }
};
