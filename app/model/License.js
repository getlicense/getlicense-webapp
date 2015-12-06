Ext.define('getlicense.model.License', {

    extend: 'Ext.data.Model',

    fields: [
         { name: 'id', type: 'int', persist: false },
         { name: 'creation', type: 'date', dateFormat: 'timestamp' },
         { name: 'expiration', type: 'date', dateFormat: 'timestamp' },
         { name: 'url', type: 'string', persist: false },
         { name: 'customer', reference: 'getlicense.model.Customer' },
         { name: 'product', reference: 'getlicense.model.Product' },
         { name: 'properties' }
    ],

    proxy: {
        type: 'rest',
        reader: {
            type: 'json'
        }
    },

    constructor: function(config) {
        this.callParent(arguments);
        this.getProxy().setUrl(getlicense.Constants.APIBASE_URL + '/license');
    }

});