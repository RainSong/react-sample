<?php

use Illuminate\Database\Seeder;
use App\Util;

class SysConstValuesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    private function get_const_group_id($group_code)
    {
        return DB::table('sys_const_value_groups')
            ->select('id')
            ->where('code', $group_code)
            ->first()
            ->id;
    }

    public function run()
    {
        //
        $const_group_id_const_value_type = 0;
        try {
            $const_group_id_const_value_type = $this->get_const_group_id(Util\ConstValue::CONST_VALUE_GROUP_CODE_CONST_VALUE_TYPE);
        } catch (Exception $ex) {
            throw new Exception('get cost value type group id fail', $ex->getCode(), $ex);
        }
        $const_group_id_module_type = 0;
        try {
            $const_group_id_module_type = $this->get_const_group_id(Util\ConstValue::CONST_VALUE_GROUP_CODE_MODULE_TYPE);
        } catch (Exception $ex) {
            throw new Exception('get module type group id fail', $ex->getCode(), $ex);
        }
        $const_group_id_parameter_type = 0;
        try {
            $const_group_id_parameter_type = $this->get_const_group_id(Util\ConstValue::CONST_VALUE_GROUP_CODE_PARAMETER_TYPE);
        } catch (Exception $ex) {
            throw new Exception('get parameter type group id fail', $ex->getCode(), $ex);
        }

        $sort = 1;
        $models =
            [
                //const value type
                [
                    'group_id' => $const_group_id_const_value_type,
                    'name' => '字符',
                    'code' => 'text',
                    'value' => '1',
                    'value_type' => 2,
                    'sort' => $sort++
                ],
                [
                    'group_id' => $const_group_id_const_value_type,
                    'name' => '整形',
                    'code' => 'int',
                    'value' => '2',
                    'value_type' => 2,
                    'sort' => $sort++
                ],
                [
                    'group_id' => $const_group_id_const_value_type,
                    'name' => '浮点类型',
                    'code' => 'float',
                    'value' => '3',
                    'value_type' => 2,
                    'sort' => $sort++
                ],
                [
                    'group_id' => $const_group_id_const_value_type,
                    'name' => 'Decimal',
                    'code' => 'decimal',
                    'value' => '4',
                    'value_type' => 2,
                    'sort' => $sort++
                ],
                [
                    'group_id' => $const_group_id_const_value_type,
                    'name' => '日期',
                    'code' => 'date',
                    'value' => '5',
                    'value_type' => 2,
                    'sort' => $sort++
                ],
                [
                    'group_id' => $const_group_id_const_value_type,
                    'name' => '时间',
                    'code' => 'time',
                    'value' => '6',
                    'value_type' => 2,
                    'sort' => $sort++
                ],
                [
                    'group_id' => $const_group_id_const_value_type,
                    'name' => '日期和时间',
                    'code' => 'datetime',
                    'value' => '7',
                    'value_type' => 2,
                    'sort' => $sort++
                ],
                //module type
                [
                    'group_id' => $const_group_id_module_type,
                    'name' => '模块组',
                    'code' => 'module_group',
                    'value' => '1',
                    'value_type' => 1,
                    'sort' => $sort++
                ],
                [
                    'group_id' => $const_group_id_module_type,
                    'name' => '列表模块',
                    'code' => 'module_list',
                    'value' => '2',
                    'value_type' => 1,
                    'sort' => $sort++
                ],
                [
                    'group_id' => $const_group_id_module_type,
                    'name' => '增加修改模块',
                    'code' => 'module_addedit',
                    'value' => '3',
                    'value_type' => 1,
                    'sort' => $sort++
                ],
                [
                    'group_id' => $const_group_id_module_type,
                    'name' => '视图模块',
                    'code' => 'module_view',
                    'value' => '4',
                    'value_type' => 1,
                    'sort' => $sort++
                ]
            ];

        try {
            DB::table('sys_const_values')->insert($models);
        } catch (Exception $ex) {
            throw new Exception('seed const value fail', $ex->getCode(), $ex);
        }

    }
}
