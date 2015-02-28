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
	defaultItemIndex: 'undefined',
	
	initComponent: function(){
		var self = this;
		
		if(self.textValueItems != 'undefined'){
			var store = Ext.create('Ext.data.ArrayStore',{
				autoLoad: true,
				fields: ['text','value'],
				data: self.textValueItems
			});
			
			//如果设置了默认项，则设置默认值
			if(self.defaultItemIndex != 'undefined'){
				self.listeners = {
					//渲染之后，显示之前
			 		beforeshow: function(combo){
			 			combo.select(store.getAt(self.defaultItemIndex));
			 		}
				};
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
			});
			
		}
		
		self.callParent(arguments);
	} 
});