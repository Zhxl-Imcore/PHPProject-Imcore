Ext.define('admin.news.store.NewsGridViewStore',{
    extend: 'Ext.data.Store',
    
    requires: 'admin.news.model.NewsModel',
    model: 'admin.news.model.NewsModel',
    
    //分页条目
    pageSize: 20,

    proxy: {
        type: 'ajax',
        url: PATH_NEWS_QUERY,
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


