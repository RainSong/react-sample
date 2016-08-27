"use strict"

var React = require('react')

var Select = React.createClass({
    getInitialState: function () {
        return {
            data: []
        }
    },
    componentDidMount: function () {
        this.populateData();
    },
    checkError: function (e) {
        if (!this.props.options.nullable && (!e.target.value || !e.target.value.length)) {
            this.props.showError(e, true, '请选择' + this.props.options.title);
        }
        else {
            this.props.showError(e, false, '');
        }
    },
    /* function for populate data */
    populateData: function () {
        if (!this.props.options.data && this.props.options.dataUrl) {
            $.ajax({
                url: this.props.options.dataUrl,
                type: 'POST',
                data: {
                    _token: _globalObj._token
                },
                success: function (data) {
                    if (this.isMounted()) {
                        this.setState({data: data});
                    }
                }.bind(this),
                error: function (err) {
                    alert('Error');
                }.bind(this)
            });
        }
    },
    buildItems: function (data, textField, valueField) {
        var items = [];
        var index = 0;
        data.forEach(function (item) {
            var text = item[textField];
            var value = item[valueField];
            if (!value) {
                value = '';
            }
            if (item["selected"]) {
                items.push(<option key={ index }
                                   value={ value }
                                   selected="selected">
                    { text }
                </option>);
            }
            else {
                items.push(<option key={ index }
                                   value={ value }>
                    { text }
                </option>);
            }
            index++;
        });
        return items;
    },
    render: function () {
        var selectItems = [];
        var data = [];
        if (this.props.options.data) {
            data = this.props.options.data;
        }
        else if (this.state.data) {
            data = this.state.data;
        }
        selectItems = this.buildItems(data, this.props.options.textField, this.props.options.valueField);
        return (<select className="form-control"
                        id={ this.props.options.controlId }
                        data-field={ this.props.options.field }
                        onBlur={this.checkError}
                        onChange={this.checkError}>
            { selectItems }
        </select>);
    }
});

module.exports = Select;