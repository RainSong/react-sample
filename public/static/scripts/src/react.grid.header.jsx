"use strict"

var React = require('react');

var GridHeader = React.createClass({
        render: function () {

            var sortColumnName = this.props.sortColumnName;
            var sortOrder = this.props.sortOrder;
            var sortChange = this.props.sortChange;

            var headerColumns = [];
            var index = 0;
            this.props.columns.forEach(function (col) {
                var sortClassName = '';
                if (col.sortable) {
                    sortClassName = "sorting";
                    if (sortColumnName == col.name) {
                        sortClassName += "_" + sortOrder;
                    }
                    headerColumns.push(<th onClick={ sortChange.bind(null, col.name, sortOrder) }
                                           key={ index }
                                           className={ sortClassName }>
                        { col.title }
                    </th>);
                }
                else {
                    headerColumns.push(<th key={ index }>
                        { col.title }
                    </th>);
                }
                index++;
            });

            return (<thead>
            <tr>
                { headerColumns }
            </tr>
            </thead>);

        }
    })
    ;

module.exports = GridHeader;