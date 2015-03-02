/**
 * 主机面，左侧菜单栏
 */
Ext.define('admin.frame.view.FrameViewWest',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.frameviewwest',
    layout: 'accordion',
    items: [{
        xtype: 'treepanel',
        title: '内容管理',
        rootVisible: false,
        root: {
            children: [{
                text: '果核动态',
                leaf: true,
                iconCls: 'New',
                itemId: 'News-Query'
            },{
            	text: '讲师团队',
            	leaf: true,
            	iconCls: 'User',
            	itemId: 'Teacher-Query'
            }]
        }
    },{
        xtype: 'treepanel',
        title: '系统管理',
        iconCls: 'Group',
        rootVisible: false,
        root: {
            children: [{
                text: '用户管理',
                iconCls: 'User',
                leaf: true,
                itemId: 'User-Query'
            }/*,{
                text: '权限管理',
                iconCls: 'Usergreen',
                leaf: true,
                ItemId: 'OrgMgr-Role'
            },{
                text: '权限管理',
                iconCls: 'Tux',
                leaf: true,
                id: 'OrgMgr-Auth'
            }*/]
        }
    }],
    
    initComponent:function(){
    	this.callParent(arguments);
    }
});


