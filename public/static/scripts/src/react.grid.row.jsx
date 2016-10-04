"use strict"

var React = require('react');
var GridCell = require('./react.grid.cell.jsx');

var GridRow = React.createClass({
    getInitialState: function () {
        return {
            selected: false
        }
    },
    onClickHandle: function (e) {
        e.preventDefault();
        this.setState({
            selected: !this.state.selected
        })
    },
    render: function () {
        var cells = [];
        var rowData = this.props.rowData;
        var className = "";
        if (this.props.rowIndex % 2 == 0) {
            className = "even";
        }
        else if (this.props.rowIndex % 2 > 0) {
            className = "odd";
        }
        if (this.state.selected) {
            className += " selected";
        }
        this.props.columns.forEach(function (columnConfig) {
            cells.push(<GridCell key={ columnConfig.name }
                                 rowData={ rowData }
                                 columnConfig={ columnConfig }/>)
        });
        return (<tr data-id={ rowData[this.props.keyColumn] }
                    onClick={ this.onClickHandle }
                    className={className}>{ cells }</tr>);
    }
});

module.exports = GridRow;
