Ext.define('admin.frame.view.FrameView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.frameview',
	border : false,
	layout : 'border',
	items : [ {
		region : 'north',
		xtype : 'frameviewnorth',
		height : 50,
		frame : true,
		border : false
	}, {
		region : 'west',
		xtype : 'frameviewwest',
		width : 200
	}, {
		region : 'center',
		xtype : 'frameviewcenter',
		border : false,
		style : {
			marginLeft : '4px'
		}
	} ],
	initComponent : function() {
		this.callParent(arguments);
	}
});
