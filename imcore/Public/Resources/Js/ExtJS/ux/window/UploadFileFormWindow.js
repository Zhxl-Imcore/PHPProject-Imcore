/**
 * 自定义的文件上传表单窗口
 */
Ext.define('Ext.ux.window.UploadFileFormWindow',{
	extend: 'Ext.window.Window',
	alias: 'widget.uploadfileformwindow',
	
	submitUrl: 'undefined',
	
	/**
	 * 在constructor中添加事件
	 * @param {} cfg
	 */
	
	constructor : function(cfg) {
		var self = this;
		
		Ext.ux.window.UploadFileFormWindow.superclass.constructor.call(this, cfg);
		
		self.addEvents('uploaded');
	},
	
	initComponent: function(){
		var self = this;
		
		self.newUploadFileFormPanel();
		self.newWindowButtons();
		
		Ext.apply(self,{
			title: '文件上传',
			autoWidth: true,
			modal: true,
			closeAction: 'destroy',
			layout: 'fit',
			items: self.uploadFileFormPanel,
			buttons: [self.confirmButton, self.cancelButton]
		});
		
		Ext.ux.window.UploadFileFormWindow.superclass.initComponent.call(self);
	},
	
	/**
	 * 创建formPanel
	 */
	newUploadFileFormPanel: function(){
		var self = this;
		
		self.uploadFileFormPanel = Ext.create('Ext.form.FormPanel',{
		   	width: 400,
			frame: true,
			border: false,
			bodyStyle: {
				padding: '10px'
			},
			items: [{
				xtype: 'filefield',
				name: 'file',
				fieldLabel: '文件',
				labelWidth: 50,
				allowBlank: false,
				blankText: '请先选择要上传的文件',
				msgTarget: 'qtip',
				anchor: '100%',
				buttonText: '选择文件...'
			}]
		});
	},
	
	/**
	 * 创建窗口按钮
	 */
	newWindowButtons: function(){
		var self = this;
		
		self.confirmButton = Ext.create('Ext.Button',{
		    text : '上传',
		    handler : self.confirmHandler,
		    scope : self
	    });
	    
		self.cancelButton = Ext.create('Ext.Button',{
		    text : '取消',
		    handler : self.cancelHandler,
		    scope : self
		});
	},
	
	/**
	 * 确定上传
	 */
	confirmHandler: function(button,event){
		var self = this;
		
		var uploadFileForm = self.child('form').getForm();
		if(uploadFileForm.isValid() && self.submitUrl != 'undefined'){
			uploadFileForm.submit({
	            url: self.submitUrl,
	            method: 'POST',
	            waitMsg: '正在上传文件...',
	            success: function(form, action) {
	 				//上传成功后，出发submitted事件
	 				self.fireEvent('uploaded',action.result.datas);
	            	
	                Ext.Msg.alert('提示信息', '文件上传成功!',function(){
	                	self.close();
	                },self);
	            },
	            failure: function(form, action) {
        			Ext.Msg.alert('提示信息', '文件上传失败，请重试!',function(){
        				self.close();
        			},self);
    			}
	        });
		}
	},
	
	/**
	 * 取消
	 */
	cancelHandler: function(button,event){
		var self = this;
		self.close();
	},
	
	/**
	 * 弹出窗口
	 */
	popup: function(){
		var self = this;
		self.uploadFileFormPanel.getForm().reset();
		self.show();
	}
	
});