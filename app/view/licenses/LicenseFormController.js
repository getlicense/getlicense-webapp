Ext.define('getlicense.view.customers.LicenseFormController', {

    extend: 'Ext.app.ViewController',

    alias: 'controller.licenseform',

    requires: [ 'getlicense.model.License' ],

    onPrevStep: function(button, event) {
        var step = this.getView().getLayout().getPrev();
        if (step) {
            var index = this.getView().items.indexOf(step);
            var nextBtn = button.nextSibling('#next');
            if (index === 0) {
                button.setDisabled(true);
            } else if (index === (this.getView().items.length - 2)) {
                nextBtn.setText('Next step');
            }
            this.getView().setActiveItem(step);
            var status = this.getView().down('#status');
            status.removeCls('status-warning');
            status.update('');
        }
    },

    onNextStep: function(button, event) {
        var me = this;
        var current = me.getView().getLayout().getActiveItem();
        var step = me.getView().getLayout().getNext();

        if (step) {
            var index = me.getView().items.indexOf(step);
            var last = me.getView().items.length;

            var status = null;
            if ((index < last) && current.getSelection().length === 1) {
                var prevBtn = button.previousSibling('#prev');
                if (index === (last - 1)) {
                    button.setText('Save');
                } else if (index === 1) {
                    prevBtn.setDisabled(false);
                } else {
                    button.setText('Next step');
                }
                if (step.getReference() === 'licenseTypes') {
                    var productId = current.getSelection()[0].get('id');
                    step.getStore().clearFilter();
                    step.getStore().filterBy(function(record, id) {
                        return record.get('product').id === productId ? true : false;
                    });
                    step.getStore().load();
                } else if (step.getReference() === 'attributes') {
                    var licenseType = me.getView().lookupReference('licenseTypes').getSelection()[0];
                    var source = {}, sourceConfig = {};
                    for (var i = 0; i < licenseType.get('attributes').length; i++) {
                        source[licenseType.get('attributes')[i]] = null;
                        sourceConfig[licenseType.get('attributes')[i]] = { type: 'string' };
                    }
                    source.expiration = Ext.Date.add(new Date(), Ext.Date.DAY, licenseType.get('expiration'));
                    sourceConfig.expiration = {
                        type: 'date',
                        renderer: function(date) {
                            return Ext.Date.format(date, 'd-M-Y');
                        }
                    };
                    step.setSource(source, sourceConfig);
                }
                me.getView().setActiveItem(step);
                status = me.getView().down('#status');
                status.removeCls('status-warning');
                status.update('');
            } else {
                status = me.getView().down('#status');
                status.addCls('status-warning');
                status.update('You must select one');
            }
        } else {
            me.save();
        }
    },

    /**
     * Must be invoked only from controller.
     */
    save: function() {
        var me = this;
        var customers = me.lookupReference('customers');
        var products = me.lookupReference('products');
        var attributes = me.lookupReference('attributes');
        var properties = [];
        var j = 0;
        for (var i = 0; i < attributes.getStore().getData().length; i++) {
            var value = attributes.getStore().getData().getAt(i).get('value');
            var name = attributes.getStore().getData().getAt(i).get('name');
            if (value !== null && name !== 'expiration') {
                var property = {
                    name: name,
                    value: value
                };
                properties[j] = property;
                j++;
            }
        }
        var license = new getlicense.model.License({
            creation: Ext.Date.format(new Date(), 'timestamp'),
            expiration: Ext.Date.format(attributes.getSource().expiration, 'timestamp'),
            product: { id: products.getSelection()[0].get('id') },
            customer: { id: customers.getSelection()[0].get('id') },
            properties: properties
        });
        license.save({
            success: function(record, operation) {
                me.getView().fireEvent('save');
                me.closeView();
            }
        });
    }
});