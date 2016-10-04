<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSysFileldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('sys_fields', function (Blueprint $table) {
            $table->increments('id');
            $table->string('reference_id', 36)->comment='引用对象标识';
            $table->string('name', 200)->comment = '字段名称';
            $table->integer('type')->default(0)->commnt = '字段类型';
            $table->boolean('enable')->default(true)->comment = '是否启用';
            $table->boolean('is_system')->default(false)->comment = '是否系统';

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
        //
    }
}
