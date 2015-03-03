/**
 * 讲师管理界面
 */
Ext.define('admin.advertisement.view.AdvSlideShowGridView',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.advslideshowgridview',
	
	initComponent: function(){
		
		//数据源
    	var advSlideShowGridViewStore = Ext.create('admin.advertisement.store.AdvSlideShowGridViewStore');
		
		Ext.apply(this,{
			title: '广告页幻灯片',
		    iconCls: 'New',
		    forceFit: true,
		    closable: true,
		    store: advSlideShowGridViewStore,
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
		        	text: '查看幻灯片',
		        	iconCls: 'Bulletget',
		        	action: 'AdvSlideShow-readAdvSlideShow'
		        },{
		            text: '新建幻灯片',
		            iconCls: 'Bulletadd',
		            action: 'AdvSlideShow-createAdvSlideShow'
		        },{
		            text: '编辑幻灯片',
		            iconCls: 'Bulletedit',
		            action: 'AdvSlideShow-updateAdvSlideShow'
		        },{
		            text: '删除幻灯片',
		            iconCls: 'Bulletdelete',
		            action: 'AdvSlideShow-deleteAdvSlideShow'
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
		    	store: advSlideShowGridViewStore,
	            displayInfo: true,
	            displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
	            emptyMsg: '没有数据'
		    }],
    		selModel: Ext.create('Ext.selection.CheckboxModel'),
		    columns: [{
		    	xtype: 'rownumberer',
		        text: '编号',
		        sortable: false,
		        width: 60,
		        menuDisabled: true
		    },{
		        text: '幻灯片标题',
		        dataIndex: 'title',
		        sortable: false,
		        width: 100,
		        menuDisabled: true
		    },{
		        text: '超级链接',
		        dataIndex: 'hyperlink',
		        sortable: false,
		        menuDisabled: true
		    },{
		    	text: '显示顺序',
		        dataIndex: 'order',
		        sortable: false,
		        menuDisabled: true
		    },{
		        text: '发布状态',
		        dataIndex: 'status',
		        sortable: false,
		        menuDisabled: true,
		        renderer: function(value){
		        	return value == 1? '已发布' : '未发布';
		        }
		    },{
		        text: '发布人',
		        dataIndex: 'user.account',
		        sortable: false,
		        menuDisabled: true
		    },{
		        text: '发布时间',
		        dataIndex: 'create_time',
		        sortable: false,
		        menuDisabled: true,
		        renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
		    },{
		    	text: '更新时间',
		        dataIndex: 'update_time',
		        sortable: false,
		        menuDisabled: true,
		        renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
		    }]
		});
		
		admin.advertisement.view.AdvSlideShowGridView.superclass.initComponent.call(this);
	}
});