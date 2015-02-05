/**
 * 用户管理
 */
Ext.define('admin.orgmgr.controller.UserMgrController',{
    extend: 'Ext.app.Controller',
    
    views: [
        'admin.orgmgr.view.UserMgrView'
    ],
    
    models: [
        'admin.orgmgr.model.UserModel'
    ],
    
    stores: [
        'admin.orgmgr.store.UserStore'
    ],
    
    init: function(application){
        var self = this;
 
        var mainViewCenter = application.getController('admin.index.controller.MainController').getMainviewcenter();       
        self.orgMgrUserTabPanel = mainViewCenter.child('usermgrview');
        if(!self.orgMgrUserTabPanel){
            var userStore = Ext.create('admin.orgmgr.store.UserStore');
            self.orgMgrUserTabPanel = Ext.widget('usermgrview',{
                store: userStore,
                dockedItems: [{
                    dock: 'bottom',
                    xtype: 'pagingtoolbar',
                    store: userStore,
                    displayInfo: true,
                    displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
                    emptyMsg: '没有数据'
                },{
                    dock: 'top',
                    xtype: 'toolbar',
                    items: [{
                        text: '查看用户',
                        iconCls: 'Userearth',
                        handler: self.handlerCheckUser,
                        scope: self
                    },{
                        text: '新建用户',
                        iconCls: 'Useradd',
                        handler: self.handlerCreateUser,
                        scope: self
                    },{
                        text: '编辑用户',
                        iconCls: 'Useredit',
                        handler: self.handlerEditUser,
                        scope: self
                    },/*{
                        text: '禁用用户',
                        iconCls: 'Userdelete',
                        handler: self.handlerDisableUser,
                        scope: self
                    }*/,{
                        xtype: 'tbspacer',
                        width: 100
                    },{
                        xtype: 'textfield',
                        emptyText: '请输入要查询的账号',
                        width: 220
                    },{
                        xtype: 'tbspacer',
                        width: 5
                    },{
                        xtype: 'button',
                        text: '查询用户',
                        iconCls: 'Userkey',
                        handler: self.handlerQueryUser,
                        scope: self
                    }]
                }]
            });
            
            mainViewCenter.add(self.orgMgrUserTabPanel);
            self.orgMgrUserTabPanel.store.reload();
        }
        mainViewCenter.setActiveTab(self.orgMgrUserTabPanel);
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
        
        self.createUserWindow = Ext.create('Ext.window.Window',{
            width: 500,
            height: 400,
            title: '新建用户',
            layout: 'fit',
            closable: false,
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
        self.createUserWindow.show();
    },
    
    /**
     *  确定新建用户
     */
    handlerCreateUserOk: function(button,event){
        var self = this;
        
        //basicform
        var createUserForm = self.createUserWindow.child('form').getForm();
        
        if(createUserForm.isValid()){
            createUserForm.submit({
                method:'POST',
                url: APP + '/Admin/OrgMgr/User/userActionCreate',
                success: function(form,action){
                    Ext.Msg.alert('信息','用户创建成功',function(){
                        self.createUserWindow.close();
                        self.orgMgrUserTabPanel.store.reload();
                    });
                },
                failure: function(form,action){
                    Ext.Msg.alert('信息','用户创建失败',function(){
                        self.createUserWindow.close();
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
        self.createUserWindow.close();
    },
    
     /**
    *   编辑用户信息
    */
    handlerEditUser: function(button,event){
        alert('编辑用户信息');
    },
    
     /**
    *   禁用用户
    */
    handlerDeleteUser: function(button,event){
        var self = this;
       
        var selectedUsers = self.orgMgrUserTabPanel.getSelectionModel().getSelection();
        
        //用户未选校验
        if(selectedUsers.length < 1){
            Ext.Msg.alert('信息提示','请先选择用户.');
            return;
        }
        
        console.log(selectedUsers);
    },
    
    /**
     * 账号查询
     */
    handlerQueryUser: function(button,event){
        alert('账号查询');
    }
});


