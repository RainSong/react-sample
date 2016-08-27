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
        $this->call(SysConstValueGroup::class);
        $this->call(SysConstValue::class);

        $this->call(SysModulesTableSeeder::class);
    }
}
