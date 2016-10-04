<?php
/**
 * Created by PhpStorm.
 * User: YGJ
 * Date: 2016/9/1
 * Time: 10:46
 */

namespace App\Http\Controllers\DataService;

use Illuminate\Http\JsonResponse;
use League\Flysystem\Exception;
use App\BusinessDomain\NavDataService;
use Log;
use App\Http\Controllers\Controller;

class NavController extends Controller
{
    public function LeftNav()
    {
        $result = [
            'status' => 0,
            'message' => ''
        ];
        try {
            $items = NavDataService::GetLeftNavItems();
            $result['status'] = 1;
            $result['message'] = $items;
        } catch (Exception $ex) {
            Log::error('查询左侧菜单数据失败', $ex);
        }
        return new JsonResponse($result);
    }
}