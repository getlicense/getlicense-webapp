Ext.define('getlicense.model.Session', {

    extend: 'Ext.data.Model',

    identifier: 'sequential',

    fields: [
         { name: 'id', type: 'string', persist: false },
         { name: 'username', type: 'string' },
         { name: 'password', type: 'string' }
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
        this.getProxy().setUrl(getlicense.Constants.APIBASE_URL + '/session');
    }
});