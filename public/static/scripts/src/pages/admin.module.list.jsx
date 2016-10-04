"use strict"

var React = require('react');
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

var gridQueryOptions = [
    {
        id: 'qc-100',
        controlId: 'txtName',
        title: '模块名称',
        controlType: 'text',
        field: 'name',
        placeholder: '模块名称'
    },
    {
        id: 'qc-101',
        controlId: 'selectStatus',
        title: '模块状态',
        controlType: 'select',
        field: 'status',
        nullable: true,
        textField: 'text',
        valueField: 'value',
        value: 0,
        data: [
            {id: 'item-1', text: '已删除', value: 1},
            {id: 'item-2', text: '未删除', value: 0}
        ]
    }
];

var gridActionOptions = [
    {
        id: 'ac-01',
        title: '查询',
        actionType: 'add',
        actionUrl: '/module/module/add',
        actionHandle: refreshGrid
    },
    {
        id: 'ac-02',
        title: '添加',
        actionType: 'add',
        actionUrl: '/admin/module/add',
    },
    {
        id: 'ac-03',
        title: '修改',
        actionType: 'edit',
        actionUrl: '/admin/module/edit/{id}',
        actionHandle: editActionHandle
    },
    {
        id: 'ac-04',
        title: '删除',
        actionType: 'delete',
        actionUrl: '/module/module/delete'
    }
]

var gridOptions =
{
    keyColumn: 'id',
    pageSize: 10,
    dataUrl: "/admin/module/listdata",
    columns: [
        {
            name: 'id',
            title: 'id',
            sortable: true
        },
        {
            name: "name",
            title: "名称",
            sortable: true
        },
        {
            name: "code",
            title: "Code",
            sortable: true
        },
        {
            name: "url",
            title: "URL",
            sortable: false
        },
        {
            name: "type",
            title: "模块类型",
            sortable: true,
            render: function (rowData, cellValue) {
                if (cellValue == "1") {
                    return "模块组";
                }
                else if (cellValue == "2") {
                    return "列表模块";
                }
                else if (cellValue == "3") {
                    return "新增模块";
                }
                else if (cellValue == "4") {
                    return "修改模块";
                }
                else if (cellValue == "5") {
                    return "视图模块";
                }
                return "未知模块类型";
            }
        },
        {
            name: "parent_name",
            title: "父级模块",
            sortable: false
        },
        {
            name: "is_system",
            title: "是否系统模块",
            render: function (rowData, cellValue) {
                if (cellValue) {
                    return "是";
                } else {
                    return "否";
                }
            }
        },
        {
            name: "created_at",
            title: "添加时间",
            sortable: false
        },
        {
            name: "updated_at",
            title: "最后修改时间",
            sortable: false
        }
    ]
};

ReactDOM.render(<QueryControls data={ gridQueryOptions }/>,
    document.getElementById('box-query-controls'));

ReactDOM.render(<QueryActions data={ gridActionOptions }/>,
    document.getElementById('box-list-action'));

ReactDOM.render(<Grid options={ gridOptions }
                      signal={ gridSignal }/>,
    document.getElementById('grid'));

