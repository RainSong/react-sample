<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSysConstValueGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_const_value_groups', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->comment = '常量组名';
            $table->string('code')->comment = '常亮组Code';
            $table->boolean('enable')->default(true)->comment = '是否启用';
            $table->integer('sort')->default(0)->comment = '排序';
            $table->boolean('is_system')->default(false)->comment='是否系统常量组';

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
        Schema::drop('sys_const_value_groups');
    }
}
