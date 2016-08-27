<?php

use Illuminate\Database\Seeder;
use App\Util;

class SysModulesTableSeeder extends Seeder
{
    private $module_type_const_value;

    /**
     * Run the database seeds.
     *
     * @return void
     */

    private function insert_data()
    {
        $modules = [
            [
                'name' => '系统设置',
                'code' => 'sys_manage',
                'url' => '/admin/sys-manage',
                'type' => $this->get_module_type_const_value_id('module_group'),
                'is_system' => true,
                'enable' => true,
                'sort' => 0
            ],
            [
                'name' => '模块管理',
                'code' => 'sys_modules_manage',
                'url' => '/admin/module/manage',
                'type' => $this->get_module_type_const_value_id('module_list'),
                'is_system' => true,
                'enable' => true,
                'sort' => 1
            ],
            [
                'name' => '新增模块',
                'code' => 'sys_module_add',
                'url' => '/admin/module/add',
                'type' => $this->get_module_type_const_value_id('module_addedit'),
                'is_system' => true,
                'enable' => true,
                'sort' => 2
            ],
            [
                'name' => '修改模块',
                'code' => 'sys_module_edit',
                'url' => '/admin/module/edit/{id}',
                'type' => $this->get_module_type_const_value_id('module_addedit'),
                'is_system' => true,
                'enable' => true,
                'sort' => 3
            ]
        ];
        try {
            DB::table('sys_modules')->insert($modules);
        } catch (Exception $ex) {
            throw new Exception("填充新数据失败", $ex->getCode(), $ex);
        }
    }

    private function get_module_type_const_value()
    {
        $sql = "SELECT
                  cvalues.value,
                  cvalues.code
                FROM
                  `sys_const_values` AS cvalues
                LEFT JOIN
                  `sys_const_value_groups` AS cgroups
                ON
                  cvalues.group_id = cgroups.id
                WHERE
                  cgroups.code = '" . Util\ConstValue::CONST_VALUE_GROUP_CODE_MODULE_TYPE . "'";
        $this->module_type_const_value = DB::select($sql);
    }

    private function get_module_type_const_value_id($code)
    {
        foreach ($this->module_type_const_value as $item) {
            if ($item->code == $code) {
                return $item->value;
            }
        }
    }

    private function update_parent_id()
    {
        try {
            $module_sys_manage_id =
                DB::table('sys_modules')
                    ->select('id')
                    ->where('code', 'sys_manage')
                    ->first()
                    ->id;

            $module_sys_module_manage_id =
                DB::table('sys_modules')
                    ->select('id')
                    ->where('code', 'sys_modules_manage')
                    ->first()
                    ->id;

            DB::table('sys_modules')
                ->where('id', $module_sys_module_manage_id)
                ->update(['parent_id' => $module_sys_manage_id]);

            DB::table('sys_modules')
                ->whereIn('code', ['sys_module_add', 'sys_module_edit'])
                ->update(['parent_id' => $module_sys_module_manage_id]);
        } catch (Exception $ex) {
            throw new Exception("更新模块父级ID失败", $ex->getCode(), $ex);
        }
    }

    public function run()
    {
        $this->get_module_type_const_value();
        try {
            DB::transaction(function () {
                $this->insert_data();
                $this->update_parent_id();
            });
            DB::beginTransaction();
            DB::commit();
        } catch (Exception $ex) {
            DB::rollBack();
            throw new Exception('填充模块数据失败', $ex->getCode(), $ex);
        }
    }
}
