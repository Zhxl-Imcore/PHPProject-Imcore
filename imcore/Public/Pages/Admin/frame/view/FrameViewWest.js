/**
 * 主机面，左侧菜单栏
 */
Ext.define('admin.frame.view.FrameViewWest',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.frameviewwest',
    layout: 'accordion',
    items: [{
        xtype: 'treepanel',
        title: '果核动态管理',
        rootVisible: false,
        root: {
            children: [{
                text: '果核动态',
                leaf: true,
                id: 'News-Query'
            }]
        }
    },{
        xtype: 'treepanel',
        title: '用户管理',
        iconCls: 'Group',
        rootVisible: false,
        root: {
            children: [{
                text: '用户信息',
                iconCls: 'User',
                leaf: true,
                id: 'User-Query'
            },{
                text: '权限管理',
                iconCls: 'Usergreen',
                leaf: true,
                id: 'OrgMgr-Role'
            }/*,{
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


