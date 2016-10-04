<?php

namespace App\Http\Controllers\DataService;

use Illuminate\Http\JsonResponse;
use App\Util;
use App\BusinessDomain;
use App\Http\Controllers\Controller;
use DB;

class DropDownController extends Controller
{
    //
    public function ModuleType()
    {
        $data = BusinessDomain\ConstValueDataService::get_const_value_for_dorpdown(Util\ConstValue::CONST_VALUE_GROUP_CODE_MODULE_TYPE);
        $result = [['text' => '请选择模块类型']];
        foreach ($data as $item) {
            array_push($result, ['text' => $item->name, 'value' => $item->value]);
        }
        return new JsonResponse($result);
    }

    public function ParentModule()
    {
        $sql = "SELECT
                  id,
                  name
                FROM
                  `sys_modules`
                WHERE ENABLE
                  = 1
                ORDER BY
                  sort";
        $data = DB::select($sql);
        $result = [['text' => '请选择父级模块']];
        foreach ($data as $item) {
            array_push($result, ['text' => $item->name, 'value' => $item->id]);
        }
        return new JsonResponse($result);
    }
}
