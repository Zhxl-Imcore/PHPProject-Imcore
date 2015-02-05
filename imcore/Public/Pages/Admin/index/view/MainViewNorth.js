/**
 * 管理界面顶部
 */
Ext.define('admin.index.view.MainViewNorth',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.mainviewnorth',
    border: false,
    items: [{
        xtype: 'toolbar',
        border: false,
        frame: false,
        height: '100%',
        items: [
            '<h1 style="color: #555555;">微信拍卖-后台管理系统</h1>',
            '->',
        {   
            id: 'btn-logout',
            text: '退出',
            iconCls: 'Usergo'
        }]
    }],
    
    initComponent:function(){
	this.callParent(arguments);
    }
});


