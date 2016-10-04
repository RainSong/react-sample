<?php

namespace App\Http\Controllers\Admin;

use DB;
use Log;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use League\Flysystem\Exception;
use phpDocumentor\Reflection\Types\Integer;
use Psy\Util\Json;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Models;

class ModuleController extends Controller
{
    //
    public function ListData(Request $request)
    {

        $current_page = intval($request->get('currentPage', 1));
        $page_size = intval($request->get('pageSize', 10));
        $sort_column_name = $request->get('sortColumnName', 'id');
        $sort_order = $request->get('sortOrder', 'asc');

        $keyWOrd = $request->get('keyWord', null);
        $enable = $request->get('enable', null);

        $start_index = ($current_page - 1) * $page_size;

        $sql = "SELECT
                  child.*,
                  parent.name AS parent_name,
                  const_value.name AS module_type
                FROM
                  `sys_modules` AS child
                LEFT JOIN
                  `sys_modules` AS parent
                ON
                  child.parent_id = parent.id
                LEFT JOIN
                  `sys_const_values` AS const_value
                ON
                  child.type = const_value.value
                LEFT JOIN
                  `sys_const_value_groups` AS const_value_group
                ON
                  const_value.group_id = const_value_group.id
                WHERE
                  const_value_group.code = 'module_type'";
        if ($keyWOrd != null) {
            $sql = $sql . " AND child.name like '% " . $keyWOrd . "%'";
        }
        if ($enable != null) {
            $sql = $sql . " AND child.enable = " . strval($enable);
        }
        $sql = $sql . "\nORDER BY child." . $sort_column_name . " " . $sort_order;
        $sql = $sql . "\nLIMIT  " . strval($start_index) . "," . strval($page_size);

        $data = DB::select($sql);

        $count = DB::table("sys_modules")->count("id");

        $page_count = intval($count / $page_size);
        $residue = $count % $page_size;
        if ($residue > 0) $page_count++;

        $data = [
            "data" => $data,
            "total" => $count,
            "totalPage" => $page_count,
            "currentPage" => $current_page,
            "sortColumnName" => $sort_column_name,
            "sortOrder" => $sort_order
        ];
        return new JsonResponse($data);
    }

    public function Add(Request $request)
    {
        return view('admin.module.addedit', ['title' => '增加', 'module' => null]);
    }

    public function Edit(Request $request, $id)
    {
        $method = strtolower($request->getMethod());
        if ($method == "get") {
            $module = Models\SysModule::find($id);
            return view('admin.module.addedit', ['title' => '修改', 'module' => $module]);
        }
    }

    public function Info(Request $request, $id = 0)
    {
        $id = 0;
        if ($id == 0) $id = $request::get('id', 0);
        $result = ['status' => 0, 'message' => ''];
        if ($id > 0) {
            try {
                $module = Models\SysModule::find($id);
                $result->message = $module;
            } catch (Exception $ex) {
                Log::error('获取模块信息失败', $ex);
                $result->message = '';
            }
        }
        return new JsonResponse($result);
    }

    public function Save(Request $request)
    {
        $id = $request->get('id', 0);
        $module = null;
        $result = ['status' => 0, 'message' => ''];

        if ($id == 0) {
            $module = new Models\SysModule();
            $module->is_system = false;
            $module->enable = true;
        } else {
            try {
                $module = Models\SysModule::find($id);
            } catch (Exception $ex) {
                Log::error('获取模块信息失败', $ex);
            }
        }
        if ($module == null) {
            $result['status'] = '获取模块信息失败';
            return new JsonResponse($result);
        }
        $module->name = $request->get('name', '');;
        $module->code = $request->get('code', '');
        $module->url = $request->get('url', '');
        $module->type = $request->get('module_type', 0);
        $module->parent_id = $request->get('parent', 0);
        $module->sort = $request->get('sort', 0);
        $result = ['status' => 0];
        try {
            $module->save();
            $result['status'] = 1;
        } catch (Exception $ex) {
            $result['message'] = '保存模块信息失败';
            Log::error('保存模块信息失败', $ex);
        }
        return new JsonResponse($result);
    }
}
