Ext.define('getlicense.view.licenses.LicensesController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'getlicense.view.licenses.LicenseForm'
    ],

    alias: 'controller.licenses',

    onAdd: function(button, e, eOpts) {
        var me = this;
        var win = Ext.create('getlicense.view.licenses.LicenseForm', {
            listeners: {
                save: {
                    fn: me.onRefresh,
                    scope: me
                }
            }
        });
        var license = Ext.create('getlicense.model.License');
        win.getViewModel().set('license', license);
        win.show();
    },

    onRemove: function(grid, rowIndex, colIndex) {
        var me = this;
        Ext.MessageBox.confirm('Delete', 'Do you confirm this action?', function(buttonId) {
            if (buttonId === 'yes') {
                var record = me.getView().getStore().getAt(rowIndex);
                Ext.Ajax.request({
                    method: 'DELETE',
                    url: getlicense.Constants.APIBASE_URL + '/license/' + record.get('id'),
                    success: function(response, opts) {
                        me.getView().getStore().load();
                    },
                    failure: function(response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                    }
                });
            }
        });
    },

    onRefresh: function() {
        var me = this;
        me.getView().getStore().load();
    },

    onDownload: function(grid, rowIndex, colIndex) {
        var me = this;
        var record = me.getView().getStore().getAt(rowIndex);
        Ext.create('getlicense.view.licenses.LicenseFormatForm', {
            license: record
        }).show();
    }
});