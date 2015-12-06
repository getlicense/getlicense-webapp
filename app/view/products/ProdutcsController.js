Ext.define('getlicense.view.products.ProductsController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'getlicense.view.products.ProductForm'
    ],

    alias: 'controller.products',

    /**
     * Invoked from action column.
     * Loads a form with the selected product.
     */
    onEdit: function(grid, rowIndex, colIndex) {
        var me = this;
        var id = me.getView().getStore().getAt(rowIndex).get('id');
        var win = Ext.create('getlicense.view.products.ProductForm', {
            listeners: {
                saved: {
                    fn: me.onRefresh,
                    scope: me
                }
            }
        });
        getlicense.model.Product.load(id, {
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
        var win = Ext.create('getlicense.view.products.ProductForm', {
            listeners: {
                saved: {
                    fn: me.onRefresh,
                    scope: me
                }
            },
            defaultFocus: 'name'
        });
        var product = Ext.create('getlicense.model.Product');
        win.getForm().loadRecord(product);
        win.setTitle('New product');
        win.show();
    },

    /**
     * Invoked from action column.
     * Removes the selected product.
     */
    onRemove: function(grid, rowIndex, colIndex) {
        var me = this;
        Ext.MessageBox.confirm('Delete', 'Do you confirm this action?', function(buttonId) {
            if (buttonId === 'yes') {
                var id = me.getView().getStore().getAt(rowIndex).get('id');
                var product = Ext.create('getlicense.model.Product', { id: id });
                product.erase({
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
    },

    onAddLicenseType: function(grid, rowIndex, colIndex) {
        var me = this;
        var id = grid.getStore().getAt(rowIndex).get('id');
        var win = Ext.create('getlicense.view.products.LicenseTypeForm', {
            listeners: {
                close: {
                    fn: me.onRefresh,
                    scope: me
                }
            },
            productId: id
        });
        win.show();
    }
});