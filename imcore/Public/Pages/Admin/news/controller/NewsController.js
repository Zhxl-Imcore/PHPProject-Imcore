/**
 * 果核动态管理
 */
Ext.define('admin.news.controller.NewsController',{
	extend: 'Ext.app.Controller',
	
	views: [
		'admin.news.view.NewsGridView'
	],
	
	models: [
		'admin.news.model.NewsModel'
	],
	
	stores: [
		'admin.news.store.NewsGridViewStore'
	],
	
	refs: [{
    	ref: 'frameViewCenter',
    	selector: 'frameviewcenter'
    },{
    	ref: 'createNewsFormWindow',
    	selector: 'window[itemId=createNewsFormWindow]'
    },{
    	ref: 'updateNewsFormWindow',
    	selector: 'window[itemId=updateNewsFormWindow]'
    }],
	
	init: function(){
		var self = this;
		
		this.control({
			'newsgridview toolbar button[action=News-createNews]': {
				'click': {
        			fn: self.createNewsHandler,
        			scope: self
        		}
			},
			'newsgridview toolbar button[action=News-updateNews]': {
				'click': {
					fn: self.updateNewsHandler,
					scope: self
				}
			},
			'newsgridview toolbar button[action=News-deleteNews]': {
				'click': {
					fn: self.deleteNewsHandler,
					scope: self
				}
			}
		});
	},
	
	/**
	 * 创建果核动态
	 */
	createNewsHandler: function(button,event){
		var self = this;
		
		//从界面上获取Window
        var createNewsFormWindow = self.getCreateNewsFormWindow();
        if(!createNewsFormWindow){
        	createUserFormWindow = self.newCreateNewsFormWindow();
        }
        
        createUserFormWindow.show();
	},
	
	/**
	 * 更新动态
	 */
	updateNewsHandler: function(button,event){
		var self = this;
		
		var selectedRecords = self.getFrameViewCenter().child('newsgridview').getSelectionModel().getSelection();
		if(selectedRecords.length < 1){
			Ext.Msg.alert('信息提示','请先选择一条动态.');
			return;
		}else if(selectedRecords.length > 1){
			Ext.Msg.alert('信息提示','最多只能选择一条动态.');
			return;
		}
		
		var updateNewsFormWindow = self.getUpdateNewsFormWindow();
		if(!updateNewsFormWindow){
			updateNewsFormWindow = self.newUpdateNewsFormWindow();
		}
		
		//填充数据
		var newsModel = selectedRecords[0];
		
		var updateNewsForm = updateNewsFormWindow.child('form').getForm();
		updateNewsForm.findField('id').setValue(newsModel.get('id'));
		updateNewsForm.findField('image_ids').setValue(newsModel.get('image_ids'));
		updateNewsForm.findField('title').setValue(newsModel.get('title'));
		updateNewsForm.findField('content').setValue(Ext.String.htmlDecode(newsModel.get('content')));
		updateNewsForm.findField('status').setValue(newsModel.get('status'));
		updateNewsForm.findField('is_stick').setValue(newsModel.get('is_stick'));
		updateNewsForm.findField('publish_time').setValue(newsModel.get('publish_time'));
		
		//Ext.getBody().mask('正在加载图片，请稍后...');
		
		/** 显示图片 **/
		Ext.Ajax.request({
			url: PATH_NEWS_QUERY_IMAGE_COVER,
			method: 'POST',
			params: {
				image_ids: newsModel.get('image_ids')
			},
			success: function(response){
				var newsImageCover = Ext.decode(response.responseText).datas;
				
				var newsImageConverPath = newsImageCover.path.substring(1) + newsImageCover.name;
				updateNewsFormWindow.query('panel[itemId=newsImagePanel]')[0].body.update('<img style="width: 100%; height: 100%;" src="' + newsImageConverPath + '"/>');
				
				//Ext.getBody().unmask();
			}
		});
		
		
		updateNewsFormWindow.show();
	},
	
	/**
	 * 创建新建动态窗口
	 */
	newUpdateNewsFormWindow: function(){
		var self = this;
		
		return Ext.create('Ext.window.Window',{
			itemId: 'updateNewsFormWindow',
	        width: 1000,
	        height: 520,
	        title: '编辑动态',
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
	            	name: 'old_image_ids'
	            },{
	            	xtype: 'hidden',
	            	name: 'image_ids'
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '果核动态标题',
	            	autoHeight: true,
	            	items: [{
	            		xtype: 'textfield',
	            		name: 'title'
	            	}]
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '果核动态内容',
	            	autoHeight: true,
	            	items: {
	            		xtype: 'htmleditor',
	            		height: 300,
	            		name: 'content'
	            	}
	            },{
	            	xtype: 'panel',
	            	layout: 'column',
	            	autoHeight: true,
	            	frame: true,
	            	items: [{
	            		columnWidth: .5,
	            		height: 300,
	            		xtype: 'fieldset',
	            		layout: 'form',
	            		title: '发布信息',
	            		items: [
	            			Ext.create('Ext.ux.combo.LocalComboBox',{
	            				fieldLabel: '是否发布',
		            			name: 'status',
		            			textValueItems: [
		            				['是','1'],
		            				['否','0']
		            			],
		            			defaultItemValue: '1' 
	            			}),
	            		{
	            			xtype: 'radiogroup',
	            			fieldLabel: '是否置顶',
	            			columns: 2,
	            			items: [{
	            				boxLabel: '是',
	            				name: 'is_stick',
	            				inputValue: '1',
	            				checked: true
	            			},{
	            				boxLabel: '否',
	            				name: 'is_stick',
	            				inputValue: '0'
	            			}]
	            		},{
	            			xtype: 'datefield',
	            			name: 'publish_time',
	            			fieldLabel: '发布日期',
	            			emptyText: '请选择..',
	            			format: 'Y-m-d',
	            			value: Ext.Date.format(new Date(),'Y-m-d')
	            		}]
	            	},{
	            		columnWidth: .5,
	            		style: 'margin-left: 20px;',
	            		xtype: 'fieldset',
	            		title: '果核动态图片',
	            		height: 300,
	            		layout: 'anchor',
	            		items: [{
	            			xtype: 'panel',
	            			itemId: 'newsImagePanel',
	            			anchor: '0 -40',
	            			html: '<div style="width: 100%; height: 100%; font-size:20px; text-align: center; line-height: 260px;">还未上传图片...</div>'
	            		},{
	            			xtype: 'panel',
	            			anchor: '0',
	            			style: {
	            				marginTop: '5px'
	            			},
	            			bodyStyle: {
	            				padding: '0px 40px'
	            			},
	            			layout: 'fit',
	            			frame: true,
	            			items: [{
	            				xtype: 'button',
	            				text: '上传图片',
	            				itemId: 'updateNews',
	            				handler: self.uploadNewsPhotoHandler,
	            				scope: self
	            			}]
	            		}]
	            	}]
	            }]
	        }],
	        listeners: {
	        	'beforehide': function(window,opts){
	        		window.query('panel[itemId=newsImagePanel]')[0].body.update('<div style="width: 100%; height: 100%; font-size:20px; text-align: center; line-height: 260px;">还未上传图片...</div>');
	        		window.child('form').getForm().reset();
	        	}
	        },
	        buttons: [{
	            text: '确定',
	            handler: self.updateNewsConfirmHandler,
	            scope: self
	        },{
	            text: '取消',
	            handler: self.updateNewsCancelHandler,
	            scope: self
	        }]
		});
	},
	
	updateNewsConfirmHandler: function(button,event){
		var self = this;
		
		var updateNewsForm = self.getUpdateNewsFormWindow().child('form').getForm();
		if(updateNewsForm.isValid()){
			updateNewsForm.submit({
	            url: PATH_NEWS_UPDATE,
	            method: 'POST',
	            waitMsg: '服务器正在处理...',
	            success: function(form, action) {
	                Ext.Msg.alert('提示信息', '果核动态更新成功！',function(){
	                	self.getUpdateNewsFormWindow().hide();
	                	self.getFrameViewCenter().child('newsgridview').store.reload();
	                },self);
	            },
	            failure: function(form, action) {
        			Ext.Msg.alert('提示信息', '更新失败，请重试!',function(){
        				self.getUpdateNewsFormWindow().hide();
        			},self);
    			}
	        });
		}		

	},
	
	updateNewsCancelHandler: function(button,event){
		var self = this;
		self.getUpdateNewsFormWindow().hide();
	},
	
	/**
	 * 禁用动态
	 */
	deleteNewsHandler: function(button,event){
		var self = this;
		
		var newsGridView = self.getFrameViewCenter().child('newsgridview');
		
		var selectedRecords = newsGridView.getSelectionModel().getSelection();
		if(selectedRecords.length < 1){
			 Ext.Msg.alert('信息提示','请先选择一条动态.');
			 return;
		}
		
		Ext.Msg.confirm('信息提示','确定要删除所选动态吗？',function(btn){
			if(btn == 'yes'){
				var deletedNewsIds = '';
				Ext.each(selectedRecords,function(item){
					deletedNewsIds += item.get('id');
					deletedNewsIds += ','
				});
				deletedNewsIds = deletedNewsIds.substring(0,deletedNewsIds.length-1);
				
				Ext.getBody().mask('正在处理，请稍后...');
				
				Ext.Ajax.request({
					url: PATH_NEWS_DELETE,
					method: 'POST',
					params: {
						deletedNewsIds: deletedNewsIds
					},
					success: function(response,options){
						Ext.getBody().unmask();
						
						var result = Ext.decode(response.responseText);
							 
		     			Ext.Msg.alert('信息提示', result.msg,function(){	
		     				newsGridView.store.reload();
		     			});
		     		},
		     		failure: function(response,options){
		     			Ext.getBody().unmask();
		     			
		     			var result = Ext.decode(response.responseText);
		     			
		     			Ext.Msg.alert('信息提示',Ext.decode(result.msg));
		     		}
				});
			}
		},this);
		
		
	},
	
	/**
	 * 创建新建动态窗口
	 */
	newCreateNewsFormWindow: function(){
		var self = this;
		
		return Ext.create('Ext.window.Window',{
			itemId: 'createNewsFormWindow',
	        width: 1000,
	        height: 520,
	        title: '新建动态',
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
	            	name: 'image_ids'
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '果核动态标题',
	            	autoHeight: true,
	            	items: [{
	            		xtype: 'textfield',
	            		name: 'title'
	            	}]
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '果核动态内容',
	            	autoHeight: true,
	            	items: {
	            		xtype: 'htmleditor',
	            		height: 300,
	            		name: 'content'
	            	}
	            },{
	            	xtype: 'panel',
	            	layout: 'column',
	            	autoHeight: true,
	            	frame: true,
	            	items: [{
	            		columnWidth: .5,
	            		height: 300,
	            		xtype: 'fieldset',
	            		layout: 'form',
	            		title: '发布信息',
	            		items: [
	            			Ext.create('Ext.ux.combo.LocalComboBox',{
	            				fieldLabel: '是否发布',
		            			name: 'status',
		            			textValueItems: [
		            				['是','1'],
		            				['否','0']
		            			],
		            			defaultItemValue: '1'
	            			}),
	            		{
	            			xtype: 'radiogroup',
	            			fieldLabel: '是否置顶',
	            			columns: 2,
	            			items: [{
	            				boxLabel: '是',
	            				name: 'is_stick',
	            				inputValue: '1',
	            				checked: true
	            			},{
	            				boxLabel: '否',
	            				name: 'is_stick',
	            				inputValue: '0'
	            			}]
	            		},{
	            			xtype: 'datefield',
	            			name: 'publish_time',
	            			fieldLabel: '发布日期',
	            			emptyText: '请选择..',
	            			format: 'Y-m-d',
	            			value: Ext.Date.format(new Date(),'Y-m-d')
	            		}]
	            	},{
	            		columnWidth: .5,
	            		style: 'margin-left: 20px;',
	            		xtype: 'fieldset',
	            		title: '果核动态图片',
	            		height: 300,
	            		layout: 'anchor',
	            		items: [{
	            			xtype: 'panel',
	            			itemId: 'newsImagePanel',
	            			anchor: '0 -40',
	            			html: '<div style="width: 100%; height: 100%; font-size:20px; text-align: center; line-height: 260px;">还未上传图片...</div>'
	            		},{
	            			xtype: 'panel',
	            			anchor: '0',
	            			style: {
	            				marginTop: '5px'
	            			},
	            			bodyStyle: {
	            				padding: '0px 40px'
	            			},
	            			layout: 'fit',
	            			frame: true,
	            			items: [{
	            				xtype: 'button',
	            				text: '上传图片',
	            				itemId: 'createNews',
	            				handler: self.uploadNewsPhotoHandler,
	            				scope: self
	            			}]
	            		}]
	            	}]
	            }]
	        }],
	        listeners: {
	        	'beforehide': function(window,opts){
	        		window.query('panel[itemId=newsImagePanel]')[0].body.update('<div style="width: 100%; height: 100%; font-size:20px; text-align: center; line-height: 260px;">还未上传图片...</div>');
	        		window.child('form').getForm().reset();
	        	}
	        },
	        buttons: [{
	            text: '确定',
	            handler: self.createNewsConfirmHandler,
	            scope: self
	        },{
	            text: '取消',
	            handler: self.createNewsCancelHandler,
	            scope: self
	        }]
		});
	},
	
	/**
	 * 	确定创建新闻
	 */
	createNewsConfirmHandler: function(button,event){
		var self = this;
		
		var createNewsForm = self.getCreateNewsFormWindow().child('form').getForm();
		if(createNewsForm.isValid()){
			createNewsForm.submit({
	            url: PATH_NEWS_CREATE,
	            method: 'POST',
	            waitMsg: '服务器正在处理...',
	            success: function(form, action) {
	                Ext.Msg.alert('提示信息', '果核动态创建成功!',function(){
	                	self.getCreateNewsFormWindow().hide();
	                	self.getFrameViewCenter().child('newsgridview').store.reload();
	                },self);
	            },
	            failure: function(form, action) {
        			Ext.Msg.alert('提示信息', '创建失败，请重试!',function(){
        				self.getCreateNewsFormWindow().hide();
        			},self);
    			}
	        });
		}
		
	},
	
	createNewsCancelHandler: function(button,event){
		var self = this;
		self.getCreateNewsFormWindow().hide();
	},
	
	/**
	 * 上传动态图片
	 */
	uploadNewsPhotoHandler: function(button,event){
		var self = this;
		
		Ext.create('Ext.ux.window.UploadFileFormWindow',{
			submitUrl: PATH_NEWS_UPLOAD_PHOTO,
			listeners: {
				//上传成功后
				'uploaded': function(datas){
					var image_ids = '';
					Ext.each(datas,function(item){
						image_ids += item.id;
						image_ids += ',';
						
						if('NEWS' == item.category && 'COVER' == item.type){
							
							var newsImagePanel = null;
							if(button.itemId == 'createNews'){
								newsImagePanel = self.getCreateNewsFormWindow().query('panel[itemId=newsImagePanel]')[0];
							}else if(button.itemId == 'updateNews'){
								newsImagePanel = self.getUpdateNewsFormWindow().query('panel[itemId=newsImagePanel]')[0];
							}
							
							//消去开头的点
							var newsConverImagePath = item.path.substring(1) + item.name; 
							
							newsImagePanel.body.update('<img style="width: 100%; height: 100%;" src="' + newsConverImagePath + '"/>');
							
							//停止循环
							return false;
						}
					});
					
					if(button.itemId == 'createNews'){
						self.getCreateNewsFormWindow().child('form').getForm().findField('image_ids').setValue(image_ids.substring(0,image_ids.length-1));
					}else if(button.itemId == 'updateNews'){
						var updateNewsForm = self.getUpdateNewsFormWindow().child('form').getForm();
						updateNewsForm.findField('old_image_ids').setValue(updateNewsForm.findField('image_ids').getValue());
						updateNewsForm.findField('image_ids').setValue(image_ids.substring(0,image_ids.length-1));
					}
				}
			}
		}).popup();
		
	},
	
	initViews: function(){
		var self = this;
		
		var newsGridView = self.getFrameViewCenter().child('newsgridview');
		if(!newsGridView){
			newsGridView = Ext.widget('newsgridview');
        	self.getFrameViewCenter().add(newsGridView);
        	newsGridView.store.reload();
		}
		self.getFrameViewCenter().setActiveTab(newsGridView);
	}
});