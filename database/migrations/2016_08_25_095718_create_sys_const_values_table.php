<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSysConstValuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_const_values', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('group_id')->comment = '常量组ID';
            $table->string('name', 200)->comment = '常量名';
            $table->string('code', 200)->comment = '常量值Code';
            $table->string('value', 200)->comment = '常亮值';
            $table->integer('value_type')->default(0)->comment = '值类型';
            $table->boolean('enable')->default(true)->comment = '是否启用';
            $table->integer('sort')->default(0)->comment = '排序';

            $table->timestamp('created_at')
                ->default(DB::raw('CURRENT_TIMESTAMP'));

            $table->timestamp('updated_at')
                ->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('sys_const_values');
    }
}
