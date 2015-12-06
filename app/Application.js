Ext.define('getlicense.Application', {

    extend: 'Ext.app.Application',

    name: 'getlicense',

    views: [
        'getlicense.view.login.Login',
        'getlicense.view.main.Main',
        'getlicense.view.main.Menu',
        'getlicense.view.customers.Customers',
        'getlicense.view.customers.CustomerForm',
        'getlicense.view.products.Products',
        'getlicense.view.products.ProductForm',
        'getlicense.view.products.LicenseTypeForm',
        'getlicense.view.licenses.Licenses',
        'getlicense.view.licenses.LicenseForm',
        'getlicense.view.licenses.LicenseFormatForm'
    ],

    controllers: [],

    stores: [
        'getlicense.store.Country',
        'getlicense.store.Customer',
        'getlicense.store.License',
        'getlicense.store.LicenseType',
        'getlicense.store.Product'
    ],

    requires: [
        'getlicense.Constants',
        'getlicense.DownloadLink',
        'getlicense.SessionManager'
    ],

    init: function(application) {
        getlicense.SessionManager.init();
        // TODO: Validate session using GL_SESSION_ID
        if (getlicense.SessionManager.isInitialized()) {
            Ext.widget('app-main');
        } else {
            Ext.widget('login');
        }
    },

    launch: function(profile) {
        Ext.create('Ext.panel.Panel', {
            renderTo: document.body,
            border: false,
            hidden: true,
            items: [{
                xtype: 'downloadlink',
                id: 'downloadlink'
            }]
        }).show();
    }
});
