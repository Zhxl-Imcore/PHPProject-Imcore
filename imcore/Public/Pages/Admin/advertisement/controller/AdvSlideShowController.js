/**
 * 广告页幻灯片
 */
Ext.define('admin.advertisement.controller.AdvSlideShowController',{
	extend: 'Ext.app.Controller',
	
	views: [
		'admin.advertisement.view.AdvSlideShowGridView'
	],
	
	models: [
		'admin.advertisement.model.AdvSlideShowModel'
	],
	
	stores: [
		'admin.advertisement.store.AdvSlideShowGridViewStore'
	],
	
	refs: [{
    	ref: 'frameViewCenter',
    	selector: 'frameviewcenter'
    },{
    	ref: 'readAdvSlideShowFormWindow',
    	selector: 'window[itemId=readAdvSlideShowFormWindow]'
    },{
    	ref: 'createAdvSlideShowFormWindow',
    	selector: 'window[itemId=createAdvSlideShowFormWindow]'
    },{
    	ref: 'updateAdvSlideShowFormWindow',
    	selector: 'window[itemId=updateAdvSlideShowFormWindow]'
    }],
    
    /**
	 * 初始化界面
	 */
	initViews: function(){
		var self = this;
		
		var advSlideShowGridView = self.getFrameViewCenter().child('advslideshowgridview');
		if(!advSlideShowGridView){
			advSlideShowGridView = Ext.widget('advslideshowgridview');
        	self.getFrameViewCenter().add(advSlideShowGridView);
        	advSlideShowGridView.store.load();
		}
		self.getFrameViewCenter().setActiveTab(advSlideShowGridView);
	},
	
	/**
	 * 初始化事件
	 */
	init: function(){
		var self = this;
		this.control({
			'advslideshowgridview toolbar button[action=AdvSlideShow-readAdvSlideShow]': {
				'click': {
        			fn: self.readAdvSlideShowHandler,
        			scope: self
        		}
			},
			'advslideshowgridview toolbar button[action=AdvSlideShow-createAdvSlideShow]': {
				'click': {
        			fn: self.createAdvSlideShowHandler,
        			scope: self
        		}
			},
			'advslideshowgridview toolbar button[action=AdvSlideShow-updateAdvSlideShow]': {
				'click': {
        			fn: self.updateAdvSlideShowHandler,
        			scope: self
        		}
			},
			'advslideshowgridview toolbar button[action=AdvSlideShow-deleteAdvSlideShow]': {
				'click': {
        			fn: self.deleteAdvSlideShowHandler,
        			scope: self
        		}
			}
		});
	},
	
	readAdvSlideShowHandler: function(button,event){
		var self = this;
		
		var selectedRecords = self.getFrameViewCenter().child('advslideshowgridview').getSelectionModel().getSelection();
		if(selectedRecords.length < 1){
			Ext.Msg.alert('信息提示','请先选择一个幻灯片！');
			return;
		}
		
		if(selectedRecords.length > 1){
			Ext.Msg.alert('信息提示','只能选择一个幻灯片！');
			return;
		}
		
		var advSlideShowModel = selectedRecords[0];
		
		//从界面上获取Window
        var readAdvSlideShowFormWindow = self.getReadAdvSlideShowFormWindow();
        if(!readAdvSlideShowFormWindow){
        	readAdvSlideShowFormWindow = self.newReadAdvSlideShowFormWindow();
        }
		
		//表单设值
		readAdvSlideShowFormWindow.child('form').getForm().loadRecord(advSlideShowModel);
		
		readAdvSlideShowFormWindow.show();
		
		//显示图片(只有在显示之后，panel才有body)
		readAdvSlideShowFormWindow.query('panel[itemId=advSlideShowPhotoPanel]')[0].body.update('<img style="width: 100%; height: 100%;" src="' + advSlideShowModel.get('photo_path') + '"/>');
	},
	
	newReadAdvSlideShowFormWindow: function(){
		var self = this;
		
		return Ext.create('Ext.window.Window',{
			itemId: 'readAdvSlideShowFormWindow',
	        width: 1026,
	        height: 600,
	        title: '查看幻灯片',
	        layout: 'fit',
	        resizable: false,
	        closable: true,
	        closeAction: 'hide',
	        constrain: true,
	        modal: true,
	        items: [{
	            xtype: 'form',
	            frame: true,
	            border: false,
	            autoScroll: true,
	            layout: 'anchor',
	            bodyStyle: {
	                'padding': '10px'
	            },
	            defaults: {
	                anchor: '100%',
	                labelWidth: 70,
	                labelAlign: 'right'
	            },
	            //默认表单域类型
	            defaultType: 'textfield',
	            items: [{
	            	xtype: 'hidden',
	            	name: 'photo_path'
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '幻灯片标题',
	            	items: [{
	            		xtype: 'textfield',
	            		name: 'title',
	            		allowBlank: false,
	            		readOnly: true
	            	}]
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '超级链接',
	            	items: [{
	            		xtype: 'textfield',
	            		name: 'hyperlink',
	            		allowBlank: false,
	            		readOnly: true
	            	}]
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '显示顺序',
	            	items: [{
	            		xtype: 'numberfield',
	            		name: 'order',
	            		allowNegative: false,
	            		allowDecimals: false,
	            		allowBlank: false,
	            		readOnly: true
	            	}]
	            },{
	            	width: 960,
	            	height: 386,
            		layout: 'anchor',
	            	xtype: 'fieldset',
	            	title: '幻灯片图片',
	            	items: [{
	            		xtype: 'panel',
            			itemId: 'advSlideShowPhotoPanel',
            			anchor: '0 -40',
            			html: '<div style="width: 100%; height: 100%; font-size:18px; text-align: center; line-height: 386px;">还未上传图片(960*325)</div>'
	            	},{
	            		xtype: 'panel',
            			anchor: '0',
            			style: {
            				marginTop: '5px'
            			},
            			bodyStyle: {
            				padding: '0px 10px'
            			},
            			layout: 'fit',
            			frame: true,
            			items: [{
            				xtype: 'button',
            				disabled: true,
            				text: '上传图片',
            				itemId: 'createAdvSlideShow',
            				handler: self.uploadAdvSlideShowPhotoHandler,
            				scope: self
            			}]
	            	}]
	            	
	            },
	            Ext.create('Ext.ux.combo.LocalComboBox',{
    				fieldLabel: '是否发布',
        			name: 'status',
        			anchor: '30%',
        			textValueItems: [
        				['是','1'],
        				['否','0']
        			],
        			defaultItemValue: '1',
        			readOnly: true
    			})]
	        }],
	        buttons: [{
	            text: '确定',
	            handler: self.readAdvSlideShowConfirmHandler,
	            scope: self
	        }],
	        listeners: {
	        	'beforehide': function(window,opts){
	        		window.query('panel[itemId=advSlideShowPhotoPanel]')[0].body.update('<div style="width: 100%; height: 100%; font-size:20px; text-align: center; line-height: 260px;">还未上传图片(960*325)</div>');
	        		window.child('form').getForm().reset();
	        	}
	        }
		});
	},
	
	readAdvSlideShowConfirmHandler: function(button,event){
		var self = this;
		self.getReadAdvSlideShowFormWindow().hide();
	},
	
	createAdvSlideShowHandler: function(button,event){
		var self = this;
		
		//从界面上获取Window
        var createAdvSlideShowFormWindow = self.getCreateAdvSlideShowFormWindow();
        if(!createAdvSlideShowFormWindow){
        	createAdvSlideShowFormWindow = self.newCreateAdvSlideShowFormWindow();
        }
        
        createAdvSlideShowFormWindow.show();
	},
	
	newCreateAdvSlideShowFormWindow: function(){
		var self = this;
		
		return Ext.create('Ext.window.Window',{
			itemId: 'createAdvSlideShowFormWindow',
	        width: 1026,
	        height: 600,
	        title: '新建幻灯片',
	        layout: 'fit',
	        resizable: false,
	        closable: true,
	        closeAction: 'hide',
	        constrain: true,
	        modal: true,
	        items: [{
	            xtype: 'form',
	            frame: true,
	            border: false,
	            autoScroll: true,
	            layout: 'anchor',
	            bodyStyle: {
	                'padding': '10px'
	            },
	            defaults: {
	                anchor: '100%',
	                labelWidth: 70,
	                labelAlign: 'right'
	            },
	            //默认表单域类型
	            defaultType: 'textfield',
	            items: [{
	            	xtype: 'hidden',
	            	name: 'photo_path'
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '幻灯片标题',
	            	items: [{
	            		xtype: 'textfield',
	            		name: 'title',
	            		allowBlank: false
	            	}]
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '超级链接',
	            	items: [{
	            		xtype: 'textfield',
	            		name: 'hyperlink',
	            		value: '#',
	            		allowBlank: false
	            	}]
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '显示顺序',
	            	items: [{
	            		xtype: 'numberfield',
	            		name: 'order',
	            		allowNegative: false,
	            		allowDecimals: false,
	            		allowBlank: false
	            	}]
	            },{
	            	width: 960,
	            	height: 386,
            		layout: 'anchor',
	            	xtype: 'fieldset',
	            	title: '幻灯片图片',
	            	items: [{
	            		xtype: 'panel',
            			itemId: 'advSlideShowPhotoPanel',
            			anchor: '0 -40',
            			html: '<div style="width: 100%; height: 100%; font-size:18px; text-align: center; line-height: 386px;">还未上传图片(960*325)</div>'
	            	},{
	            		xtype: 'panel',
            			anchor: '0',
            			style: {
            				marginTop: '5px'
            			},
            			bodyStyle: {
            				padding: '0px 10px'
            			},
            			layout: 'fit',
            			frame: true,
            			items: [{
            				xtype: 'button',
            				text: '上传图片',
            				itemId: 'createAdvSlideShow',
            				handler: self.uploadAdvSlideShowPhotoHandler,
            				scope: self
            			}]
	            	}]
	            	
	            },
	            Ext.create('Ext.ux.combo.LocalComboBox',{
    				fieldLabel: '是否发布',
        			name: 'status',
        			anchor: '30%',
        			textValueItems: [
        				['是','1'],
        				['否','0']
        			],
        			defaultItemValue: '1' 
    			})]
	        }],
	        buttons: [{
	            text: '保存',
	            handler: self.createAdvSlideShowConfirmHandler,
	            scope: self
	        },{
	            text: '取消',
	            handler: self.createAdvSlideShowCancelHandler,
	            scope: self
	        }],
	        listeners: {
	        	'beforehide': function(window,opts){
	        		window.query('panel[itemId=advSlideShowPhotoPanel]')[0].body.update('<div style="width: 100%; height: 100%; font-size:20px; text-align: center; line-height: 260px;">还未上传图片(960*325)</div>');
	        		window.child('form').getForm().reset();
	        	}
	        }
		});
	},
	
	createAdvSlideShowConfirmHandler: function(button,event){
		var self = this;
		
		var createAdvSlideShowFormWindow = self.getCreateAdvSlideShowFormWindow();
		
		var createAdvSlideShowForm = createAdvSlideShowFormWindow.child('form').getForm();
		if(createAdvSlideShowForm.findField('photo_path').getValue() == ''){
			Ext.Msg.alert('信息提示','请先上传讲师照片！');
			return;
		}
		
		if(createAdvSlideShowForm.isValid()){
			createAdvSlideShowForm.submit({
	            url: PATH_ADVERTISEMENT_SLIDESHOW_CREATE,
	            method: 'POST',
	            waitMsg: '服务器正在处理...',
	            success: function(form, action) {
	                Ext.Msg.alert('提示信息', '幻灯片创建成功!',function(){
	                	createAdvSlideShowFormWindow.hide();
	                	self.getFrameViewCenter().child('advslideshowgridview').store.load();
	                },self);
	            },
	            failure: function(form, action) {
        			Ext.Msg.alert('提示信息', '创建失败，请重试!',function(){
        				createAdvSlideShowFormWindow.hide();
        			},self);
    			}
	        });
		}
	},
	
	createAdvSlideShowCancelHandler: function(button,event){
		var self = this;
		self.getCreateAdvSlideShowFormWindow().hide();
	},
	
	updateAdvSlideShowHandler: function(button,event){
		var self = this;
		
		var selectedRecords = self.getFrameViewCenter().child('advslideshowgridview').getSelectionModel().getSelection();
		if(selectedRecords.length < 1){
			Ext.Msg.alert('信息提示','请先选择一个幻灯片！');
			return;
		}
		
		if(selectedRecords.length > 1){
			Ext.Msg.alert('信息提示','只能选择一个幻灯片！');
			return;
		}
		
		var advSlideShowModel = selectedRecords[0];
		
		//从界面上获取Window
        var updateAdvSlideShowFormWindow = self.getUpdateAdvSlideShowFormWindow();
        if(!updateAdvSlideShowFormWindow){
        	updateAdvSlideShowFormWindow = self.newUpdateAdvSlideShowFormWindow();
        }
        
       //表单设值
		updateAdvSlideShowFormWindow.child('form').getForm().loadRecord(advSlideShowModel);
		
		updateAdvSlideShowFormWindow.show();
		
		//显示图片(只有在显示之后，panel才有body)
		updateAdvSlideShowFormWindow.query('panel[itemId=advSlideShowPhotoPanel]')[0].body.update('<img style="width: 100%; height: 100%;" src="' + advSlideShowModel.get('photo_path') + '"/>');
	},
	
	newUpdateAdvSlideShowFormWindow: function(){
		var self = this;
		
		return Ext.create('Ext.window.Window',{
			itemId: 'updateAdvSlideShowFormWindow',
	        width: 1026,
	        height: 600,
	        title: '编辑幻灯片',
	        layout: 'fit',
	        resizable: false,
	        closable: true,
	        closeAction: 'hide',
	        constrain: true,
	        modal: true,
	        items: [{
	            xtype: 'form',
	            frame: true,
	            border: false,
	            autoScroll: true,
	            layout: 'anchor',
	            bodyStyle: {
	                'padding': '10px'
	            },
	            defaults: {
	                anchor: '100%',
	                labelWidth: 70,
	                labelAlign: 'right'
	            },
	            //默认表单域类型
	            defaultType: 'textfield',
	            items: [{
	            	xtype: 'hidden',
	            	name: 'id'
	            },{
	            	xtype: 'hidden',
	            	name: 'photo_path'
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '幻灯片标题',
	            	items: [{
	            		xtype: 'textfield',
	            		name: 'title',
	            		allowBlank: false
	            	}]
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '超级链接',
	            	items: [{
	            		xtype: 'textfield',
	            		name: 'hyperlink',
	            		allowBlank: false
	            	}]
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '显示顺序',
	            	items: [{
	            		xtype: 'numberfield',
	            		name: 'order',
	            		allowNegative: false,
	            		allowDecimals: false,
	            		allowBlank: false
	            	}]
	            },{
	            	width: 960,
	            	height: 386,
            		layout: 'anchor',
	            	xtype: 'fieldset',
	            	title: '幻灯片图片',
	            	items: [{
	            		xtype: 'panel',
            			itemId: 'advSlideShowPhotoPanel',
            			anchor: '0 -40',
            			html: '<div style="width: 100%; height: 100%; font-size:18px; text-align: center; line-height: 386px;">还未上传图片(960*325)</div>'
	            	},{
	            		xtype: 'panel',
            			anchor: '0',
            			style: {
            				marginTop: '5px'
            			},
            			bodyStyle: {
            				padding: '0px 10px'
            			},
            			layout: 'fit',
            			frame: true,
            			items: [{
            				xtype: 'button',
            				text: '上传图片',
            				itemId: 'updateAdvSlideShow',
            				handler: self.uploadAdvSlideShowPhotoHandler,
            				scope: self
            			}]
	            	}]
	            	
	            },
	            Ext.create('Ext.ux.combo.LocalComboBox',{
    				fieldLabel: '是否发布',
        			name: 'status',
        			anchor: '30%',
        			textValueItems: [
        				['是','1'],
        				['否','0']
        			],
        			defaultItemValue: '1' 
    			})]
	        }],
	        buttons: [{
	            text: '保存',
	            handler: self.updateAdvSlideShowConfirmHandler,
	            scope: self
	        },{
	            text: '取消',
	            handler: self.updateAdvSlideShowCancelHandler,
	            scope: self
	        }],
	        listeners: {
	        	'beforehide': function(window,opts){
	        		window.query('panel[itemId=advSlideShowPhotoPanel]')[0].body.update('<div style="width: 100%; height: 100%; font-size:20px; text-align: center; line-height: 260px;">还未上传图片(960*325)</div>');
	        		window.child('form').getForm().reset();
	        	}
	        }
		});
	},
	
	updateAdvSlideShowConfirmHandler: function(button,event){
		var self = this;
		
		var updateAdvSlideShowFormWindow = self.getUpdateAdvSlideShowFormWindow();
		
		var updateAdvSlideShowForm = updateAdvSlideShowFormWindow.child('form').getForm();
		if(updateAdvSlideShowForm.findField('photo_path').getValue() == ''){
			Ext.Msg.alert('信息提示','请先上传讲师照片！');
			return;
		}
		
		if(updateAdvSlideShowForm.isValid()){
			updateAdvSlideShowForm.submit({
	            url: PATH_ADVERTISEMENT_SLIDESHOW_UPDATE,
	            method: 'POST',
	            waitMsg: '服务器正在处理...',
	            success: function(form, action) {
	                Ext.Msg.alert('提示信息', '幻灯片编辑成功!',function(){
	                	updateAdvSlideShowFormWindow.hide();
	                	
	                	var advSlideShowGridView = self.getFrameViewCenter().child('advslideshowgridview');
	                	advSlideShowGridView.getSelectionModel().clearSelections();
	                	advSlideShowGridView.store.load();
	                },self);
	            },
	            failure: function(form, action) {
        			Ext.Msg.alert('提示信息', '编辑失败，请重试!',function(){
        				updateAdvSlideShowFormWindow.hide();
        			},self);
    			}
	        });
		}
	},
	
	updateAdvSlideShowCancelHandler: function(button,event){
		var self = this;
		self.getUpdateAdvSlideShowFormWindow().hide();
	},
	
	deleteAdvSlideShowHandler: function(button,event){
		var self = this;
		
		var selectedRecords = self.getFrameViewCenter().child('advslideshowgridview').getSelectionModel().getSelection();
		if(selectedRecords.length < 1){
			Ext.Msg.alert('信息提示','请先选择幻灯片！');
			return;
		}
	
		Ext.Msg.confirm('信息提示','确定要删除选定幻灯片吗？',function(value){
			if('yes' == value){
				var deletedAdvSlideShowIds = '';
				Ext.each(selectedRecords,function(item){
					deletedAdvSlideShowIds += item.get('id');
					deletedAdvSlideShowIds += ',';
				});
				
				deletedAdvSlideShowIds = deletedAdvSlideShowIds.substring(0,deletedAdvSlideShowIds.length-1);
				
				Ext.getBody().mask('正在处理，请稍后...');
				
				Ext.Ajax.request({
					url: PATH_ADVERTISEMENT_SLIDESHOW_DELETE,
					method: 'POST',
					params: {
						deletedAdvSlideShowIds: deletedAdvSlideShowIds
					},
					success: function(response){
						Ext.getBody().unmask();
						Ext.Msg.alert('信息提示','已成功删除所选幻灯片！',function(){
							var advSlideShowFridView = self.getFrameViewCenter().child('advslideshowgridview');
							advSlideShowFridView.getSelectionModel().clearSelections();
							advSlideShowFridView.store.load();
						});
					}
				});
			}
		});
	},
	
	uploadAdvSlideShowPhotoHandler: function(button,event){
		var self = this;
		
		Ext.create('Ext.ux.window.UploadFileFormWindow',{
			submitUrl: PATH_ADVERTISEMENT_SLIDESHOW_PHOTO_UPLOAD,
			listeners: {
				//用户选择一个图片上传成功后
				'uploaded': function(datas){
					var advSlideShowPhotoPath = datas;
					if(button.itemId == 'createAdvSlideShow'){
						//更新图片
						var advSlideShowPhotoPanel = self.getCreateAdvSlideShowFormWindow().query('panel[itemId=advSlideShowPhotoPanel]')[0];
						advSlideShowPhotoPanel.body.update('<img style="width: 100%; height: 100%;" src="' + advSlideShowPhotoPath + '"/>');
						
						//存入表单
						var createAdvSlideShowForm = self.getCreateAdvSlideShowFormWindow().child('form').getForm();
						createAdvSlideShowForm.findField('photo_path').setValue(advSlideShowPhotoPath);
					}else if(button.itemId == 'updateAdvSlideShow'){
						//更新图片
						var advSlideShowPhotoPanel = self.getUpdateAdvSlideShowFormWindow().query('panel[itemId=advSlideShowPhotoPanel]')[0];
						advSlideShowPhotoPanel.body.update('<img style="width: 100%; height: 100%;" src="' + advSlideShowPhotoPath + '"/>');
						
						//存入表单
						var updateAdvSlideShowForm = self.getUpdateAdvSlideShowFormWindow().child('form').getForm();
						updateAdvSlideShowForm.findField('photo_path').setValue(advSlideShowPhotoPath);
					}
				}
			}
		}).popup();
	}
	
});