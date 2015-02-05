Ext.onReady(function(){
    
    Ext.Loader.setConfig({enabled:true});
    
    //提示信息
    Ext.QuickTips.init();
    
    Ext.application({
        requires: ['Ext.container.Viewport'],
        name: 'admin',
        appFolder: PUBLIC + '/Pages/Admin',
        launch: function(){
            Ext.create('Ext.container.Viewport',{
                layout: 'fit',
                items: [{
                    xtype: 'mainview'
                }]
            });
        },
        controllers: [
            'admin.index.controller.MainController'
        ]
    });
	
});


