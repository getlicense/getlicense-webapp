Ext.define('getlicense.view.products.LicenseTypeFormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.licensetypeform',

    requires: [],

    onSave: function() {
        var me = this;
        var formPanel = me.getView().lookupReference('licenseTypeForm');
        var form = formPanel.getForm();
        if (form.isValid()) {
            var attributes = me.getView().lookupReference('attributes');
            var attrs = [];
            attributes.getStore().each(function(record, idx) {
                attrs.push(record.get('attribute'));
            });
            var id = form.findField('id').getValue();
            var json = {
                name: form.findField('name').getValue(),
                expiration: form.findField('expiration').getValue(),
                product: {
                    id: this.getView().productId
                }
            };
            if (attrs.length > 0) {
                json.attributes = attrs;
            }
            Ext.Ajax.request({
                method: id !== '' ? 'PUT' : 'POST',
                url: id !== '' ? getlicense.Constants.APIBASE_URL + '/license/type/' + id : getlicense.Constants.APIBASE_URL + '/license/type',
                jsonData: Ext.JSON.encode(json),
                success: function(response, opts) {
                    me.onRefresh();
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }
    },

    onRemove: function(grid, rowIndex, colIndex) {
        var me = this;
        Ext.MessageBox.confirm('Delete', 'Do you confirm this action?', function(buttonId) {
            if (buttonId === 'yes') {
                var grid = me.getView().lookupReference('licenseTypes');
                var record = grid.getStore().getAt(rowIndex);
                Ext.Ajax.request({
                    method: 'DELETE',
                    url: getlicense.Constants.APIBASE_URL + '/license/type/' + record.get('id'),
                    success: function(response, opts) {
                        me.onRefresh();
                    },
                    failure: function(response, opts) {
                        console.log('server-side failure with status code ' + response.status);
                    }
                });
            }
        });
    },

    onReset: function() {
        var me = this;
        me.onRefresh();
    },

    onRefresh: function() {
        var me = this;
        var licenseTypes = me.getView().lookupReference('licenseTypes');
        var formPanel = me.getView().lookupReference('licenseTypeForm');
        var attributes = me.getView().lookupReference('attributes');
        formPanel.reset();
        attributes.getStore().removeAll();
        licenseTypes.getSelectionModel().deselectAll();
        licenseTypes.getStore().load();
    },

    onSelectLicenseType: function(grid, record, tr, rowIndex, e, eOpts) {
        var me = this;
        var licenseTypeId = record.get('id');
        var form = me.getView().lookupReference('licenseTypeForm');
        var attributes = me.getView().lookupReference('attributes');
        attributes.getStore().removeAll();
        getlicense.model.LicenseType.load(licenseTypeId, {
            success: function(licenseType) {
                form.getForm().findField('id').setValue(licenseType.get('id'));
                form.getForm().findField('name').setValue(licenseType.get('name'));
                form.getForm().findField('expiration').setValue(licenseType.get('expiration'));
                var attrs = licenseType.get('attributes');
                attrs.forEach(function(element, index, array) {
                    attributes.getStore().add({ attribute: element });
                });
            }
        });
    },

    onAddAttribute: function() {
        var me = this;
        var attr = me.getView().lookupReference('attribute');
        if (attr.getRawValue().length > 0) {
            var grid = me.getView().lookupReference('attributes');
            grid.getStore().add({ attribute: attr.getRawValue() });
            attr.reset();
        }
    },

    onRemoveAttribute: function(grid, rowIndex, colIndex) {
        var me = this;
        grid.getStore().removeAt(rowIndex);
    }
});
