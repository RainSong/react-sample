"use strict"

var React = require("react");
var Contorl = require("./react.control.jsx");

var EditFormFoter = React.createClass({
    render: function () {
        return (<div className="box-footer">
            <button key='f-b-1'
                    id="btnCancel"
                    type="button"
                    className="btn btn-default"
                    onClick={ this.props.options.cancelHandle }>取消
            </button>
            <button key='f-b-2'
                    id="btnSave"
                    type="button"
                    className="btn btn-info pull-right"
                    onClick={ this.props.options.saveHandle }>保存
            </button>
        </div>);
    }
});

var EditFormControl = React.createClass({
    getInitialState: function () {
        return {
            hasError: false,
            errorMessage: ''
        };
    },
    showError: function (e, hasError, errorMessage) {
        this.setState({
            hasError: hasError,
            errorMessage:errorMessage
        });
    },
    render: function () {
        var errorMessageStyle = {display: "none"};
        var controlBoxClass = "form-group";
        if (this.state.hasError) {
            errorMessageStyle.display = "block";
            controlBoxClass += " has-error";
        }

        return (<div id={ this.props.options.controlBoxId }
                     className={ controlBoxClass }>
            <label htmlFor={ this.props.options.controlId }
                   className="col-sm-2 control-label">
                { this.props.options.title }
            </label>
            <div className="col-sm-10">
                <Contorl options={ this.props.options }
                         showError={ this.showError }/>
                <span id={ this.props.options.errorMessageBoxId }
                      className="help-block"
                      style={ errorMessageStyle }>{ this.state.errorMessage }</span>
            </div>
        </div>);
    }
});

var EditFormBody = React.createClass({
    render: function () {
        var controls = [];
        this.props.options.forEach(function (item) {
            controls.push(<EditFormControl key={ 'edit-form-control-' + item.controlId} options={item}/>);
        });

        return (<div className="box-body">
            { controls }
        </div>);
    }
});

var EidtForm = React.createClass({
    render: function () {


        return (<form className="form-horizontal">
            <EditFormBody options={ this.props.controlOptions }/>
            <EditFormFoter options={ this.props.footerOptions }/>
        </form>);
    }
});
module.exports = EidtForm;

