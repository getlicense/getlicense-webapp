Ext.define('getlicense.view.licenses.LicenseFormatForm', {

    extend: 'Ext.window.Window',

    controller: 'licenseformatform',

    xtype: 'licenseformat',

    requires:[
        'Ext.window.Window',
        'Ext.form.Panel',
        'Ext.form.field.Hidden'
    ],

    /**
     * A reference to the downloadable license model.
     * See getlicense.model.License.
     */
    license: null,

    /**
     * Return the form of the window.
     */
    getForm: function() {
        return this.down('form').getForm();
    },

    /**
     * Return the license model.
     */
    getLicense: function() {
        return this.license;
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
            items: [{
                xtype: 'combo',
                name: 'format',
                itemId: 'format',
                fieldLabel: 'Download as',
                labelWidth: 100,
                allowBlank: false,
                queryMode: 'local',
                displayField: 'format',
                valueField: 'id',
                store: Ext.create('Ext.data.Store', {
                    fields: [ 'id', 'format' ],
                    data: [
                        // TODO: read this list form a back-end service
                        { 'id': 'json', 'format': 'JSON' },
                        { 'id': 'props', 'format': 'Properties' }
                    ]
                }),
                value: 'json',
                editable: false
            }]
        }];
        me.buttons = [{ text: 'Download', handler: 'onDownload', reference: 'download' }];
        me.buttonAlign = 'center';
        me.callParent(arguments);
    },
    resizable: false,
    modal: true,
    width: 400,
    height: 140
});