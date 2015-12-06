Ext.define('getlicense.model.LicenseType', {

    extend: 'Ext.data.Model',

    fields: [
         { name: 'id', type: 'int' },
         { name: 'name', type: 'string' },
         { name: 'expiration', type: 'int' },
         { name: 'attributes' },
         { name: 'product' }
    ],

    proxy: {
        type: 'rest',
        reader: {
            type: 'json'
        }
    },

    filters: {
        filterFn: function(item) {
            return item.get('product').id === this.productId ? true : false;
        }
    },

    productId: undefined,

    constructor: function(config) {
        this.callParent(arguments);
        this.getProxy().setUrl(getlicense.Constants.APIBASE_URL + '/license/type');
    }

});