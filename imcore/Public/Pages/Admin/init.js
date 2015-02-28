Ext.onReady(function(){
    Ext.application({
        requires: ['Ext.container.Viewport'],
        name: 'admin',
        appFolder: PUBLIC + '/Pages/Admin',
        launch: function(){
            Ext.create('Ext.container.Viewport',{
                layout: 'fit',
                items: [{
                    xtype: 'frameview'
                }]
            });
        },
        controllers: [
            'admin.frame.controller.FrameController'
        ]
    });
	
});


