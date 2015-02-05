
Ext.define('admin.index.view.MainView',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.mainview',
    border: false,
    layout: 'border',
    items: [{
        region: 'north',
        xtype: 'mainviewnorth',
        height: 50,
        frame: true,
        border: false
    },{
        region: 'west',
        xtype: 'mainviewwest',
        width: 200
    },{
        region: 'center',
        xtype: 'mainviewcenter',
        border: false,
        style: {
            marginLeft: '4px'
        }
    }],
    initComponent:function(){
	this.callParent(arguments);
    }
});


