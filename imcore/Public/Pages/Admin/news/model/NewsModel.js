/**
 * 用户模型
 */
Ext.define('admin.news.model.NewsModel',{
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    },{
        name: 'title',
        type: 'string'
    },{
        name: 'content',
        type: 'string'
    },{
    	name: 'image_ids',
    	type: 'string'
    },{
    	name: 'user.account',
    	type: 'string'
    },{
        name: 'publish_time',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    },{
    	name: 'is_stick',
    	type: 'int'
    },{
        name: 'status',
        type: 'string'
    }]
});


