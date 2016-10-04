<?php

use Illuminate\Database\Seeder;
use App\Util;
use App\Models\SysModule;

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
        $sort = 0;

        $module_sys_manage = new SysModule();
        $module_sys_manage->name = '系统设置';
        $module_sys_manage->code = 'sys_manage';
        $module_sys_manage->url = '/admin/sysmanage';
        $module_sys_manage->type = $this->get_module_type_const_value_id('module_group');
        $module_sys_manage->is_system = true;
        $module_sys_manage->enable = true;
        $module_sys_manage->sort = ++$sort;
        $module_sys_manage->parent_id = 0;
        $module_sys_manage->save();

        $module_sys_module_list = new SysModule();
        $module_sys_module_list->name = '模块管理';
        $module_sys_module_list->code = 'sys_module_manage';
        $module_sys_module_list->url = '/admin/module/manage';
        $module_sys_module_list->type = $this->get_module_type_const_value_id('module_list');
        $module_sys_module_list->is_system = true;
        $module_sys_module_list->enable = true;
        $module_sys_module_list->sort = ++$sort;
        $module_sys_module_list->parent_id = $module_sys_manage->id;
        $module_sys_module_list->save();

        $module_sys_module_add = new SysModule();
        $module_sys_module_add->name = '添加模块';
        $module_sys_module_add->code = 'sys_module_add';
        $module_sys_module_add->url = '/admin/module/add';
        $module_sys_module_add->type = $this->get_module_type_const_value_id('module_addedit');
        $module_sys_module_add->is_system = true;
        $module_sys_module_add->enable = true;
        $module_sys_module_add->sort = ++$sort;
        $module_sys_module_add->parent_id = $module_sys_module_list->id;
        $module_sys_module_add->save();

        $module_sys_module_edit = new SysModule();
        $module_sys_module_edit->name = '修改模块';
        $module_sys_module_edit->code = 'sys_module_edit';
        $module_sys_module_edit->url = '/admin/module/edit/{id}';
        $module_sys_module_edit->type = $this->get_module_type_const_value_id('module_addedit');
        $module_sys_module_edit->is_system = true;
        $module_sys_module_edit->enable = true;
        $module_sys_module_edit->sort = ++$sort;
        $module_sys_module_edit->parent_id = $module_sys_module_list->id;
        $module_sys_module_edit->save();

        $module_sys_data_source_manage = new SysModule();
        $module_sys_data_source_manage->name = '数据源管理';
        $module_sys_data_source_manage->code = 'sys_data_source_manage';
        $module_sys_data_source_manage->url = '/admin/datasource/list';
        $module_sys_data_source_manage->type = $this->get_module_type_const_value_id('module_list');
        $module_sys_data_source_manage->is_system = true;
        $module_sys_data_source_manage->enable = true;
        $module_sys_data_source_manage->sort = ++$sort;
        $module_sys_data_source_manage->parent_id = $module_sys_manage->id;
        $module_sys_data_source_manage->save();

        $module_sys_data_source_add = new SysModule();
        $module_sys_data_source_add->name = '添加数据源';
        $module_sys_data_source_add->code = 'sys_data_source_add';
        $module_sys_data_source_add->url = '/admin/datasource/add';
        $module_sys_data_source_add->type = $this->get_module_type_const_value_id('module_addedit');
        $module_sys_data_source_add->is_system = true;
        $module_sys_data_source_add->enable = true;
        $module_sys_data_source_add->sort = ++$sort;
        $module_sys_data_source_add->parent_id = $module_sys_data_source_manage->id;
        $module_sys_data_source_add->save();

        $module_sys_data_source_edit = new SysModule();
        $module_sys_data_source_edit->name = '修改数据源';
        $module_sys_data_source_edit->code = 'sys_data_source_edit';
        $module_sys_data_source_edit->url = '/admin/datasource/edit/{id}';
        $module_sys_data_source_edit->type = $this->get_module_type_const_value_id('module_addedit');
        $module_sys_data_source_edit->is_system = true;
        $module_sys_data_source_edit->enable = true;
        $module_sys_data_source_edit->sort = ++$sort;
        $module_sys_data_source_edit->parent_id = $module_sys_data_source_manage->id;
        $module_sys_data_source_edit->save();

//        $modules = [
//            [
//                'name' => '系统设置',
//                'code' => 'sys_manage',
//                'url' => '/admin/sys-manage',
//                'type' => $this->get_module_type_const_value_id('module_group'),
//                'is_system' => true,
//                'enable' => true,
//                'sort' => 0
//            ],
//            [
//                'name' => '模块管理',
//                'code' => 'sys_module_manage',
//                'url' => '/admin/module/manage',
//                'type' => $this->get_module_type_const_value_id('module_list'),
//                'is_system' => true,
//                'enable' => true,
//                'sort' => 1
//            ],
//            [
//                'name' => '新增模块',
//                'code' => 'sys_module_add',
//                'url' => '/admin/module/add',
//                'type' => $this->get_module_type_const_value_id('module_addedit'),
//                'is_system' => true,
//                'enable' => true,
//                'sort' => 2
//            ],
//            [
//                'name' => '修改模块',
//                'code' => 'sys_module_edit',
//                'url' => '/admin/module/edit/{id}',
//                'type' => $this->get_module_type_const_value_id('module_addedit'),
//                'is_system' => true,
//                'enable' => true,
//                'sort' => 3
//            ],
//            [
//                'name' => '数据源管理',
//                'code' => 'sys_data_source_manage',
//                'url' => '/admin/datasource/list',
//                'type' => $this->get_module_type_const_value('module_list'),
//                'is_system' => true,
//                'enable' => true,
//                'sort' => 4
//            ],
//            [
//                'name' => '添加数据源',
//                'code' => 'sys_data_source_add',
//                'url' => '/admin/datasource/add',
//                'type' => $this->get_module_type_const_value('module_addedit'),
//                'is_system' => true,
//                'enable' => true,
//                'sort' => 5
//            ],
//            [
//                'name' => '修改数据源',
//                'code' => 'sys_data_source_edit',
//                'url' => '/admin/datasource/edit/{id}',
//                'type' => $this->get_module_type_const_value('module_addedit'),
//                'is_system' => true,
//                'enable' => true,
//                'sort' => 6
//            ]
//        ];
//        try {
//            DB::table('sys_modules')->insert($modules);
//        } catch (Exception $ex) {
//            throw new Exception("填充新数据失败", $ex->getCode(), $ex);
//        }
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
        return 0;
    }

    public function run()
    {
        $this->get_module_type_const_value();
        try {
            DB::transaction(function () {
                $this->insert_data();
//                $this->update_parent_id();
            });
            DB::beginTransaction();
            DB::commit();
        } catch (Exception $ex) {
            DB::rollBack();
            throw new Exception('填充模块数据失败', $ex->getCode(), $ex);
        }
    }
}
