Ext.define('Ext.ux.FormWindow',{
	extend: 'Ext.window.Window',
	initComponent: function(){
		Ext.apply(this,{
			alias: 'widget.formwindow',
			resizable: false,
			autoScroll: true,
			modal: true,
			closable: false,
			layout: 'fit',
			buttons: [
				Ext.create('Ext.button.Button',{
					text: self.confirmButtonText? self.confirmButtonText : '确定',
					handler: self.handlerConfirm,
					scope: self
				}),
				Ext.create('Ext.button.Button',{
					text: '取消',
					handler: self.handlerCancel,
					scope: self
				})
			],
			items: [{
				xtype: 'form',
	            layout: 'anchor',
                bodyStyle: {
                    'padding': '15px'
                },
                defaults: {
                    anchor: '98%',
                    labelWidth: 70,
                    labelAlign: 'right'
                },
                //默认表单域类型
                defaultType: 'textfield',
                items: self.bindFormContainer()
			}]
		});
		
		this.callParent(arguments);
	},
	
	
	/**
	 * 点击确认事件,提交表单
	 */
	handlerConfirm: function(button,event){
		
		
	},
	
	/**
	 * 点击取消
	 */
	handlerCancel: function(){
		alert('ok');
		var self = this;
		
		self.hide();
	}
	
});