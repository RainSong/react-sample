@extends('layouts.admin')
@if($title==null)
    {{ $title = '' }}
@endif
@section('title',$title)

@section('header')
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.12/css/dataTables.bootstrap.min.css"/>
    <style type="text/css">
        table.dataTable tbody tr.selected {
            background-color: #B0BED9;
        }
    </style>
@endsection

@section('main')
    <div class="row">
        <div class="col-md-12">
            <div class="box box-info">
                <form class="form-horizontal">
                    <div class="box-header"></div>
                    <div class="box-body" id="box-query-controls">

                    </div>
                    <div class="box-footer" id="box-list-action">

                    </div>
                </form>
            </div>
            <div class="box box-success">
                <div class="box-body" id="grid">
                </div>
            </div>
        </div>
    </div>
@endsection

@section('foot')
    <script type="text/javascript" src="/static/scripts/build/pages/admin.datasource.list.js"></script>
@endsection
