Ext.define('admin.user.store.UserGridViewStore',{
    extend: 'Ext.data.Store',
    
    requires: 'admin.user.model.UserModel',
    model: 'admin.user.model.UserModel',
    
    //分页条目
    pageSize: 20,

    proxy: {
        type: 'ajax',
        url: PATH_USER_QUERY,
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


