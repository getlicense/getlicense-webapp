Ext.define('getlicense.view.products.Products', {

    extend: 'Ext.grid.Panel',

    controller: 'products',

    xtype: 'products',

    requires:[
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'getlicense.store.Product'
    ],

    itemId: 'products',

    columns: [
        { text: "PRODUCT NAME", flex: 6, dataIndex: 'name' },
        { text: "LICENSE TYPES", flex: 1, dataIndex: 'licenseTypes' },
        {
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
            }, {
                iconCls: 'action-addlicensetype',
                handler: 'onAddLicenseType'
            }]
        }
    ],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{ iconCls: 'action-add', handler: 'onAdd' }]
    }],

    disableSelection: true,

    initComponent: function() {
        var me = this;
        me.store = Ext.create('getlicense.store.Product');
        me.store.load({
            scope: this,
            callback: function(records, operation, success) {
                if (!success) {
                    Ext.Msg.alert('Something was wrong', 'Please, contact with...');
                    // Usar una ventana, personalizar e incluir el contenido de operation)
                }
            }
        });
        this.callParent(arguments);
    },

    padding: '20',
    border: false
});