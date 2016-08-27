<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Doctrine\DBAL\Types\Type;

class CreateSysModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_modules', function (Blueprint $table) {

            $table->increments('id');
            $table->string('name')->comment = "模块名称";
            $table->string('code')->comment = "模块代码";
            $table->string('url')->comment = "模块URL";
            $table->integer('type')->default(0)->comment = "模块类型";
            $table->integer('parent_id')->default(0)->comment = "父级窗体ID";
            $table->boolean('is_system')->default(false)->comment = "是否系统模块";
            $table->boolean('enable')->default(true)->comment = "是否启用";
            $table->integer('sort')->default(0)->comment="排序";
            # 使用$table->timestamps();生成的两个字段没有默认值，手动添加create_at、update_at字段并设置默认值
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
        Schema::dropIfExists('sys_modules');
    }
}
