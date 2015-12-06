Ext.define('getlicense.view.products.ProductForm', {

    extend: 'Ext.window.Window',

    controller: 'productform',

    requires:[
        'Ext.window.Window',
        'Ext.form.Panel',
        'Ext.form.field.Hidden'
    ],

    /**
     * Return the form of the window.
     */
    getForm: function() {
        return this.query('form')[0].getForm();
    },

    initComponent: function() {
        var me = this;
        me.items = [{
            xtype: 'form',
            layout: 'vbox',
            fieldDefaults: {
                margin: '10',
                width: '100%',
                labelWidth: 70
            },
            items: [
                { xtype: 'textfield', name: 'name', itemId: 'name', fieldLabel: 'Name', allowBlank: false },
                { xtype: 'hidden', name: 'id' }
            ],
            listeners: {
                validitychange: function (basicform, valid, eOpts) {
                    me.lookupReference('save').setDisabled(!valid);
                }
            }
        }];
        me.buttons = [{ text: 'Save', handler: 'onSave', disabled: true, reference: 'save' }];
        me.buttonAlign = 'center';
        me.callParent(arguments);
    },

    itemId: 'product-form',
    resizable: false,
    modal: true,
    width: 400,
    height: 140
});