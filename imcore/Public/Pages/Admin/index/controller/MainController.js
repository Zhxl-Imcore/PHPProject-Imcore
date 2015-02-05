/**
 * 管理主界面
 */
Ext.define('admin.index.controller.MainController',{
    extend: 'Ext.app.Controller',
    views: [
        'admin.index.view.MainView',
        'admin.index.view.MainViewNorth',
        'admin.index.view.MainViewWest',
        'admin.index.view.MainViewCenter'
    ],
    
    init: function(application){
        this.control({
            'mainviewwest treepanel': {
                'itemclick': this.onWestTreePanelItemClick
            },
            'mainviewnorth button[id=btn-logout]': {
                'click': this.onLogoutBtnClicked
            }
        });
    },
    
    /**
     * 左侧菜单点击
     */
    onWestTreePanelItemClick: function(view,record,item,index){
        var westTreePanelItemId = record.data.id;
        if('OrgMgr-User' == westTreePanelItemId){
            this.showOrgMgrUserTabPanel();
        }else if('OrgMgr-Role' == westTreePanelItemId){
            this.showOrgMgrRoleTabPanel();
        }else if('OrgMgr-Auth' == westTreePanelItemId){
            this.showOrgMgrAuthTabPanel();
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
                    url: APP + '/Admin/Index/UserAuthorize/userAuthorizeActionLogout',
                    success: function(response,options){
                        Ext.Msg.alert('信息','您已成功退出.',function(){
                             window.location.href = APP + '/Admin/Index/UserAuthorize/userAuthorizeActionLogin';
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
        Ext.require('admin.orgmgr.controller.UserMgrController',function(){
            var userMgrController = this.application.getController('admin.orgmgr.controller.UserMgrController');
            userMgrController.init(this);
        },self);
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
        ref: 'mainviewnorth',
        selector: 'mainviewnorth'
    },{
        ref: 'mainviewwest',
        selector: 'mainviewwest'
    },{
        ref: 'mainviewcenter',
        selector: 'mainviewcenter'
    }]
    
    
});


