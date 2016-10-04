<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSysDataSourcesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sys_data_sources', function (Blueprint $table) {
            $table->increments('id');
            $table->string('unique_key', 36)->comment='全局唯一标识';
            $table->string('name', 200)->comment = '数据源名称';
            $table->integer('type')->default(0)->commnt = '数据源类型';
            $table->boolean('enable')->default(true)->comment = '是否启用';
            $table->boolean('is_system')->default(false)->comment = '是否系统';

            $table->timestamp('created_at')
                ->default(DB::raw('CURRENT_TIMESTAMP'));

            $table->timestamp('updated_at')
                ->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        });

        $pdo = DB::connection()->getPdo();
        $pdo->exec('DROP TRIGGER IF EXISTS sys_data_source_unique_key_generate;');
        $pdo->exec('CREATE TRIGGER sys_data_source_unique_key_generate BEFORE
                        INSERT
                        ON
                          sys_data_sources FOR EACH ROW
                        SET NEW
                          .unique_key = UUID();');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sys_data_sources');
    }
}
