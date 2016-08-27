<?php

use Illuminate\Database\Seeder;
use App\Util;

class SysConstValueGroup extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @throws Exception
     */
    public function run()
    {
        //
        $models = [
            [
                'name' => '常亮值类型',
                'code' => Util\ConstValue::CONST_VALUE_GROUP_CODE_CONST_VALUE_TYPE,
                'enable' => true,
                'sort' => 1,
                'is_system' => true
            ],
            [
                'name' => '模块类型',
                'code' => Util\ConstValue::CONST_VALUE_GROUP_CODE_MODULE_TYPE,
                'enable' => true,
                'sort' => 2,
                'is_system' => false
            ]
        ];
        try {
            DB::table('sys_const_value_groups')->insert($models);
        } catch (Exception $ex) {
            throw new Exception('seed const value group fail', $ex->getCode(), $ex);
        }
    }
}
