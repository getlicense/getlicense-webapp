Ext.define('getlicense.view.customers.CustomerForm', {

    extend: 'Ext.window.Window',

    controller: 'customerform',

    xtype: 'customer',

    requires:[
        'Ext.window.Window',
        'Ext.form.Panel',
        'Ext.form.field.Hidden',
        'Ext.form.field.ComboBox'
    ],

    /**
     * Return the form of the window.
     */
    getForm: function () {
        return this.query('form')[0].getForm();
    },

    initComponent: function() {
        var me = this;
        var country = Ext.create('getlicense.store.Country');
        me.items = [{
            xtype: 'form',
            layout: {
                type: 'vbox',
                padding: '14'
            },
            fieldDefaults: {
                margin: '0 0 12 0',
                width: '100%',
                labelWidth: 90,
                labelAlign: 'right',
                labelSeparator: '',
                labelPad: 10
            },
            items: [
                { xtype: 'textfield', name: 'company', fieldLabel: 'Company' },
                { xtype: 'textfield', name: 'fname', fieldLabel: 'First Name' },
                { xtype: 'textfield', name: 'lname', fieldLabel: 'Last Name', margin: '0 0 30 0' },
                { xtype: 'textfield', name: 'street', fieldLabel: 'Street' },
                { xtype: 'textfield', name: 'postalCode', fieldLabel: 'Postal Code' },
                { xtype: 'textfield', name: 'city', fieldLabel: 'City' },
                { xtype: 'textfield', name: 'state', fieldLabel: 'State' },
                {
                    xtype: 'combo',
                    name: 'country',
                    fieldLabel: 'Country',
                    store: country,
                    queryMode: 'local',
                    valueField: 'code',
                    displayField: 'name'
                },
                { xtype: 'textfield', name: 'email', fieldLabel: 'Email' },
                { xtype: 'textfield', name: 'web', fieldLabel: 'Web', margin: '0 0 30 0' },
                { xtype: 'textfield', name: 'taxid', fieldLabel: 'Tax ID' },
                { xtype: 'hidden', name: 'id' }
            ]
        }];
        me.buttons = [{ text: 'Save', handler: 'onSave' }];
        me.buttonAlign = 'center';
        me.callParent(arguments);
    },

    itemId: 'customer-form',
    resizable: false,
    modal: true,
    width: 400,
    height: 550
});