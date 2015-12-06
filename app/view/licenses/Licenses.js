Ext.define('getlicense.view.licenses.Licenses', {

    extend: 'Ext.grid.Panel',

    controller: 'licenses',

    xtype: 'licenses',

    requires:[
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'getlicense.store.License'
    ],

    itemId: 'licenses',

    columns: [
        { text: 'PRODUCT', flex: 3, dataIndex: 'product', renderer: function(value) { return value.name; } },
        { text: 'CUSTOMER', flex: 3, dataIndex: 'customer', renderer: function(value) { return value.company; } },
        { text: 'CREATION', flex: 2, dataIndex: 'creation', renderer: Ext.util.Format.dateRenderer('d-M-Y') },
        { text: 'EXPIRATION', flex: 2, dataIndex: 'expiration', renderer: Ext.util.Format.dateRenderer('d-M-Y') },
        {
            xtype: 'actioncolumn',
            width: 100,
            sortable: false,
            hideable: false,
            menuDisabled: true,
            align: 'center',
            items: [{
                iconCls: 'action-download',
                handler: 'onDownload'
            }, {
                iconCls: 'action-remove',
                handler: 'onRemove'
            }]
        }
    ],

    dockedItems: {
        xtype: 'toolbar',
        dock: 'top',
        items: [{ iconCls: 'action-add', handler: 'onAdd' }]
    },

    disableSelection: true,

    initComponent: function() {
        var me = this;
        me.store = Ext.create('getlicense.store.License');
        me.store.load({
            scope: me,
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