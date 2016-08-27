<?php

namespace App\Http\Controllers\Admin;

use DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Models\SysModule;

class ModuleController extends Controller
{
    //
    public function ListData(Request $request)
    {

        $current_page = $request->get('currentPage', 1);
        $page_size = $request->get('pageSize', 10);
        $sort_column_name = $request->get('sortColumnName', 'id');
        $sort_order = $request->get('sortOrder', 'asc');

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
                  const_value_group.code = 'module_type'
                ORDER BY child.$sort_column_name $sort_order ";

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
}
