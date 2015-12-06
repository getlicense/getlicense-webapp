Ext.define('getlicense.store.LicenseType', {

    extend: 'Ext.data.Store',

    alias: 'store.licenseType',

    requires: [
        'Ext.data.proxy.Rest',
        'getlicense.model.LicenseType'
    ],

    model: 'getlicense.model.LicenseType',

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
        this.getProxy().setUrl(getlicense.Constants.APIBASE_URL + '/license/type');
    }

});