/**
 * 用户管理界面
 */
Ext.define('admin.orgmgr.view.UserMgrView',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.usermgrview',
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
        menuDisabled: true
    },{
        text: '最近登录时间',
        dataIndex: 'logintime',
        sortable: false,
        menuDisabled: true,
        renderer: Ext.util.Format.dateRenderer('Y年m月d日')
    },{
        text: '最近登录IP',
        dataIndex: 'loginip',
        sortable: false,
        menuDisabled: true
    }],
    initComponent:function(){
	this.callParent(arguments);
    }
});


