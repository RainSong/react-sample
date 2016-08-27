"use strict"

var React  = require('react');

var GridCell = React.createClass({
        render:function(){
            var columnConfig = this.props.columnConfig;
            var rowData = this.props.rowData;
            var cellValue   = rowData[columnConfig.name];
            if(columnConfig.render){
                cellValue = columnConfig.render(rowData,cellValue);
            }
            return (<td>{cellValue}</td>);    
        }
   });


module.exports =  GridCell;