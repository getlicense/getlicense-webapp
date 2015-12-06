Ext.define('getlicense.store.License', {

    extend: 'Ext.data.Store',

    alias: 'store.license',

    requires: [
        'Ext.data.proxy.Rest',
        'getlicense.model.License'
    ],

    model: 'getlicense.model.License',

    proxy: {
        type: 'rest',
        reader: {
            type: 'json'
        }
    },
    autoLoad: false,
    sorters: [ { property: 'product', direction: 'ASC' } ],

    constructor: function(config) {
        this.callParent(arguments);
        this.getProxy().setUrl(getlicense.Constants.APIBASE_URL + '/license');
    }

});