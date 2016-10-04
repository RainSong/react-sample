"use strict"

var React = require('React');
var QueryControls = require('../react.grid.query.jsx');
var QueryActions = require('../react.grid.actions.jsx');
var Grid = require('../react.grid.jsx');
var Signal = require('signals');

var gridSignal = new Signal.Signal();

function getGridSelectIds() {
    var ids = [];
    var selectRow = $('.dataTable tbody tr.selected');
    if (selectRow.length == 0)return ids;
    for (var i = 0, j = selectRow.length; i < j; i++) {
        ids.push($(selectRow[i]).attr('data-id'));
    }
    return ids;
}

function editActionHandle(url) {
    var selectIds = getGridSelectIds();
    if (!selectIds || selectIds.length == 0) {
        alert('请选择要修改的数据！');
    } else if (selectIds.length > 1) {
        alert('一次只能修改一条数据！');
    }
    else {
        url = url.replace('{id}', selectIds[0]);
        window.location.href = url;
    }
}

function refreshGrid() {
    var keyWord = $('#txtName').val();
    var enable = $('#selectStatus option:selected').val();
    var paras = {
        keyWord: keyWord,
        enable: enable
    }
    gridSignal.dispatch(paras);
}

$(document).ready(function () {
    $.ajax({
        url: '/service/from/grid/datasource',
        type: 'POST',
        dtatType: 'json',
        data:{
            _token:_globalObj._token
        },
        success: function (data) {
            if (data.status == 1) {
                ReactDOM.render(<QueryControls data={ data.message.grid_query_options }/>,
                    document.getElementById('box-query-controls'));

                ReactDOM.render(<QueryActions data={ data.message.grid_action_options }/>,
                    document.getElementById('box-list-action'));

                ReactDOM.render(<Grid options={ data.message.grid_options }
                                      signal={ gridSignal }/>,
                    document.getElementById('grid'));
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
});