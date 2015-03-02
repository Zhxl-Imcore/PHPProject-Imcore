Ext.define('admin.teacher.store.TeacherGridViewStore',{
    extend: 'Ext.data.Store',
    
    requires: 'admin.teacher.model.TeacherModel',
    model: 'admin.teacher.model.TeacherModel',
    
    //分页条目
    pageSize: 20,

    proxy: {
        type: 'ajax',
        url: PATH_TEACHER_INDEX,
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