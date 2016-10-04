"use strict"
var React = require('react')

var LeftNavItem = React.createClass({
    render: function () {
        return (<li id={"left-nav-" + this.props.code}>
            <a href={ this.props.url }>
                <i className="fa fa-circle-o"></i>
                { this.props.name }
            </a>
        </li>);
    }
});
var LeftNavItems = React.createClass({
    render: function () {
        var childItems = [];
        var index = 0;
        this.props.data.forEach(function (item) {
            childItems.push(<LeftNavItem key={ index++ }
                                         code={ item.code }
                                         url={ item.url }
                                         name={item.name }/>);
        });

        return ( <ul className="treeview-menu">
            { childItems }
        </ul>);
    }
});
var LeftNavGroup = React.createClass({
    render: function () {
        var index = 0;
        var navGroups = [];
        this.props.data.forEach(function (item) {
            navGroups.push(<li key={ index++ }
                               className="treeview"
                               id={"left-nav-group-" + item.code}>
                    <a href="#">
                        <i className="fa fa-dashboard"></i>
                        <span>{ item.name }</span>
                        <i className="fa fa-angle-left pull-right"></i>
                    </a>
                    <LeftNavItems data={ item.sub_items }/>
                </li>
            );
        });
        return (<ul className="sidebar-menu">
                {  navGroups }
            </ul>
        );
    }
});

var LeftNav = React.createClass({
    getInitialState: function () {
        return {
            data: []
        };
    },
    componentDidMount: function () {
        this.populateData();
    },
    /* function for populate data */
    populateData: function () {
        var params = {
            _token: _globalObj._token
        }

        $.ajax({
            url: this.props.dataUrl,
            type: 'POST',
            data: params,
            success: function (data) {
                if (this.isMounted()) {
                    if (data.status == 1)
                        this.setState({data: data.message});
                }
            }.bind(this),
            error: function (err) {
                console.error(err);
            }.bind(this)
        });
    },
    render: function () {
        return (<section className="sidebar">
            <LeftNavGroup data={ this.state.data }/>
        </section>);
    }
});

ReactDOM.render(<LeftNav dataUrl={ "/dataservice/nav/left" }/>,
    document.getElementById('leftnav'));