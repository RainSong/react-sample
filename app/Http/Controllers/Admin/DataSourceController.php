<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class DataSourceController extends Controller
{
    //
    public function Index(Request $request)
    {
        $method = strtolower($request->getMethod());
        if ($method == 'get') {
            return view('admin.datasource.list', ['title' => '数据源管理']);
        }
    }

    public function Add(Request $request)
    {

    }

    public function Edit(Request $request, $id = 0)
    {
    }
}
