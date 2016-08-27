<?php
/**
 * Created by PhpStorm.
 * User: YGJ
 * Date: 2016/8/26
 * Time: 16:32
 */

namespace App\BusinessDomain;

use DB;

class ConstValueDataService{


    /**
     * 获取填充下拉框的常量数据
     * @param $group_code 常量组CODE
     * @return array 常量组数组，以SORT正序排序
     */
   public static function get_const_value_for_dorpdown($group_code){
        $sql = 'SELECT
                  cv.id,
                  cv.name,
                  cv.code
                FROM
                  `sys_const_values` AS cv
                LEFT JOIN
                  `sys_const_value_groups` AS cg
                ON
                  cv.group_id = cg.id
                WHERE
                  cg.code = \''. $group_code .'\' 
                  AND cv.enable = 1
                ORDER BY
                  cv.sort';

        try{
            $result = DB::select($sql);
            return $result;
        }catch (Exception $ex){
            throw new Exception('get const value for drop down fail',$ex->getCode(),$ex);
        }
    }
}