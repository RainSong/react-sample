<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

use App\Models\Admin\SysModule;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', 'TestController@get_module_type_const_value');

Route::get('/admin/module/list', function () {
    return view('admin.module.list');
});

Route::post('/admin/module/listdata', 'Admin\ModuleController@ListData');
Route::get('/admin/module/add', function () {
    return view('admin.module.addedit', ['title' => '增加']);
});
Route::get('/admin/module/edit/{module_id}', 'Admin\ModuleController@Edit');

Route::match(['GET', 'POST'],
    '/dataservice/dropdown/moduletype',
    'DataService\DropDownController@ModuleType');

Route::match(['GET', 'POST'],
    '/dataservice/dropdown/parentmodule',
    'DataService\DropDownController@ParentModule');
