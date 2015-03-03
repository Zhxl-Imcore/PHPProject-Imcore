Ext.define('admin.advertisement.store.AdvSlideShowGridViewStore',{
    extend: 'Ext.data.Store',
    
    requires: 'admin.advertisement.model.AdvSlideShowModel',
    model: 'admin.advertisement.model.AdvSlideShowModel',
    
    //分页条目
    pageSize: 20,

    proxy: {
        type: 'ajax',
        url: PATH_ADVERTISEMENT_SLIDESHOW_QUERY,
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