/**
 * Created by YGJ on 2016/8/25.
 */

var React = require('react');
var Text = require('./react.text.jsx');
var Select = require('./react.select.jsx');

var Control = React.createClass({
    render: function () {
        if (this.props.options.controlType == "text") {
            return (<Text options={ this.props.options }
                          showError={this.props.showError }
            />);
        }
        else if (this.props.options.controlType == "select") {
            return (<Select options={ this.props.options }
                            showError = { this.props.showError }/>);
        }
    }
});

module.exports = Control;
