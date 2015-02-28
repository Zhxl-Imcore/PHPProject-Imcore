/**
 * 用户模型
 */
Ext.define('admin.user.model.UserModel',{
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
        defaultValue: 0
    },{
        name: 'last_login_time',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    },{
        name: 'last_login_ip',
        type: 'string',
        convert:function(value,model){
            return value == null? '从未登录' : value;
        }
    }]
});


