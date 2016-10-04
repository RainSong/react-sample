"use strict"

var React = require('react');

var Action = React.createClass({
    clickHandle: function (e) {
        e.preventDefault();
        if (this.props.options.actionHandle) {
            this.props.options.actionHandle(this.props.options.actionUrl);
        }
        else if (this.props.options.actionUrl) {
            window.location.href = this.props.options.actionUrl;
        }
    },
    render: function () {
        var btnStyle = {
            marginRight: '10px'
        };
        return (<input type="button"
                       className="btn btn-info pull-right"
                       style={ btnStyle }
                       id={  "btn" + this.props.options.id }
                       key={ this.props.options.id }
                       value={ this.props.options.title }
                       onClick={ this.clickHandle }/>);
    }
});

var Actions = React.createClass({
    render: function () {
        var actions = [];
        for (var i = this.props.data.length - 1; i >= 0; i--) {
            var item = this.props.data[i];
            actions.push(<Action key={'query-action' + i} options={ item}/>);
        }
        return (<div>{ actions }</div>);
    }
});

module.exports = Actions;