<?php

namespace App\Http\Controllers\DataService;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class FormConfigController extends Controller
{
    //
    public function Grid(Request $request, $form_code = null)
    {
        if ($form_code == 'datasource') {
            $grid_query_options = [
                [
                    'id' => 1,
                    'controlId' => 'txtName',
                    'title' => '数据源名称',
                    'controlType' => 'text',
                    'field' => 'name',
                    'placeholder' => '请输入数据源名称'
                ],
                [
                    'id' => 2,
                    'controlId' => 'selectType',
                    'title' => '数据源类型',
                    'controlType' => 'select',
                    'field' => 'type',
                    'data' => [
                        ['text' => '列表数据', 'value' => '0'],
                        ['text' => '下拉框数据', 'value' => '1']
                    ]
                ]
            ];
            $grid_action_options = [
                [
                    'id' => 1,
                    'title' => '查询',
                    'actionHandler' => 'refreshGrid'
                ],
                [
                    'id' => 2,
                    'title' => '增加',
                    'actionHandler' => 'refreshGrid'
                ],
                [
                    'id' => 3,
                    'title' => '修改',
                    'actionHandler' => 'refreshGrid'
                ],
                [
                    'id' => 4,
                    'title' => '删除',
                    'actionHandler' => 'refreshGrid'
                ]
            ];
            $grid_options = [
                'keyColumn' => 'id',
                'pageSize' => 10,
                'dataUrl' => '/admin/datasource',
                'columns' => [
                    [
                        'name' => 'id',
                        'title' => 'ID',
                        'sortable' => true
                    ],
                    [
                        'name' => 'name',
                        'title' => '名称',
                        'sortable' => true
                    ],
                    [
                        'name' => 'type',
                        'title' => '类型',
                        'sortable' => true
                    ],
                    [
                        'name' => 'enable',
                        'title' => '是否启用',
                        'sortable' => true
                    ],
                    [
                        'name' => 'created_at',
                        'title' => '添加时间',
                        'sortable' => true
                    ],
                    [
                        'name' => 'updated_at',
                        'title' => '最后修改时间',
                        'sortable' => true
                    ]
                ]
            ];
            $result = [
                'status' => 1,
                'message' => [
                    'grid_query_options' => $grid_query_options,
                    'grid_action_options' => $grid_action_options,
                    'grid_options' => $grid_options
                ]
            ];
            return new JsonResponse($result);
        } else {
            return new JsonResponse(['status' => 0]);
        }
    }
}
