/**
 * Created by YGJ on 2016/8/25.
 */

var React = require('react');
var EditForm = require('../react.eidt.form.jsx');

function getDataFormControl() {
    if (!data) data = {};
    controlOptions.forEach(function (item) {
        if (item.field && item.field.length) {
            var value = '';
            if (item.controlType == 'text') {
                value = $("input[data-field='" + item.field + "']").val();
            }
            else if (item.controlType == 'select') {
                value = $("select[data-field='" + item.field + "'] option:selected").val();
            }
            data[item.field] = value;
        }
    });
}

function checkInput() {
    var hasError = false;
    controlOptions.forEach(function (item) {
        var value = data[item.field];
        if (!item.nullable && (!value || !value.length)) {
            $('#' + item.controlBoxId).addClass('has-error');
            var errorMessage = '';
            if (item.controlType == 'text') {
                errorMessage = item.title + '不能为空';
            }
            else if (item.controlType == 'select') {
                errorMessage = '请选择' + item.title;
            }
            $('#' + item.errorMessageBoxId).text(errorMessage).css('display', 'block');
            hasError = true;
        }
        else {
            $('#' + item.controlBoxId).removeClass('has-error');
            $('#' + item.errorMessageBoxId).css('display', 'none');
        }
    });
    return hasError;
}

function postData() {
    data['_token'] = _globalObj._token;
    $.ajax({
        url: '/admin/module/save',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (data) {
            if (data.status == 1) {
                window.location.href = '/admin/module/list';
            }
        },
        error: function (data) {
            console.log(data);
        }
    })
}

function save(e) {
    getDataFormControl();
    if (!checkInput()) {
        postData();
    }
}

function getData() {
    data['id'] = {id};
    if (!data['id'])return;
    $.ajax({
        url: '/admin/module/info/',
        type: 'POST',
        dataType: 'json',
        data: {
            id: data['id'],
            _token: _globalObj._token
        },
        success: function (result) {
            if (result.status == 1) {
                data = result.message;
                bindDataToControlOptions();
            }
            else {
                alert('加载信息失败！');
            }
        },
        error: function (error) {
            alert('发生错误，加载信息失败！');
        }
    });
}

function bindDataToControl() {
    controlOptions.forEach(function (options) {
        var value = module[options['field']];
        var field = options['field']
        if (options['controlType'] == 'text') {
            $('input[data-field:"' + field + '"]').val(value);
        } else if (options['controlType'] == 'select') {
            $('select[data-field="parent"] option[value="' + field + '"]').attr('selected', 'selected');
        }
    });
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
        errorMessageBoxId: 'nameErrorMessage',
        controlType: 'text',
        nullable: false,
        maxLength: 100,
        placeholder: '请输入模块名称',
        field: 'name',
        value:data['name']
    },
    {
        title: '代码',
        controlId: 'txtCode',
        controlBoxId: 'divCode',
        errorMessageBoxId: 'codeErrorMessage',
        controlType: 'text',
        maxLength: 100,
        nullable: false,
        placeholder: '请输入模块代码',
        field: 'code',
        value:data['code']
    },
    {
        title: 'URL',
        controlId: 'txtUrl',
        controlBoxId: 'divUrl',
        errorMessageBoxId: 'urlErrorMessage',
        controlType: 'text',
        maxLength: 100,
        nullable: false,
        placeholder: '请输入模块URL',
        field: 'url',
        value:data['url']
    },
    {
        title: '类型',
        controlId: 'selectType',
        controlBoxId: 'typeDiv',
        errorMessageBoxId: 'typeErrorMessage',
        controlType: 'select',
        nullable: false,
        dataUrl: '/dataservice/dropdown/moduletype',
        textField: 'text',
        valueField: 'value',
        field: 'module_type',
        value:data['type']
    },
    {
        title: '父级模块',
        controlId: 'selectParent',
        controlBoxId: 'parentDiv',
        errorMessageBoxId: 'parentErrorMessage',
        controlType: 'select',
        nullable: true,
        dataUrl: '/dataservice/dropdown/parentmodule',
        textField: 'text',
        valueField: 'value',
        field: 'parent',
        value:data['parent']
    },
    {
        title: '排序',
        controlId: 'txtSort',
        controlBoxId: 'sortDiv',
        errorMessageBoxId: 'sortErrorMessageBox',
        controlType: 'text',
        nullable: true,
        field: 'sort',
        verifyRegx: '^\\d+$',
        value:data['sort']
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

