Ext.define('getlicense.view.customers.Customers', {

    extend: 'Ext.grid.Panel',

    controller: 'customers',

    xtype: 'customers',

    requires:[
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'getlicense.store.Customer'
    ],

    itemId: 'customers',

    dockedItems: {
        xtype: 'toolbar',
        dock: 'top',
        items: [{ iconCls: 'action-add', handler: 'onAdd' }]
    },

    disableSelection: true,

    initComponent: function() {
        var me = this;
        me.store = Ext.create('getlicense.store.Customer');
        me.store.load({
            scope: me,
            callback: function(records, operation, success) {
                if (!success) {
                    Ext.Msg.alert('Something was wrong', 'Please, contact with...');
                    // Usar una ventana, personalizar e incluir el contenido de operation)
                }
            }
        });

        var country = Ext.create('getlicense.store.Country');
        me.columns = [
            { text: "COMPANY", flex: 1, dataIndex: 'company' },
            { text: "TAX ID", width: 140, dataIndex: 'taxid' },
            {
                text: "COUNTRY",
                width: 140,
                dataIndex: 'country',
                renderer: function(value, metaData) {
                    if (value) {
                        var record = country.findRecord('code', value);
                        return record.get('name');
                    }
                }
            }, {
                xtype: 'actioncolumn',
                width: 100,
                sortable: false,
                hideable: false,
                menuDisabled: true,
                align: 'center',
                items: [{
                    iconCls: 'action-edit',
                    handler: 'onEdit'
                }, {
                    iconCls: 'action-remove',
                    handler: 'onRemove'
                }]
            }
        ];
        this.callParent(arguments);
    },

    padding: '20',
    border: false
});