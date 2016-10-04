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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', 'TestController@get_module_type_const_value');

Route::get('/admin/module/list', function () {
    return view('admin.module.list');
});

Route::post('/admin/module/listdata', 'Admin\ModuleController@ListData');
//Route::get('/admin/module/add', function () {
//    return view('admin.module.addedit', ['title' => '增加']);
//});
//Route::get('/admin/module/edit/{module_id}', 'Admin\ModuleController@Edit');

Route::get('/admin/module/add', 'Admin\ModuleController@Add');
Route::post('/admin/module/save','Admin\ModuleController@Save');
Route::match(['GET', 'POST'], '/admin/module/edit/{id}', 'Admin\ModuleController@Edit');
Route::match(['GET','POST'],'/admin/module/info/{id?}','Admin\ModuleController@Info');

Route::match(['POST','GET'],'/admin/datasource/','Admin\DataSourceController@Index');
Route::match(['POST','GET'],'/admin/datasource/add','Admin\DataSource@Add');
Route::match(['POST','GET'],'/admin/datasource/edit','Admin\DataSource@edit');

Route::match(['GET', 'POST'],
    '/dataservice/dropdown/moduletype',
    'DataService\DropDownController@ModuleType');

Route::match(['GET', 'POST'],
    '/dataservice/dropdown/parentmodule',
    'DataService\DropDownController@ParentModule');

Route::match(['GET','POST'],
    '/dataservice/nav/left',
    'DataService\NavController@LeftNav');

Route::match(['GET','POST'],
    '/service/from/grid/{form_code?}',
    'DataService\FormConfigController@Grid');
