"use strict"

var React = require('react');

var Actions = React.createClass({
    clickHandle: function (item, e) {
        e.preventDefault();
        debugger
        if (item.actionType == "add") {
            window.location.href = item.actionUrl;
        }
    },
    render: function () {
        var btnStyle = {
            marginRight: '10px'
        };
        var actions = [];

        for (var i = this.props.data.length - 1; i >= 0; i--) {
            var item = this.props.data[i];
            actions.push(<input type="button"
                                className="btn btn-info pull-right"
                                style={ btnStyle }
                                id={  "btn" + item.id }
                                key={ item.id }
                                value={ item.title }
                                onClick={ this.clickHandle.bind(null, item) }/>);

        }
        return (<div>{ actions }</div>);
    }
});

module.exports = Actions;