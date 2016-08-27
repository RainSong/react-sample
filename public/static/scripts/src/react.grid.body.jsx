"use strict"

var React = require('react');
var GridRow = require('./react.grid.row.jsx');

var GridBody = React.createClass({
    render: function () {
        var keyColumn = !this.props.keyColumn ? "id" : this.props.keyColumn;
        var rows = [];
        var columns = this.props.columns;
        var data = this.props.data;
        var currentPage = this.props.currentPage;
        /* the grid data is empty */
        if (!data || data.length == 0) {
            rows.push(<tr key="0"
                          className="odd">
                <td colSpan={ columns.length } className="dataTables_empty">
                    表中数据为空
                </td>
            </tr>);
        }
        else {
            data.forEach(function (rowData) {
                rows.push(<GridRow key={ rowData[keyColumn] } rowData={rowData} columns={ columns }/>);
            });
        }
        return (<tbody>{ rows }</tbody>);
    }
});

module.exports = GridBody;