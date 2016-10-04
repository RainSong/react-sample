"use strict"

var React = require('react');

var PagerButton = React.createClass({
    render: function () {
        var link;
        if (this.props.onPageChanged) {
            link = <a href='javascript:void(0);'
                      onClick={ this.props.onPageChanged.bind(null, this.props.targetPageIndex) }>
                { this.props.title }
            </a>
        } else {
            link = <a href='javascript:void(0);'>
                { this.props.title }
            </a>
        }
        return (
            <li className={ (!this.props.className || !this.props.className) ? "paginate_button" : this.props.className }>
                { link }
            </li>);
    }
});

module.exports = PagerButton;