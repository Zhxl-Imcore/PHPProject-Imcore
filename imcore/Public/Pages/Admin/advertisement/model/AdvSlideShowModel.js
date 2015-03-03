/**
 * 讲师团队模型
 */
Ext.define('admin.advertisement.model.AdvSlideShowModel',{
	extend: 'Ext.data.Model',
	
	fields: [{
		name: 'id',
		type: 'int'
	},{
		name: 'title',
		type: 'string'
	},{
		name: 'hyperlink',
		type: 'string'
	},{
		name: 'photo_path',
		type: 'string'
	},{
		name: 'order',
		type: 'int'
	},{
		name: 'user.account',
		type: 'string'
	},{
		name: 'create_time',
		type: 'date',
		dateFormat: 'Y-m-d H:i:s'
	},{
		name: 'update_time',
		type: 'date',
		dateFormat: 'Y-m-d H:i:s'
	},{
		name: 'status',
		type: 'string'
	}]
});