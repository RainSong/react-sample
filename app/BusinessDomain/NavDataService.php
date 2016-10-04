<?php
/**
 * Created by PhpStorm.
 * User: YGJ
 * Date: 2016/9/1
 * Time: 10:04
 */

namespace App\BusinessDomain;

use DB;
use Illuminate\Http\JsonResponse;
use League\Flysystem\Exception;

class NavDataService
{
    static function GetLeftNavItems()
    {
        $first_level_sql = 'SELECT
                              id,
                              name,
                              code
                            FROM
                              sys_modules
                            WHERE ENABLE
                              = 1 AND parent_id = 0';

        $second_level_sql = 'SELECT
                                  child.id,
                                  child.name,
                                  child.url,
                                  child.parent_id
                                FROM
                                  `sys_modules` AS child
                                LEFT JOIN
                                  `sys_modules` AS parent
                                ON
                                  child.parent_id = parent.id
                                WHERE
                                  child.enable = 1 
                                  AND parent.enable = 1 
                                  AND child.parent_id != 0 
                                  AND parent.parent_id = 0';

        $first_level_items = DB::select($first_level_sql);
        $second_level_items = DB::select($second_level_sql);

        foreach ($first_level_items as $item) {
            foreach ($second_level_items as $sub_item) {
                if ($item->id == $sub_item->parent_id) {
                    $sub_items = object_get($item,'sub_items',null);
                    if ($sub_items == null)
                    {
                        $item->sub_items = [];
                    }
                    array_push($item->sub_items, $sub_item);
                }
            }
        }
        return $first_level_items;
    }
}