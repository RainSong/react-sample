"use strict"

var React = require('react');

var GridHeader = require('./react.grid.header.jsx');
var GridBody = require('./react.grid.body.jsx');
var Pager = require('./react.pager.jsx');

var Grid = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            total: 0,
            totalPage: 0,
            currentPage: 1,
            sortColumnName: '',
            sortOrder: ''
        }
    },
    componentDidMount: function () {
        this.populateData();
    },
    /* function for populate data */
    populateData: function () {
        var params = {
            pageSize: this.props.pageSize,
            currentPage: this.state.currentPage,
            _token: _globalObj._token
        }
        if (this.state.sortColumnName) {
            params.sortColumnName = this.state.sortColumnName;
        }
        if (this.state.sortOrder) {
            params.sortOrder = this.state.sortOrder;
        }

        $.ajax({
            url: this.props.options.dataUrl,
            type: 'POST',
            data: params,
            // headers: {
            //     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            // },
            success: function (data) {
                if (this.isMounted()) {
                    this.setState(data);
                }
            }.bind(this),
            error: function (err) {
                alert('Error');
            }.bind(this)
        });
    },
    /* function for pagination */
    pageChanged: function (pageNumber, e) {
        e.preventDefault();
        this.state.currentPage = pageNumber;
        this.populateData();
    },
    /* function for sorting */
    sortChanged: function (sortColumnName, order, e) {
        debugger
        e.preventDefault();
        this.state.sortColumnName = sortColumnName;
        this.state.currentPage = 1;
        this.state.sortOrder = order.toString().toLowerCase() == 'asc' ? 'desc' : 'asc';
        this.populateData();
    },
    /* render */
    render: function () {
        return (<div id="grid_wrapper"
                     className="dataTables_wrapper form-inline dt-bootstrap no-footer">
            <div className="row">
                <div className="col-sm-6"></div>
                <div className="col-sm-6"></div>
            </div>

            <div className="row">
                <div className="col-sm-12">
                    <table className="table table-striped table-bordered dataTable no-footer">
                        <GridHeader key={ 0 }
                                    columns={ this.props.options.columns }
                                    sortColumnName={this.state.sortColumnName }
                                    sortOrder={ this.state.sortOrder }
                                    sortChange={ this.sortChanged }/>

                        <GridBody keyColumn={ this.props.options.keyColumn }
                                  columns={ this.props.options.columns }
                                  data={ this.state.data }/>

                    </table>
                    <div id="grid_processing"
                         className="dataTables_processing panel panel-default"
                         style={ {display: "none"} }>
                        处理中...
                    </div>
                </div>
            </div>

            <Pager total={ this.state.total }
                   pageCount={ this.state.totalPage }
                   currentPage={ this.state.currentPage }
                   pageSize={ this.props.options.pageSize }
                   onChanged={ this.state.pageChanged }/>

        </div>);
    }
});

module.exports = Grid;