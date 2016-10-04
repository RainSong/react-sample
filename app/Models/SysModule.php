<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property bool is_system
 * @property bool enable
 * @property string name
 * @property string code
 * @property int sort
 * @property int type
 * @property string url
 * @property int parent_id
 * @property mixed id
 */
class SysModule extends Model
{
    //
    protected $table = 'sys_modules';
    protected $connection = 'mysql';
}
