/**
 * 讲师管理界面
 */
Ext.define('admin.teacher.view.TeacherGridView',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.teachergridview',
	
	initComponent: function(){
		
		//数据源
    	var teacherGridViewStore = Ext.create('admin.teacher.store.TeacherGridViewStore');
		
		Ext.apply(this,{
			title: '讲师团队',
		    iconCls: 'User',
		    forceFit: true,
		    closable: true,
		    store: teacherGridViewStore,
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
		        	text: '查看讲师',
		        	iconCls: 'Bulletget',
		        	action: 'Teacher-readTeacher'
		        },{
		            text: '新建讲师',
		            iconCls: 'Bulletadd',
		            action: 'Teacher-createTeacher'
		        },{
		            text: '编辑讲师',
		            iconCls: 'Bulletedit',
		            action: 'Teacher-updateTeacher'
		        },{
		            text: '删除讲师',
		            iconCls: 'Bulletdelete',
		            action: 'Teacher-deleteTeacher'
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
		    	store: teacherGridViewStore,
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
		        text: '讲师称谓',
		        dataIndex: 'title',
		        sortable: false,
		        width: 100,
		        menuDisabled: true
		    },{
		        text: '讲师职位',
		        dataIndex: 'job',
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
		
		admin.teacher.view.TeacherGridView.superclass.initComponent.call(this);
	}
});