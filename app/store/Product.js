Ext.define('getlicense.store.Product', {

    extend: 'Ext.data.Store',

    alias: 'store.product',

    requires: [
        'Ext.data.proxy.Rest',
        'getlicense.model.Product'
    ],

    model: 'getlicense.model.Product',

    proxy: {
        type: 'rest',
        reader: {
            type: 'json'
        }
    },
    autoLoad: false,
    sorters: [ { property: 'name', direction: 'ASC' } ],

    constructor: function(config) {
        this.callParent(arguments);
        this.getProxy().setUrl(getlicense.Constants.APIBASE_URL + '/product');
    }

});