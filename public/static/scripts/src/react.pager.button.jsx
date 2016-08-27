"use strict"

var React = require('react');

var PagerButton = React.createClass({
    render:function(){
        return(<li className = { (!this.props.className || !this.props.className) ? "paginate_button" : this.props.className } >
                    <a href='script:;' onClick={ this.props.onPageChanged? this.props.onPageChanged.bind(null,this.props.targetPageIndex) :void(0) }>
                        { this.props.title }
                    </a>
                </li>);
    }
});

module.exports = PagerButton;