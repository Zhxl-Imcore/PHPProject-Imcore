/**
 * 管理主界面
 */
Ext.define('admin.frame.controller.FrameController',{
    extend: 'Ext.app.Controller',
    views: [
        'admin.frame.view.FrameView',
        'admin.frame.view.FrameViewNorth',
        'admin.frame.view.FrameViewWest',
        'admin.frame.view.FrameViewCenter'
    ],
    
    init: function(application){
        this.control({
            'frameviewwest treepanel': {
                'itemclick': this.onWestTreePanelItemClick
            },
            'frameviewnorth button[id=btn-logout]': {
                'click': this.onLogoutBtnClicked
            }
        });
    },
    
    /**
     * 左侧菜单点击
     */
    onWestTreePanelItemClick: function(view,record,item,index){
        var westTreePanelItemId = record.raw.itemId;
        if('User-Query' == westTreePanelItemId){
            this.showOrgMgrUserTabPanel();
        }else if('OrgMgr-Role' == westTreePanelItemId){
            //this.showOrgMgrRoleTabPanel();
        }else if('OrgMgr-Auth' == westTreePanelItemId){
            //this.showOrgMgrAuthTabPanel();
        }
        
        /**
         * 果核动态
         */
        else if('News-Query' == westTreePanelItemId){
        	this.showNewsTabPanel();
        }
        
        /**
         * 讲师团队
         */
        else if('Teacher-Query' == westTreePanelItemId){
        	this.showTeacherTabPanel();
        }
    },
    
    /**
     *  登出
     */
    onLogoutBtnClicked: function(){
        Ext.Msg.confirm('信息','确认要退出系统吗？',function(btn){
            var self = this;
            
            if('yes' == btn){
                Ext.Ajax.request({
                    url: PATH_AUTHENTICATE_LOGOUT,
                    success: function(response,options){
                        Ext.Msg.alert('信息','您已成功退出.',function(){
                             window.location.href = PATH_AUTHENTICATE_INDEX;
                        });
                    }
                });
            }
        });
    },
    
    /**
     * 组织机构管理-用户管理
     */
    showOrgMgrUserTabPanel: function(){
        var self = this;
        //动态加载Controller
        Ext.require('admin.user.controller.UserController',function(){
            var userController = this.application.getController('admin.user.controller.UserController');
            userController.initViews();
        },self);
    },
    
    /**
     * 显示果核动态管理面板
     */
    showNewsTabPanel: function(){
    	var self = this;
    	Ext.require('admin.news.controller.NewsController',self.initNewsController,self);
    },
    
    /**
     * 实例化admin.news.controller.NewsController
     */
    initNewsController: function(){
    	var newsController = this.application.getController('admin.news.controller.NewsController');
    	newsController.initViews();
    },
    
     /**
     * 显示讲师团队管理面板
     */
    showTeacherTabPanel: function(){
    	//引入js脚本
    	Ext.require('admin.teacher.controller.TeacherController',this.initTeacherController,this);
    },
    
    /**
     * 实例化admin.teacher.controller.TeacherController
     */
    initTeacherController: function(){
    	this.application.getController('admin.teacher.controller.TeacherController').initViews();
    },
    
    /**
     * 组织机构管理-角色管理
     */
    showOrgMgrRoleTabPanel: function(){
        
    },
    
    /**
     * 组织机构管理-权限管理
     */
    showOrgMgrAuthTabPanel: function(){
        
    },
    
    /**
     * 为各个组件创建检查器和设置器
     */
    refs: [{
        ref: 'frameviewnorth',
        selector: 'frameviewnorth'
    },{
        ref: 'frameviewwest',
        selector: 'frameviewwest'
    },{
        ref: 'frameviewcenter',
        selector: 'frameviewcenter'
    }]
    
    
});


