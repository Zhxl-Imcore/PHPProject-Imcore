/**
 * 讲师团队管理
 */
Ext.define('admin.teacher.controller.TeacherController',{
	extend: 'Ext.app.Controller',
	
	views: [
		'admin.teacher.view.TeacherGridView'
	],
	
	models: [
		'admin.teacher.model.TeacherModel'
	],
	
	stores: [
		'admin.teacher.store.TeacherGridViewStore'
	],
	
	refs: [{
    	ref: 'frameViewCenter',
    	selector: 'frameviewcenter'
    },{
    	ref: 'readTeacherFormWindow',
    	selector: 'window[itemId=readTeacherFormWindow]'
    },{
    	ref: 'createTeacherFormWindow',
    	selector: 'window[itemId=createTeacherFormWindow]'
    },{
    	ref: 'updateTeacherFormWindow',
    	selector: 'window[itemId=updateTeacherFormWindow]'
    }],
	
	/**
	 * 初始化界面
	 */
	initViews: function(){
		var self = this;
		
		var teacherGridView = self.getFrameViewCenter().child('teachergridview');
		if(!teacherGridView){
			teacherGridView = Ext.widget('teachergridview');
        	self.getFrameViewCenter().add(teacherGridView);
        	teacherGridView.store.reload();
		}
		self.getFrameViewCenter().setActiveTab(teacherGridView);
	},
	
	/**
	 * 初始化事件
	 */
	init: function(){
		var self = this;
		
		this.control({
			'teachergridview toolbar button[action=Teacher-readTeacher]': {
				'click': {
        			fn: self.readTeacherHandler,
        			scope: self
        		}
			},
			'teachergridview toolbar button[action=Teacher-createTeacher]': {
				'click': {
        			fn: self.createTeacherHandler,
        			scope: self
        		}
			},
			'teachergridview toolbar button[action=Teacher-updateTeacher]': {
				'click': {
        			fn: self.updateTeacherHandler,
        			scope: self
        		}
			},
			'teachergridview toolbar button[action=Teacher-deleteTeacher]': {
				'click': {
        			fn: self.deleteTeacherHandler,
        			scope: self
        		}
			}
		});
		
	},
	
	readTeacherHandler: function(button,event){
		var self = this;
		
		var selectedRecords = self.getFrameViewCenter().child('teachergridview').getSelectionModel().getSelection();
		if(selectedRecords.length < 1){
			Ext.Msg.alert('信息提示','请先选择一个讲师！');
			return;
		}
		
		if(selectedRecords.length > 1){
			Ext.Msg.alert('信息提示','只能选择一个讲师！');
			return;
		}
		
		var teacherModel = selectedRecords[0];
		
		var readTeacherFormWindow = self.getReadTeacherFormWindow();
		if(!readTeacherFormWindow){
			readTeacherFormWindow = self.newReadTeacherFormWindow();
		}
		
		//表单设值
		readTeacherFormWindow.child('form').getForm().loadRecord(teacherModel);
		
		readTeacherFormWindow.show();
		
		//显示图片(只有在显示之后，panel才有body)
		readTeacherFormWindow.query('panel[itemId=teacherPhotoPanel]')[0].body.update('<img style="width: 100%; height: 100%;" src="' + teacherModel.get('photo_path') + '"/>');
	},
	
	newReadTeacherFormWindow: function(){
		var self = this;
		
		return Ext.create('Ext.window.Window',{
			itemId: 'readTeacherFormWindow',
	        width: 600,
	        height: 600,
	        title: '查看讲师',
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
	            defaultType: 'textfield',
	            items: [{
	            	xtype: 'hidden',
	            	name: 'id'
	            },{
	            	xtype: 'hidden',
	            	name: 'photo_path'
	            },{
	            	xtype: 'panel',
	            	frame: true,
	            	layout: 'column',
	            	items: [{
	            		columnWidth: 1,
	            		height: 249,
	            		layout: 'form',
	            		xtype: 'fieldset',
	            		title: '讲师基本信息',
	            		defaults: {
			                anchor: '100%',
			                labelWidth: 70,
			                labelAlign: 'right'
			            },
	            		items: [{
	            			xtype: 'textfield',
		            		name: 'title',
		            		fieldLabel: '讲师称谓',
		            		readOnly: true
	            		},{
	            			xtype: 'textfield',
		            		name: 'job',
		            		fieldLabel: '讲师职位',
		            		readOnly: true
	            		},{
	            			xtype: 'textfield',
		            		name: 'published_book',
		            		fieldLabel: '发表著作',
		            		readOnly: true
	            		},
	            		Ext.create('Ext.ux.combo.LocalComboBox',{
	        				fieldLabel: '发布状态',
	        				labelAlign: 'right',
	        				labelWidth: 70,
	        				readOnly: true,
	            			name: 'status',
	            			hiddenName: 'status',
	            			textValueItems: [
	            				['已发布','1'],
	            				['未发布','0']
	            			],
			            	defaultItemValue: '1'
	            		})]
	            	},{
	            		width: 163,
	            		height: 249,
	            		style: {
	            			marginLeft: '10px'
	            		},
	            		layout: 'anchor',
		            	xtype: 'fieldset',
		            	title: '讲师照片',
		            	items: [{
		            		xtype: 'panel',
	            			itemId: 'teacherPhotoPanel',
	            			anchor: '0 -40',
	            			html: '<div style="width: 100%; height: 100%; font-size:18px; text-align: center; line-height: 220px;">还未上传图片</div>'
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
	            				disabled: true,
	            				itemId: 'updateNews',
	            				handler: self.uploadTeacherPhotoHandler,
	            				scope: self
	            			}]
		            	}]
	            	}]
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '教学理念',
	            	style: {
	            		marginTop: '10px'
	            	},
	            	items: [{
	            		xtype: 'textfield',
	            		name: 'teach_idea',
	            		readOnly: true
	            	}]
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '寄语学员',
	            	style: {
	            		marginTop: '10px'
	            	},
	            	items: [{
	            		xtype: 'textfield',
	            		name: 'student_hope',
	            		readOnly: true
	            	}]
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '讲师简介',
	            	style: {
	            		marginTop: '10px'
	            	},
	            	items: [{
	            		xtype: 'textareafield',
	            		name: 'introduce',
	            		width: '100%',
	            		height: 120,
	            		readOnly: true
	            	}]
	            }]
	        }],
	        buttons: [{
	        	text: '确定',
	        	handler: self.readTeacherConfirmHandler,
	        	scope: self
	        }],
	        listeners: {
	        	'beforehide': function(window,opts){
	        		window.query('panel[itemId=teacherPhotoPanel]')[0].body.update('<div style="width: 100%; height: 100%; font-size:20px; text-align: center; line-height: 260px;">还未上传图片</div>');
	        		window.child('form').getForm().reset();
	        	}
	        }
		});
	},
	
	readTeacherConfirmHandler: function(button,event){
		var self = this;
		self.getReadTeacherFormWindow().hide();
	},
	
	
	createTeacherHandler: function(button,event){
		var self = this;
		
		//从界面上获取Window
        var createTeacherFormWindow = self.getCreateTeacherFormWindow();
        if(!createTeacherFormWindow){
        	createTeacherFormWindow = self.newCreateTeacherFormWindow();
        }
        
        createTeacherFormWindow.show();
	},
	
	newCreateTeacherFormWindow: function(){
		var self = this;
		
		return Ext.create('Ext.window.Window',{
			itemId: 'createTeacherFormWindow',
	        width: 600,
	        height: 600,
	        title: '新建讲师',
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
	            defaultType: 'textfield',
	            items: [{
	            	xtype: 'hidden',
	            	name: 'photo_path'
	            },{
	            	xtype: 'panel',
	            	frame: true,
	            	layout: 'column',
	            	items: [{
	            		columnWidth: 1,
	            		height: 249,
	            		layout: 'form',
	            		xtype: 'fieldset',
	            		title: '讲师基本信息',
	            		defaults: {
			                anchor: '100%',
			                labelWidth: 70,
			                labelAlign: 'right'
			            },
	            		items: [{
	            			xtype: 'textfield',
		            		name: 'title',
		            		fieldLabel: '讲师称谓'
	            		},{
	            			xtype: 'textfield',
		            		name: 'job',
		            		fieldLabel: '讲师职位'
	            		},{
	            			xtype: 'textfield',
		            		name: 'published_book',
		            		fieldLabel: '发表著作'
	            		},
	            		Ext.create('Ext.ux.combo.LocalComboBox',{
	        				fieldLabel: '发布状态',
	        				labelAlign: 'right',
	        				labelWidth: 70,
	            			name: 'status',
	            			hiddenName: 'status',
	            			textValueItems: [
	            				['已发布','1'],
	            				['未发布','0']
	            			],
			            	defaultItemValue: '1'
	            		})]
	            	},{
	            		width: 163,
	            		height: 249,
	            		style: {
	            			marginLeft: '10px'
	            		},
	            		layout: 'anchor',
		            	xtype: 'fieldset',
		            	title: '讲师照片',
		            	items: [{
		            		xtype: 'panel',
	            			itemId: 'teacherPhotoPanel',
	            			anchor: '0 -40',
	            			html: '<div style="width: 100%; height: 100%; font-size:18px; text-align: center; line-height: 220px;">还未上传图片</div>'
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
	            				itemId: 'createTeacher',
	            				handler: self.uploadTeacherPhotoHandler,
	            				scope: self
	            			}]
		            	}]
	            	}]
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '教学理念',
	            	style: {
	            		marginTop: '10px'
	            	},
	            	items: [{
	            		xtype: 'textfield',
	            		name: 'teach_idea'
	            	}]
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '寄语学员',
	            	style: {
	            		marginTop: '10px'
	            	},
	            	items: [{
	            		xtype: 'textfield',
	            		name: 'student_hope'
	            	}]
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '讲师简介',
	            	style: {
	            		marginTop: '10px'
	            	},
	            	items: [{
	            		xtype: 'textareafield',
	            		name: 'introduce',
	            		width: '100%',
	            		height: 120
	            	}]
	            }]
	        }],
	        buttons: [{
	        	text: '保存',
	        	handler: self.createTeacherConfirmHandler,
	        	scope: self
	        },{
	        	text: '取消',
	     		handler: self.createTeacherCancelHandler,
	        	scope: self
	        }],
	        listeners: {
	        	'beforehide': function(window,opts){
	        		window.query('panel[itemId=teacherPhotoPanel]')[0].body.update('<div style="width: 100%; height: 100%; font-size:20px; text-align: center; line-height: 260px;">还未上传图片</div>');
	        		window.child('form').getForm().reset();
	        	}
	        }
		});
	},
	
	/**
	 * 确定创建讲师
	 */
	createTeacherConfirmHandler: function(button,event){
		var self = this;
		
		var createTeacherFormWindow = self.getCreateTeacherFormWindow();
		
		var createTeacherForm = createTeacherFormWindow.child('form').getForm();
		if(createTeacherForm.findField('photo_path').getValue() == ''){
			Ext.Msg.alert('信息提示','请先上传讲师照片！');
			return;
		}
		
		if(createTeacherForm.isValid()){
			createTeacherForm.submit({
	            url: PATH_TEACHER_CREATE,
	            method: 'POST',
	            waitMsg: '服务器正在处理...',
	            success: function(form, action) {
	                Ext.Msg.alert('提示信息', '讲师创建成功!',function(){
	                	self.getCreateTeacherFormWindow().hide();
	                	self.getFrameViewCenter().child('teachergridview').store.load();
	                },self);
	            },
	            failure: function(form, action) {
        			Ext.Msg.alert('提示信息', '创建失败，请重试!',function(){
        				self.getCreateTeacherFormWindow().hide();
        			},self);
    			}
	        });
		}
	},
	
	createTeacherCancelHandler: function(button,event){
		var self = this;
		self.getCreateTeacherFormWindow().hide();
	},
	
	updateTeacherHandler: function(button,event){
		var self = this;
		
		var selectedRecords = self.getFrameViewCenter().child('teachergridview').getSelectionModel().getSelection();
		if(selectedRecords.length < 1){
			Ext.Msg.alert('信息提示','请先选择一个讲师！');
			return;
		}
		
		if(selectedRecords.length > 1){
			Ext.Msg.alert('信息提示','只能选择一个讲师！');
			return;
		}
		
		var teacherModel = selectedRecords[0];
		
        var updateTeacherFormWindow = self.getUpdateTeacherFormWindow();
        if(!updateTeacherFormWindow){
        	updateTeacherFormWindow = self.newUpdateTeacherFormWindow();
        }
        
        //表单设值
		updateTeacherFormWindow.child('form').getForm().loadRecord(teacherModel);
		
		updateTeacherFormWindow.show();
		
		//显示图片(只有在显示之后，panel才有body)
		updateTeacherFormWindow.query('panel[itemId=teacherPhotoPanel]')[0].body.update('<img style="width: 100%; height: 100%;" src="' + teacherModel.get('photo_path') + '"/>');
        
        updateTeacherFormWindow.show();
	},
	
	newUpdateTeacherFormWindow: function(){
		var self = this;
		
		return Ext.create('Ext.window.Window',{
			itemId: 'updateTeacherFormWindow',
	        width: 600,
	        height: 600,
	        title: '编辑讲师',
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
	            defaultType: 'textfield',
	            items: [{
	            	xtype: 'hidden',
	            	name: 'id'
	            },{
	            	xtype: 'hidden',
	            	name: 'photo_path'
	            },{
	            	xtype: 'panel',
	            	frame: true,
	            	layout: 'column',
	            	items: [{
	            		columnWidth: 1,
	            		height: 249,
	            		layout: 'form',
	            		xtype: 'fieldset',
	            		title: '讲师基本信息',
	            		defaults: {
			                anchor: '100%',
			                labelWidth: 70,
			                labelAlign: 'right'
			            },
	            		items: [{
	            			xtype: 'textfield',
		            		name: 'title',
		            		fieldLabel: '讲师称谓'
	            		},{
	            			xtype: 'textfield',
		            		name: 'job',
		            		fieldLabel: '讲师职位'
	            		},{
	            			xtype: 'textfield',
		            		name: 'published_book',
		            		fieldLabel: '发表著作'
	            		},
	            		Ext.create('Ext.ux.combo.LocalComboBox',{
	        				fieldLabel: '发布状态',
	        				labelAlign: 'right',
	        				labelWidth: 70,
	            			name: 'status',
	            			hiddenName: 'status',
	            			textValueItems: [
	            				['已发布','1'],
	            				['未发布','0']
	            			],
			            	defaultItemValue: '1'
	            		})]
	            	},{
	            		width: 163,
	            		height: 249,
	            		style: {
	            			marginLeft: '10px'
	            		},
	            		layout: 'anchor',
		            	xtype: 'fieldset',
		            	title: '讲师照片',
		            	items: [{
		            		xtype: 'panel',
	            			itemId: 'teacherPhotoPanel',
	            			anchor: '0 -40',
	            			html: '<div style="width: 100%; height: 100%; font-size:18px; text-align: center; line-height: 220px;">还未上传图片</div>'
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
	            				itemId: 'updateTeacher',
	            				handler: self.uploadTeacherPhotoHandler,
	            				scope: self
	            			}]
		            	}]
	            	}]
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '教学理念',
	            	style: {
	            		marginTop: '10px'
	            	},
	            	items: [{
	            		xtype: 'textfield',
	            		name: 'teach_idea'
	            	}]
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '寄语学员',
	            	style: {
	            		marginTop: '10px'
	            	},
	            	items: [{
	            		xtype: 'textfield',
	            		name: 'student_hope'
	            	}]
	            },{
	            	layout: 'form',
	            	xtype: 'fieldset',
	            	title: '讲师简介',
	            	style: {
	            		marginTop: '10px'
	            	},
	            	items: [{
	            		xtype: 'textareafield',
	            		name: 'introduce',
	            		width: '100%',
	            		height: 120
	            	}]
	            }]
	        }],
	        buttons: [{
	        	text: '保存',
	        	handler: self.updateTeacherConfirmHandler,
	        	scope: self
	        },{
	        	text: '取消',
	     		handler: self.updateTeacherCancelHandler,
	        	scope: self
	        }],
	        listeners: {
	        	'beforehide': function(window,opts){
	        		window.query('panel[itemId=teacherPhotoPanel]')[0].body.update('<div style="width: 100%; height: 100%; font-size:20px; text-align: center; line-height: 260px;">还未上传图片</div>');
	        		window.child('form').getForm().reset();
	        	}
	        }
		});
	},
	
	/**
	 * 确定编辑讲师
	 */
	updateTeacherConfirmHandler: function(button,event){
		var self = this;
		
		var updateTeacherFormWindow = self.getUpdateTeacherFormWindow();
		
		var updateTeacherForm = updateTeacherFormWindow.child('form').getForm();
		if(updateTeacherForm.findField('photo_path').getValue() == ''){
			Ext.Msg.alert('信息提示','请先上传讲师照片！');
			return;
		}
		
		if(updateTeacherForm.isValid()){
			updateTeacherForm.submit({
	            url: PATH_TEACHER_UPDATE,
	            method: 'POST',
	            waitMsg: '服务器正在处理...',
	            success: function(form, action) {
	                Ext.Msg.alert('提示信息', '讲师编辑成功!',function(){
	                	updateTeacherFormWindow.hide();
	                	
	                	var teacherGridView = self.getFrameViewCenter().child('teachergridview');
	                	//清空选中状态(不然会导致store与selection中的数据不一致，必须让用户出发选择事件)
	                	teacherGridView.getSelectionModel().clearSelections();
	                	
	                	self.getFrameViewCenter().child('teachergridview').store.load();
	                },self);
	            },
	            failure: function(form, action) {
        			Ext.Msg.alert('提示信息', '讲师编辑失败，请重试!',function(){
        				updateTeacherFormWindow.hide();
        			},self);
    			}
	        });
		}
	},
	
	updateTeacherCancelHandler: function(button,event){
		var self = this;
		self.getUpdateTeacherFormWindow().hide();
	},
	
	/**
	 * 删除讲师
	 */
	deleteTeacherHandler: function(button,event){
		var self = this;
		
		var selectedRecords = self.getFrameViewCenter().child('teachergridview').getSelectionModel().getSelection();
		if(selectedRecords.length < 1){
			Ext.Msg.alert('信息提示','请先选择讲师！');
			return;
		}
	
		Ext.Msg.confirm('信息提示','确定要删除选定讲师吗？',function(value){
			if('yes' == value){
				var deletedTeacherIds = '';
				Ext.each(selectedRecords,function(item){
					deletedTeacherIds += item.get('id');
					deletedTeacherIds += ',';
				});
				
				deletedTeacherIds = deletedTeacherIds.substring(0,deletedTeacherIds.length-1);
				
				Ext.getBody().mask('正在处理，请稍后...');
				
				Ext.Ajax.request({
					url: PATH_TEACHER_DELETE,
					method: 'POST',
					params: {
						deletedTeacherIds: deletedTeacherIds
					},
					success: function(response){
						Ext.getBody().unmask();
						Ext.Msg.alert('信息提示','已成功删除所选讲师！',function(){
							var teacherGridView = self.getFrameViewCenter().child('teachergridview');
							teacherGridView.getSelectionModel().clearSelections();
							teacherGridView.store.load();
						});
					}
				});
			}
		});
		
	},
	
	/**
	 * 上传讲师照片
	 */
	uploadTeacherPhotoHandler: function(button,event){
		var self = this;
		
		Ext.create('Ext.ux.window.UploadFileFormWindow',{
			submitUrl: PATH_TEACHER_UPLOAD_PHOTO,
			listeners: {
				//用户选择一个图片上传成功后
				'uploaded': function(datas){
					var teacherPhotoPath = datas;
					if(button.itemId == 'createTeacher'){
						//更新图片
						var teacherPhotoPanel = self.getCreateTeacherFormWindow().query('panel[itemId=teacherPhotoPanel]')[0];
						teacherPhotoPanel.body.update('<img style="width: 100%; height: 100%;" src="' + teacherPhotoPath + '"/>');
						
						//存入表单
						var createTeacherForm = self.getCreateTeacherFormWindow().child('form').getForm();
						createTeacherForm.findField('photo_path').setValue(teacherPhotoPath);
					}else if(button.itemId == 'updateTeacher'){
						//更新图片
						var teacherPhotoPanel = self.getUpdateTeacherFormWindow().query('panel[itemId=teacherPhotoPanel]')[0];
						teacherPhotoPanel.body.update('<img style="width: 100%; height: 100%;" src="' + teacherPhotoPath + '"/>');
						
						//存入表单
						var updateTeacherForm = self.getUpdateTeacherFormWindow().child('form').getForm();
						updateTeacherForm.findField('photo_path').setValue(teacherPhotoPath);
					}
				}
			}
		}).popup();
	}
	
});