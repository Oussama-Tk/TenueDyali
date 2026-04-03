<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

try {
    Schema::disableForeignKeyConstraints();
    $tables = DB::select('SHOW TABLES');
    foreach ($tables as $table) {
        $tableArray = get_object_vars($table);
        $tableName = reset($tableArray);
        echo "Dropping " . $tableName . "...\n";
        Schema::drop($tableName);
    }
    Schema::enableForeignKeyConstraints();
    echo "Toutes les tables ont ete effacees avec succes.\n";
} catch (\Exception $e) {
    echo "Erreur: " . $e->getMessage() . "\n";
}
