/**
 * 主机面，左侧菜单栏
 */
Ext.define('admin.index.view.MainViewWest',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.mainviewwest',
    layout: 'accordion',
    items: [{
        xtype: 'treepanel',
        title: '商品管理',
        rootVisible: false,
        root: {
            children: [{
                text: '菜单一',
                leaf: true
            },{
                text: '菜单二',
                leaf: true
            }]
        }
    },{
        xtype: 'treepanel',
        title: '组织机构管理',
        iconCls: 'Group',
        rootVisible: false,
        root: {
            children: [{
                text: '用户管理',
                iconCls: 'User',
                leaf: true,
                id: 'OrgMgr-User'
            }/*,{
                text: '角色管理',
                iconCls: 'Usergreen',
                leaf: true,
                id: 'OrgMgr-Role'
            }*//*,{
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


