/**
 * Created by YGJ on 2016/8/25.
 */

var React = require('react');
var EditForm = require('../react.eidt.form.jsx');

function save(e) {
    console.log('save button clicked');
}

function cancel(e) {
    if (confirm('确定不保存退出吗？')) {
        window.location.href = '/admin/module/list';
    }
}

var controlOptions = [
    {
        title: '名称',
        controlId: 'textName',
        controlBoxId: 'divName',
        errorMssageBoxId: 'nameErrorMessage',
        controlType: 'text',
        nullable: false,
        maxLength: 100,
        placeholder: '请输入模块名称'
    },
    {
        title: '代码',
        controlId: 'txtCode',
        controlBoxId: 'divCode',
        errorMssageBoxId: 'codeErrorMessage',
        controlType: 'text',
        maxLength: 100,
        nullable: false,
        placeholder: '请输入模块代码'
    },
    {
        title: 'URL',
        controlId: 'txtUrl',
        controlBoxId: 'divUrl',
        errorMssageBoxId: 'urlErrorMessage',
        controlType: 'text',
        maxLength: 100,
        nullable: false,
        placeholder: '请输入模块URL'
    },
    {
        title: '类型',
        controlId: 'selectType',
        controlBoxId: 'typeDiv',
        errorMssageBoxId: 'typeErrorMessage',
        controlType: 'select',
        nullable: false,
        dataUrl: '/dataservice/dropdown/moduletype',
        textField: 'text',
        valueField: 'value'
    },
    {
        title: '父级模块',
        controlId: 'selectParent',
        controlBoxId: 'parentDiv',
        errorMssageBoxId: 'parentErrorMessage',
        controlType: 'select',
        nullable: true,
        dataUrl: '/dataservice/dropdown/parentmodule',
        textField: 'text',
        valueField: 'value'
    }
];

var footerOptions = {
    showSaveButton: true,
    saveHandle: save,
    showCancelButton: true,
    cancelHandle: cancel
};

ReactDOM.render(<EditForm footerOptions={ footerOptions }
                          controlOptions={ controlOptions }/>,
    document.getElementById('eidtform'));

