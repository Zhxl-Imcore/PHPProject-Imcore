/**
 * 用户模型
 */
Ext.define('admin.orgmgr.model.UserModel',{
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    },{
        name: 'account',
        type: 'string'
    },{
        name: 'name',
        type: 'string'
    },{
        name: 'createtime',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    },{
        name: 'status',
        type: 'int',
        defaultValue: 0,
        convert: function(value,model){
            return value == 1? '启用' : '禁用';
        }
    },{
        name: 'logintime',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    },{
        name: 'loginip',
        type: 'string',
        convert:function(value,model){
            return value == null? '从未登录' : value;
        }
    }]
});


