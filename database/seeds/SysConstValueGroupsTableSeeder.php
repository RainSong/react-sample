<?php

use Illuminate\Database\Seeder;
use App\Util;

class SysConstValueGroupsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @throws Exception
     */
    public function run()
    {
        $sort = 1;
        //
        $models = [
            [
                'name' => '常亮值类型',
                'code' => Util\ConstValue::CONST_VALUE_GROUP_CODE_CONST_VALUE_TYPE,
                'enable' => true,
                'sort' => $sort++,
                'is_system' => true
            ],
            [
                'name' => '模块类型',
                'code' => Util\ConstValue::CONST_VALUE_GROUP_CODE_MODULE_TYPE,
                'enable' => true,
                'sort' => $sort++,
                'is_system' => true
            ],
            [
                'name' => '数据源类型',
                'code' => Util\ConstValue::CONST_VALUE_GROUP_CODE_DATA_SOURCE_TYPE,
                'enable' => true,
                'sort' => $sort++,
                'is_system' => true
            ],
            [
                'name'=>'参数类型',
                'code'=>Util\ConstValue::CONST_VALUE_GROUP_CODE_PARAMETER_TYPE,
                'enable'=>true,
                'sort'=>$sort++,
                'is_system'=>true
            ]
        ];
        try {
            DB::table('sys_const_value_groups')->insert($models);
        } catch (Exception $ex) {
            throw new Exception('seed const value group fail', $ex->getCode(), $ex);
        }
    }
}
