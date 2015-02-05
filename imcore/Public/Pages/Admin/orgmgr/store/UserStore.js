Ext.define('admin.orgmgr.store.UserStore',{
    extend: 'Ext.data.Store',
    
    requires: 'admin.orgmgr.model.UserModel',
    model: 'admin.orgmgr.model.UserModel',
    
    //分页条目
    pageSize: 15,

    proxy: {
        type: 'ajax',
        url: APP + '/Admin/OrgMgr/User/index',
        method: 'POST',
        reader: {
            type: 'json',
            successProperty: 'success',
            messageProperty: 'msg',
            totalProperty: 'total',
            root: 'datas'
        }
    }
    
});


