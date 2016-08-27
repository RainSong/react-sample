<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use DB;

use App\Http\Requests;

class TestController extends Controller
{
    //

    public function get_module_type_const_value(){
        $sql = "SELECT
                  cvalues.id,
                  cvalues.code
                FROM
                  `sys_const_values` AS cvalues
                LEFT JOIN
                  `sys_const_value_groups` AS cgroups
                ON
                  cvalues.group_id = cgroups.id
                WHERE
                  cgroups.code = 'module_type'";
        $result = DB::select($sql);
        return new JsonResponse($result);
    }
}
