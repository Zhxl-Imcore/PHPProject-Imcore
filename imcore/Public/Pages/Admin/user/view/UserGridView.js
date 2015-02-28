/**
 * 用户管理界面
 */
Ext.define('admin.user.view.UserGridView',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.usergridview',
    title: '用户管理',
    iconCls: 'User',
    forceFit: true,
    closable: true,
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
            text: '新建用户',
            iconCls: 'Useradd',
            action: 'User-addUser'
        },{
            text: '编辑用户',
            iconCls: 'Useredit',
            action: 'User-updateUser'
        },{
            text: '禁用用户',
            iconCls: 'Userdelete',
            action: 'User-disableUser'
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
    }],
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    columns: [{
        text: '编号',
        dataIndex: 'id',
        width: 50,
        sortable: false,
        menuDisabled: true
    },{
        text: '账号',
        dataIndex: 'account',
        sortable: false,
        menuDisabled: true
    },{
        text: '姓名',
        dataIndex: 'name',
        sortable: false,
        menuDisabled: true
    },{
        text: '创建时间',
        dataIndex: 'createtime',
        sortable: false,
        menuDisabled: true,
        renderer: Ext.util.Format.dateRenderer('Y年m月d日')
    },{
        text: '状态',
        dataIndex: 'status',
        width: 30,
        sortable: false,
        menuDisabled: true,
        renderer: function(value){
        	return value == 1? '启用' : '禁用';
        }
    },{
        text: '最近登录时间',
        dataIndex: 'last_login_time',
        sortable: false,
        menuDisabled: true,
        renderer: Ext.util.Format.dateRenderer('Y年m月d日')
    },{
        text: '最近登录IP',
        dataIndex: 'last_login_ip',
        sortable: false,
        menuDisabled: true
    }],
    
    initComponent:function(){
    	var self = this;
    	
    	//数据源
    	var userGridViewStore = Ext.create('admin.user.store.UserGridViewStore');
    	
    	//分页条目
    	var pagingToolBar = Ext.create('Ext.toolbar.Paging',{
            store: userGridViewStore,
            displayInfo: true,
            displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
            emptyMsg: '没有数据'
    	});
    	
    	//降属性存入
    	Ext.apply(this,{
    		store: userGridViewStore,
    		bbar: pagingToolBar
    	});
    	
    	//这里是有先后调用的顺序的
    	this.callParent(arguments);
    }
});


