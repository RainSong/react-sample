"use strict"

var React = require('react');
var QueryControls = require('../react.grid.query.jsx');
var QueryActions = require('../react.grid.actions.jsx');
var Grid = require('../react.grid.jsx');

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
        actionUrl: '/module/module/add'
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
        actionUrl: '/module/module/add'
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

ReactDOM.render(<Grid options={ gridOptions }/>,
    document.getElementById('grid'));

