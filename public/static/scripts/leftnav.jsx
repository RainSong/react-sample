var navs = [
	{
		id:'100',
		title:'系统管理',
		items:[
				{
					id:'101',
					targetUrl:'/admin/module/list',
					title:'模块管理'
				},
				{
					id:'102',
					targetUrl:'/admin/user',
					title:'用户管理'
				},
				{
					id:'103',
					targetUrl:'/admin/log',
					title:'日志信息'
				},
				{
					id:'104',
					targetUrl:'/admin/const',
					title:'常量管理'
				},
			  ]
	}
];

var LeftNavItems = React.createClass({
	render:function(){
		var childItems = this.props.data.map(function(item){
			return (<li key={ item.id } id="menu-admin-website">
	                	<a href={ item.targetUrl }>
	                		<i className="fa fa-circle-o"></i> 
	                		{ item.title }
	                	</a> 
	                </li>); 
		});
			
		return ( <ul className="treeview-menu">
					{ childItems }
				 </ul>);
	}
});
var LeftNavGroup = React.createClass({
	render:function(){
		var navGroups = this.props.data.map(function(navGroup){
			return (<li key = { navGroup.id } className="treeview" id="menu-admin-content">
	                    <a href="#">
	                        <i className="fa fa-dashboard"></i> 
	                        <span>{ navGroup.title }</span> 
	                        <i className="fa fa-angle-left pull-right"></i>
	                    </a>
	                    <LeftNavItems data = { navGroup.items } />
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
	render:function(){
		return (<section className="sidebar">
            		<LeftNavGroup data = { this.props.data } />
        		</section>);
	}
});

ReactDOM.render(<LeftNav data={ navs }/>,
document.getElementById('leftnav'));