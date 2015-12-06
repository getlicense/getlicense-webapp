Ext.define('getlicense.view.products.LicenseTypeForm', {

    extend: 'Ext.window.Window',

    controller: 'licensetypeform',

    requires:[ 'Ext.window.Window' ],

    productId: undefined,

    layout: 'border',

    initComponent: function() {
        var me = this;
        var licenseTypesStore = Ext.create('getlicense.store.LicenseType');
        licenseTypesStore.clearFilter();
        licenseTypesStore.filterBy(function(record, id) {
            return record.get('product').id === me.productId ? true : false;
        });
        licenseTypesStore.load();
        var attributesStore =  Ext.create('Ext.data.ArrayStore', {
            fields: [{ name: 'attribute',  type: 'string' }],
            autoSync: true
        });
        me.items = [{
            xtype: 'panel',
            flex: 2,
            region: 'west',
            layout: 'fit',
            collapsible: false,
            split: true,
            items: [{
                xtype: 'grid',
                padding: '10',
                reference: 'licenseTypes',
                hideHeaders: true,
                disableSelection: false,
                store: licenseTypesStore,
                viewConfig: { stripeRows: false },
                columns: [
                    { text: 'Name', flex: 1, dataIndex: 'name' },
                    {
                        xtype: 'actioncolumn',
                        width: 30,
                        sortable: false,
                        hideable: false,
                        menuDisabled: true,
                        align: 'right',
                        items: [{ iconCls: 'action-remove', handler: 'onRemove' }]
                    }
                ],
                listeners: {
                    rowclick: 'onSelectLicenseType'
                }
            }],
            dockedItems: {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    { xtype: 'panel', html: 'Listing of license types' },
                    '->'
                ]
            }
        }, {
            xtype: 'panel',
            flex: 3,
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'stretch',
                padding: '10'
            },
            dockedItems: {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                   { xtype: 'panel', html: 'Listing of properties' },
                   '->',
                   { text: 'Save', handler: 'onSave' },
                   { text: 'Reset', handler: 'onReset' }
                ]
            },
            items: [{
                xtype: 'form',
                reference: 'licenseTypeForm',
                layout: 'vbox',
                margin: '0 0 10px 0',
                fieldDefaults: {
                    margin: '0 0 10 0',
                    width: '100%',
                    labelWidth: 120,
                    labelAlign: 'right'
                },
                items: [
                    { xtype: 'textfield', name: 'name', fieldLabel: 'Name', allowBlank: false },
                    {
                        xtype: 'combo',
                        name: 'expiration',
                        fieldLabel: 'Default expiration',
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'value',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['value', 'name'],
                            data: [
                                { 'value': 7, 'name': '1 week (7 days)' },
                                { 'value': 15, 'name': '2 weeks (15 days)' },
                                { 'value': 30, 'name': '1 month (30 days)' },
                                { 'value': 90, 'name': '3 month (90 days)' },
                                { 'value': 180, 'name': '6 month (180 days)' },
                                { 'value': 365, 'name': '1 year (365 days)' }
                            ]
                        })
                    },
                    { xtype: 'hidden', name: 'id' }
                ]
            }, {
                xtype: 'grid',
                reference: 'attributes',
                store: attributesStore,
                hideHeaders: true,
                disableSelection: true,
                viewConfig: { stripeRows: false },
                columns: [
                    { name: 'Attribute', flex: 1, dataIndex: 'attribute' },
                    {
                        xtype: 'actioncolumn',
                        width: 30,
                        sortable: false,
                        hideable: false,
                        menuDisabled: true,
                        align: 'right',
                        items: [{
                            iconCls: 'action-remove',
                            handler: 'onRemoveAttribute'
                        }]
                    }
                ],
                dockedItems: {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        { xtype: 'textfield', name: 'attribute', reference: 'attribute', flex: 1 },
                        { text: 'Add attribute', handler: 'onAddAttribute' }
                    ]
                }
            }]
        }];
        me.callParent(arguments);
    },

    itemId: 'licensetype-form',
    title: 'License types',
    resizable: false,
    modal: true,
    width: 800,
    height: 400
});