Ext.define('getlicense.view.products.ProductFormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.productform',

    requires: [],

    onSave: function() {
        var me = this;
        var form = me.getView().getForm();
        form.updateRecord();
        if (form.isValid()) {
            var product = form.getRecord();
            product.save({
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
