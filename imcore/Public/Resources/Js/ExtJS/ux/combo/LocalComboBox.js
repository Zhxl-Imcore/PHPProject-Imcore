/**
 * 本地数据源的ComboBox
 */
Ext.define('Ext.ux.combo.LocalComboBox',{
	extend: 'Ext.form.ComboBox',
	alias: 'widget.localcombo',
	
	/**
	 * 自定义的成员
	 */
	textValueItems: 'undefined',
	defaultItemValue: 'undefined',
	
	initComponent: function(){
		var self = this;
		
		if(self.textValueItems != 'undefined'){
			var store = Ext.create('Ext.data.ArrayStore',{
				autoLoad: true,
				fields: ['text','value'],
				data: self.textValueItems
			});
			
			if(self.defaultItemValue != 'undefined'){
				self.value = self.defaultItemValue;
			}
			
			Ext.apply(self,{
				queryModel: 'local',
				triggerAction: 'all',
				editable: false,
				allowBlank: false,
				blankText: '请选择一个值',
				//emptyText: '请选择...',
				store: store,
				displayField: 'text',
	            valueField: 'value'
	            //value: self.defaultItemIndex
			});
			
		}
		
		Ext.ux.combo.LocalComboBox.superclass.initComponent.call(this);
	} 
});