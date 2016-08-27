"use strict"

var react = require('react');

var Text = React.createClass({
    checkError:function(e){
        e.preventDefault();
        if (!this.props.options.nullalbe && (!e.target.value || e.target.value.length == 0)) {
            this.props.showError(null, true, this.props.options.title + '不能为空');
        } else {
            this.props.showError(null, false, '');
        }
    },
    onChangeHandle: function (e) {
        this.setState({value: e.target.value});
    },
    getInitialState: function () {
        return {
            value: ''
        };
    },
    render: function () {
        return (<input type="text"
                       className="form-control"
                       key={ this.props.options.id }
                       id={ this.props.options.controlId }
                       placeholder={ this.props.options.placeholder }
                       data-field={this.props.options.field }
                       onBlur={ this.checkError }
                       onChange={ this.checkError }
                       maxLength={ this.props.options.maxLength }/>)
    }
});

module.exports = Text;