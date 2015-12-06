Ext.define('getlicense.store.Customer', {

    extend: 'Ext.data.Store',

    alias: 'store.customer',

    requires: [
        'Ext.data.proxy.Rest',
        'getlicense.model.Customer'
    ],

    model: 'getlicense.model.Customer',

    proxy: {
        type: 'rest',
        reader: {
            type: 'json'
        }
    },
    autoLoad: false,
    sorters: [ { property: 'company', direction: 'ASC' } ],

    constructor: function(config) {
        this.callParent(arguments);
        this.getProxy().setUrl(getlicense.Constants.APIBASE_URL + '/customer');
    }

});
