Ext.define('getlicense.model.Customer', {

    extend: 'Ext.data.Model',

    identifier: 'sequential',

    fields: [
         { name: 'id', type: 'int' },
         { name: 'company', type: 'string' },
         { name: 'fname', type: 'string' },
         { name: 'lname', type: 'string' },
         { name: 'street', type: 'string' },
         { name: 'postalCode', type: 'string' },
         { name: 'city', type: 'string' },
         { name: 'state', type: 'string' },
         { name: 'country', type: 'string' }, // COUNTRY_CODE (ISO 3166-1)
         { name: 'email', type: 'string' },
         { name: 'web', type: 'string' },
         { name: 'taxid', type: 'string' }
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
        this.getProxy().setUrl(getlicense.Constants.APIBASE_URL + '/customer');
    }

});