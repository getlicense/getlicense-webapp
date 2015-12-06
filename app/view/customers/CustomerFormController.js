Ext.define('getlicense.view.customers.CustomerFormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.customerform',

    requires: [],

    onSave: function() {
        var me = this;
        var form = me.getView().getForm();
        form.updateRecord();
        if (form.isValid()) {
            var customer = form.getRecord();
            customer.save({
                success: function(record, operation) {
                    me.getView().fireEvent('saved');
                    me.closeView();
                },
                failure: function(record, operation) {
                    var validation = Ext.JSON.decode(operation.getError().response.responseText);
                    form.markInvalid(validation.extra);
                }
            });
        }
    }
});
