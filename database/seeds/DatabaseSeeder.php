<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(SysConstValueGroupsTableSeeder::class);
        $this->call(SysConstValuesTableSeeder::class);

        $this->call(SysModulesTableSeeder::class);
    }
}
