@extends('layouts.admin')

@if ($title == null)
    {{  $title = "增加" }}
@endif

@section('title',$title.'模块')

@section('header')


@endsection

@section('main')
    <div class="row">
        <div class="col-md-12">
            <div class="alert alert-danger" role="alert" style="display:none;">发生错误保存失败！</div>
            <div class="box box-info">
                <div class="box-header with-border">
                    <h3 class="box-title">{{ $title }}模块</h3>
                </div>
                <div id="eidtform">

                </div>
            </div>
        </div>
    </div>
@endsection



@section('foot')
    <script type="text/javascript" src="/static/scripts/build/pages/admin.module.addedit.js"></script>
@endsection
