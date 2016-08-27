"use strict"

var React = require('react');
var Text = require('./react.text.jsx');
var Select = require('./react.select.jsx');

var QueryControls = React.createClass({
	render:function(){
		var controls = this.props.data.map(function(item){
			var control = null;
			if(item.controlType == 'text'){
              control =	<Text options = { item } />
            }
            else if(item.controlType == 'select'){
              control = <Select options = { item } />
            }
			return (<div key = { item.id }
						className="form-group col-sm-4">
                        <label className="col-sm-4 control-label">{ item.title }</label>
                        <div className="col-sm-8">
                        	{ control }
                        </div>
                    </div>);
		});
		return (<div>{ controls }</div>);
	}
});

module.exports = QueryControls;