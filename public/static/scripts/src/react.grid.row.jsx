"use strict"

var React = require('react');
var GridCell = require('./react.grid.cell.jsx');

var GridRow = React.createClass({
        render : function(){
            var cells = [];
            var rowData = this.props.rowData;
            this.props.columns.forEach(function(columnConfig){
               cells.push(<GridCell key = { rowData.EmployeeID + '-' + columnConfig.name }
                                    rowData = { rowData }
                                    columnConfig = { columnConfig }/>)
            });
            return (<tr>{ cells }</tr>);
        }
    });

module.exports = GridRow;
