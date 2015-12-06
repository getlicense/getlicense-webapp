Ext.define('getlicense.view.licenses.LicenseForm', {

    extend: 'Ext.window.Window',

    controller: 'licenseform',

    xtype: 'license',

    requires:[
        'Ext.layout.container.Card',
        'Ext.grid.property.Grid'
    ],

    viewModel: true,

    initComponent: function() {
        var me = this;
        var products = Ext.create('getlicense.store.Product', { autoLoad: true });
        var licenseTypes = Ext.create('getlicense.store.LicenseType');
        var customers = Ext.create('getlicense.store.Customer', { autoLoad: true });

        me.items = [{
            xtype: 'grid',
            title: 'Products',
            reference: 'products',
            hideHeaders: true,
            store: products,
            columns: [
                { text: "Name", flex: 1, dataIndex: 'name', menuDisabled: true }
            ],
            activeItem: 0,
            viewConfig: { cls: 'getlicense' }
         }, {
            xtype: 'grid',
            title: 'License types',
            reference: 'licenseTypes',
            hideHeaders: true,
            store: licenseTypes,
            columns: [
                { text: "Name", flex: 1, dataIndex: 'name', menuDisabled: true }
            ],
            viewConfig: { cls: 'getlicense' }
        }, {
            xtype: 'grid',
            title: 'Customers',
            reference: 'customers',
            hideHeaders: true,
            store: customers,
            columns: [
                { text: "Company", flex: 1, dataIndex: 'company', menuDisabled: true }
            ],
            viewConfig: { cls: 'getlicense' }
        }, {
            xtype: 'propertygrid',
            title: 'Attributes',
            reference: 'attributes',
            nameColumnWidth: '50%',
            sortableColumns: false
        }];
        me.buttons = [
            { xtype: 'panel', ui: 'footer', itemId: 'status', bodyPadding: '0 0 0 27' },
            '->',
            { text: 'Prev step', itemId: 'prev', handler: 'onPrevStep', disabled: true },
            { text: 'Next step', itemId: 'next', handler: 'onNextStep' }
        ];
        me.callParent(arguments);
    },

    itemId: 'license-form',
    title: 'New license',
    resizable: false,
    layout: 'card',
    modal: true,
    width: 600,
    height: 400
});