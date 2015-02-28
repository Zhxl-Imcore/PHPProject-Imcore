/**
 * 用户管理
 */
Ext.define('admin.user.controller.UserController',{
    extend: 'Ext.app.Controller',
    
    views: [
        'admin.user.view.UserGridView'
    ],
    
    stores: [
         'admin.user.store.UserGridViewStore'
    ],
    
    models: [
        'admin.user.model.UserModel'
    ],
    
    /**
     * 引用页面组件
     */
    refs: [{
    	ref: 'frameViewCenter',
    	selector: 'frameviewcenter'
    },{
    	ref: 'createUserFormWindow',
    	selector: 'window[itemId=createUserFormWindow]'
    },{
    	ref: 'updateUserFormWindow',
    	selector: 'window[itemId=updateUserFormWindow]'
    }],
    
    init: function(){
        var self = this;
        
        self.control({
        	'usergridview toolbar button[action=User-addUser]': {
        		'click': {
        			fn: self.handlerCreateUser,
        			scope: self
        		}
        	},
        	'usergridview toolbar button[action=User-updateUser]': {
        		'click': {
        			fn: self.handlerUpdateUser,
        			scope: self
        		}
        	},
        	'usergridview toolbar button[action=User-disableUser]': {
        		'click': {
        			fn: self.handlerDisableUser,
        			scope: self
        		}
        	}
        });
    },
    
    /**
     * 初始化界面
     */
    initViews: function(){
    	var self = this;
    	
    	var userGridView = self.getFrameViewCenter().child('usergridview');
        if(!userGridView){
        	userGridView = Ext.widget('usergridview');
        	self.getFrameViewCenter().add(userGridView);
            userGridView.store.reload();
        }
        self.getFrameViewCenter().setActiveTab(userGridView);
    },
    
    /**
    *   查看用户信息
    */
    handlerCheckUser: function(button,event){
        var self = this;
       
        var selectedUsers = self.orgMgrUserTabPanel.getSelectionModel().getSelection();
        
        //用户未选校验
        if(selectedUsers.length < 1){
            Ext.Msg.alert('信息提示','请先选择一个用户.');
            return;
        }
        
        //用户多选校验
        if(selectedUsers.length > 1){
            Ext.Msg.alert('信息提示','只能选择一个用户.');
            return;
        }
        
    },
    
     /**
    *   新建用户信息
    */
    handlerCreateUser: function(button,event){
        var self = this;
        
        //从界面上获取Window
        var createUserFormWindow = self.getCreateUserFormWindow();
        if(!createUserFormWindow){
        	createUserFormWindow = Ext.create('Ext.window.Window',{
	    		itemId: 'createUserFormWindow',
	            width: 500,
	            height: 400,
	            title: '新建用户',
	            layout: 'fit',
                closable: true,
	        	closeAction: 'hide',
                constrain: true,
                modal: true,
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
                    items: [{
                        fieldLabel: '账号',
                        name: 'account',
                        allowBlank: false,
                        blankText: '账号不能为空'
                    },{
                        fieldLabel: '密码',
                        name: 'password',
                        allowBlank: false,
                        blankText: '密码不能为空'
                    },{
                        fieldLabel: '姓名',
                        name: 'name',
                        allowBlank: false,
                        blankText: '姓名不能为空'
                    },{
                        fieldLabel: '状态',
                        name: 'status',
                        anchor: '50%',
                        xtype: 'combo',
                        store: Ext.create('Ext.data.SimpleStore',{
                            fields: ['text','value'],
                            data: [
                                ['启用','1'],
                                ['禁用','0']
                            ]
                        }),
                        displayField: 'text',
                        valueField: 'value',
                        mode: 'local',
                        emptyText: '请选择',
                        allowBlank: false,
                        blankText: '请选择状态'
                    }]
                }],
                buttons: [{
    	            text: '确定',
    	            handler: self.handlerCreateUserOk,
    	            scope: self
    	        },{
    	            text: '取消',
    	            handler: self.handlerCreateUserCancel,
    	            scope: self
    	        }]
			});
        }
        
        createUserFormWindow.child('form').getForm().reset();
        createUserFormWindow.show();
    },
    
    /**
     *  确定新建用户
     */
    handlerCreateUserOk: function(button,event){
        var self = this;
    
        var createUserForm = self.getCreateUserFormWindow().child('form').getForm();
        if(createUserForm.isValid()){
        	createUserForm.submit({
                method:'POST',
                url: PATH_USER_CREATE,
                success: function(form,action){
                    Ext.Msg.alert('信息','用户创建成功',function(){
                        self.getCreateUserFormWindow().hide();
                        self.getFrameViewCenter().child('usergridview').store.reload();
                    });
                },
                failure: function(form,action){
                    Ext.Msg.alert('信息','用户创建失败',function(){
                    	self.getCreateUserFormWindow().hide();
                    });
                }
            });
        }
    },
    
    /**
     *  取消创建用户
     */
    handlerCreateUserCancel: function(button,event){
        var self = this;
        self.getCreateUserFormWindow().hide();
    },
    
     /**
    *   编辑用户信息
    */
    handlerUpdateUser: function(button,event){
    	var self = this;
    	
    	var selectedUsers = self.getFrameViewCenter().child('usergridview').getSelectionModel().getSelection();
    	//用户未选校验
    	if(selectedUsers.length < 1){
        	Ext.Msg.alert('信息提示','请先选择一个用户.');
            return;
        }
        
        //用户多选校验
        if(selectedUsers.length > 1){
            Ext.Msg.alert('信息提示','只能选择一个用户.');
            return;
        }
        
        var updateUserFormWindow = self.getUpdateUserFormWindow();
        if(!updateUserFormWindow){
        	updateUserFormWindow = Ext.create('Ext.window.Window',{
	    		itemId: 'updateUserFormWindow',
	            width: 500,
	            height: 400,
	            title: '编辑用户',
	            layout: 'fit',
                closable: true,
	        	closeAction: 'hide',
                constrain: true,
                modal: true,
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
                    items: [{
                    	xtype: 'hidden',
                    	name: 'id'
                    },{
                        fieldLabel: '账号',
                        name: 'account',
                        allowBlank: false,
                        blankText: '账号不能为空'
                    },{
                        fieldLabel: '密码',
                        name: 'password',
                        blankText: '密码不能为空'
                    },{
                        fieldLabel: '姓名',
                        name: 'name',
                        allowBlank: false,
                        blankText: '姓名不能为空'
                    },{
                        fieldLabel: '状态',
                        name: 'status',
                        anchor: '50%',
                        xtype: 'combo',
                        store: Ext.create('Ext.data.SimpleStore',{
                        	reload: true,
                            fields: ['text','value'],
                            data: [
                                ['启用',1],
                                ['禁用',0]
                            ]
                        }),
                        displayField: 'text',
                        valueField: 'value',
        				triggerAction: 'all',
                        mode: 'local',
                        hiddenName: 'status',
                        editable: false,
                        emptyText: '请选择',
                        allowBlank: false,
                        blankText: '请选择状态'
                    }]
                }],
                buttons: [{
    	            text: '确定',
    	            handler: self.handlerUpdateUserOk,
    	            scope: self
    	        },{
    	            text: '取消',
    	            handler: self.handlerUpdateUserCancel,
    	            scope: self
    	        }]
			});
        }
        
        var updateUserForm = updateUserFormWindow.child('form').getForm();
        updateUserForm.reset();
        updateUserForm.loadRecord(selectedUsers[0]);
       
        updateUserFormWindow.show();
    },
    
    /**
     * 确定修改用户
     */
    handlerUpdateUserOk: function(button,event){
    	var self = this;
    	
    	var updateUserForm = self.getUpdateUserFormWindow().child('form').getForm();
        if(updateUserForm.isValid()){
        	updateUserForm.submit({
                method:'POST',
                url: PATH_USER_UPDATE,
                success: function(form,action){
                    Ext.Msg.alert('信息','用户编辑成功',function(){
                        self.getUpdateUserFormWindow().hide();
                        self.getFrameViewCenter().child('usergridview').store.reload();
                    });
                },
                failure: function(form,action){
                    Ext.Msg.alert('信息','用户编辑失败',function(){
                    	self.getUpdateUserFormWindow().hide();
                    });
                }
            });
        }
    },
    
    handlerUpdateUserCancel: function(button,event){
    	var self = this;
    	self.getUpdateUserFormWindow().hide();
    },
    
     /**
    *   禁用用户
    */
    handlerDisableUser: function(button,event){
    	var self = this;
        
    	var userGridView = self.getFrameViewCenter().child('usergridview');
    	
        var selectedUsers = userGridView.getSelectionModel().getSelection();
     
        //用户未选校验
        if(selectedUsers.length < 1){
            Ext.Msg.alert('信息提示','请先选择用户.');
            return;
        }
       
        var selectedUserIds = '';
        Ext.each(selectedUsers,function(item,index,allItems){
        	selectedUserIds += item.get('id');
        	if(index < allItems.length - 1){
        		selectedUserIds += ',';
        	}
        });
       
     	Ext.Ajax.request({
     		url: PATH_USER_DISABLE,
     		method: 'POST',
     		params: {
     			ids: selectedUserIds
     		},
     		success: function(response,options){
     			Ext.Msg.alert('信息提示','所选用户已成功禁用');
     			userGridView.store.reload();
     		},
     		failure: function(response,options){
     			Ext.Msg.alert('信息提示','禁用用户操作失败');
     		}
     	});  
    },
    
    /**
     * 账号查询
     */
    handlerQueryUser: function(button,event){
        alert('账号查询');
    }
    
});


