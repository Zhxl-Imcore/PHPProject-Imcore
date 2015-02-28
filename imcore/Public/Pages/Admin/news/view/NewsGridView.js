/**
 * 果核动态列表
 */
Ext.define('admin.news.view.NewsGridView',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.newsgridview',
	
	initComponent:function(){
		//数据源
    	var newsGridViewStore = Ext.create('admin.news.store.NewsGridViewStore');
		
		Ext.apply(this,{
			title: '果核动态',
		    iconCls: 'New',
		    forceFit: true,
		    closable: true,
		    store: newsGridViewStore,
		    viewConfig: {
		        //在表格中显示斑马线
		        stripeRows: true,
		        //可以复制单元格文字
		        enableTextSelection: true
    		},
		    dockedItems: [{
		        dock: 'top',
		        xtype: 'toolbar',
		        items: [{
		            text: '新建动态',
		            iconCls: 'Bulletadd',
		            action: 'News-createNews'
		        },{
		            text: '编辑动态',
		            iconCls: 'Bulletedit',
		            action: 'News-updateNews'
		        },{
		            text: '删除动态',
		            iconCls: 'Bulletdelete',
		            action: 'News-deleteNews'
		        }/*,{
		            xtype: 'tbspacer',
		            width: 100
		        },{
		            xtype: 'textfield',
		            emptyText: '请输入要查询的账号',
		            width: 220
		        },{
		            xtype: 'tbspacer',
		            width: 5
		        },{
		            xtype: 'button',
		            text: '查询用户',
		            iconCls: 'Userkey'
		        }*/]
		    },{
		    	dock: 'bottom',
		    	xtype: 'pagingtoolbar',
		    	store: newsGridViewStore,
	            displayInfo: true,
	            displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
	            emptyMsg: '没有数据'
		    }],
    		selModel: Ext.create('Ext.selection.CheckboxModel'),
		    columns: [{
		    	xtype: 'rownumberer',
		        text: '编号',
		        sortable: false,
		        width: 40,
		        menuDisabled: true
		    },{
		        text: '标题',
		        dataIndex: 'title',
		        sortable: false,
		        width: 200,
		        menuDisabled: true
		    },{
		        text: '发布人',
		        dataIndex: 'publisher',
		        sortable: false,
		        menuDisabled: true
		    },{
		        text: '发布时间',
		        dataIndex: 'publish_time',
		        sortable: false,
		        menuDisabled: true,
		        renderer: Ext.util.Format.dateRenderer('Y-m-d')
		    },{
		    	text: '是否置顶',
		    	dataIndex: 'is_stick',
		    	sortable: false,
		    	menuDisabled: true,
		    	renderer: function(value, cellmeta, record, rowIndex, columnIndex, store){
		    		return value == 1? '是' : '否';
		    	}
		    },{
		        text: '状态',
		        dataIndex: 'status',
		        sortable: false,
		        menuDisabled: true,
		        renderer: function(value){
		        	return value == 1? '启用' : '禁用';
		        }
		    },{
		        text: '内容',
		        dataIndex: 'content',
		        sortable: false,
		        menuDisabled: true
		    }]
		});
	
		//这里是有先后调用的顺序的
    	admin.news.view.NewsGridView.superclass.initComponent.call(this);
	}
});