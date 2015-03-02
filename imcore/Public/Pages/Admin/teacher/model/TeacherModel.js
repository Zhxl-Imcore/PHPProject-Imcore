/**
 * 讲师团队模型
 */
Ext.define('admin.teacher.model.TeacherModel',{
	extend: 'Ext.data.Model',
	
	fields: [{
		name: 'id',
		type: 'int'
	},{
		name: 'title',
		type: 'string'
	},{
		name: 'job',
		type: 'string'
	},{
		name: 'introduce',
		type: 'string'
	},{
		name: 'photo_path',
		type: 'string'
	},{
		name: 'student_hope',
		type: 'string'
	},{
		name: 'teach_idea',
		type: 'string'
	},{
		name: 'published_book',
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
	},{
		name: 'user.account',
		type: 'string'
	}]
});