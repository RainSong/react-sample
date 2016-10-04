"use strict"

var react = require('react');

var Text = React.createClass({
    checkError: function (e) {
        e.preventDefault();
        if (this.props.showError) {
            if (!this.props.options.nullable && (!e.target.value || e.target.value.length == 0)) {
                this.props.showError(null, true, this.props.options.title + '不能为空');
            } else {
                this.props.showError(null, false, '');
            }
        }
    },
    onChangeHandle: function (e) {
        var oldValue = this.state.value;
        if (this.props.options.verifyRegx) {
            var re = null;
            var type = typeof(this.props.verifyRegx);
            if (type === "string" && this.props.options.verifyRegx.length > 0) {
                re = new RegExp(this.props.options.verifyRegx);
            }
            else if (type === "object") {
                re = this.props.options.verifyRegx;
            }
            if (re) {
                if (re.test(e.target.value)) {
                    this.setState({value: e.target.value});
                } else {
                    this.setState({value: oldValue});
                }
            }
            else {
                this.setState({value: e.target.value});
            }
        }
        else {
            this.setState({value: e.target.value});
        }
    },
    getInitialState: function () {
        return {
            value: this.props.options.value
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
                       onChange={ this.onChangeHandle }
                       maxLength={ this.props.options.maxLength }
                       value={ this.state.value}/>)
    }
});

module.exports = Text;