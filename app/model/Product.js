Ext.define('getlicense.model.Product', {

    extend: 'Ext.data.Model',

    identifier: 'sequential',

    fields: [
         { name: 'id', type: 'int' },
         { name: 'name', type: 'string' },
         { name: 'licenseTypes', type: 'int', persist: false }
    ],

    proxy: {
        type: 'rest',
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json',
            writeAllFields: true
        }
    },

    constructor: function(config) {
        this.callParent(arguments);
        this.getProxy().setUrl(getlicense.Constants.APIBASE_URL + '/product');
    }

});