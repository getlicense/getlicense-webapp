Ext.define('getlicense.view.main.MenuController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'getlicense.view.customers.Customers',
        'getlicense.view.products.Products',
        'getlicense.view.licenses.Licenses'
    ],

    alias: 'controller.menu',

    onSelectCustomers: function (button, e, eOpts) {
        button.setPressed(true);
        var body = Ext.getCmp('app-body');
        body.removeAll();
        body.add({
            xtype: 'customers'
        });
    },

    onSelectProducts: function (button, e, eOpts) {
        button.setPressed(true);
        var body = Ext.getCmp('app-body');
        body.removeAll();
        body.add({
            xtype: 'products'
        });
    },

    onSelectLicenses: function (button, e, eOpts) {
        button.setPressed(true);
        var body = Ext.getCmp('app-body');
        body.removeAll();
        body.add({
            xtype: 'licenses'
        });
    },

    onLogout: function (button, e, eOpts) {
        var localstore = Ext.create('getlicense.store.Session');
        localstore.load();
        var localsession = localstore.first();
        if (localsession) {
            var remotesession = Ext.create('getlicense.model.Session', { id: localsession.get('identifier') });
            // Removing the session in backend (remote)
            remotesession.erase({
                success: function(record, operation) {
                    // Removing the session in frontend (local)
                    localsession.erase({
                        success: function(record, operation) {
                            localstore.getProxy().clear();
                            localstore.data.clear();
                            localstore.sync();
                            history.go(0);
                        },
                        failure: function(record, operation) {
                            console.log('Something was wrong');
                        }
                    });
                },
                failure: function(record, operation) {
                    console.log('Something was wrong');
                }
            });
        }
    }
});
