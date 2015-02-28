/**
 * 管理主界面 中间部分
 */
Ext.define('admin.frame.view.FrameViewCenter',{
    extend: 'Ext.tab.Panel',
    alias: 'widget.frameviewcenter',
    border: false,
    activeTab: 0,
    items: [{
        title: '欢迎',
        iconCls: 'World',
        html: '<h1>欢迎主界面</h1>'
    }],
    
    
    initComponent:function(){
		this.callParent(arguments);
    }
});


