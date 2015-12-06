Ext.define('getlicense.view.customers.CustomersController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'getlicense.view.customers.CustomerForm'
    ],

    alias: 'controller.customers',

    /**
     * Invoked from action column.
     * Loads a form with the selected product.
     */
    onEdit: function(grid, rowIndex, colIndex) {
        var me = this;
        var id = me.getView().getStore().getAt(rowIndex).get('id');
        var win = Ext.create('getlicense.view.customers.CustomerForm', {
            listeners: {
                saved: {
                    fn: me.onRefresh,
                    scope: me
                }
            }
        });
        getlicense.model.Customer.load(id, {
            success: function(record, operation) {
                win.getForm().loadRecord(record);
                win.setTitle('Editing');
                win.show();
            },
            failure: function (record, operation) {
                Ext.Msg.alert('Failure', 'Something was wrong');
            }
        });

    },

    /**
     * Invoked from grid toolbar.
     * Opens a form to add a new product.
     */
    onAdd: function(button, e, eOpts) {
        var me = this;
        var win = Ext.create('getlicense.view.customers.CustomerForm', {
            listeners: {
                saved: {
                    fn: me.onRefresh,
                    scope: me
                }
            }
        });
        var customer = Ext.create('getlicense.model.Customer');
        win.getForm().loadRecord(customer);
        win.setTitle('New customer');
        win.show();
    },

    onRemove: function(grid, rowIndex, colIndex) {
        var me = this;
        Ext.MessageBox.confirm('Delete', 'Do you confirm this action?', function(buttonId) {
            if (buttonId === 'yes') {
                var id = me.getView().getStore().getAt(rowIndex).get('id');
                var customer = Ext.create('getlicense.model.Customer', { id: id });
                customer.erase({
                    success: function(record, operation) {
                        me.onRefresh();
                    },
                    failure: function (record, operation) {
                        Ext.Msg.alert('Failure', 'Something was wrong');
                    }
                });
            }
        });
    },

    onRefresh: function() {
        var me = this;
        me.getView().getStore().load();
    }
});