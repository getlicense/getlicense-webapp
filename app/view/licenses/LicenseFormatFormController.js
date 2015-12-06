Ext.define('getlicense.view.licenses.LicenseFormatFormController', {

    extend: 'Ext.app.ViewController',

    alias: 'controller.licenseformatform',

    requires: [],

    onDownload: function() {
        var me = this;
        var form = me.getView().getForm();
        var license = me.getView().getLicense();
        if (form.isValid()) {
            var format = form.findField('format').getValue();

            Ext.getCmp('downloadlink').get({
                url: license.get('url'),
                params: {
                    format: format,
                    GL_SESSION_ID: getlicense.SessionManager.getSessionId()
                }
            });
            me.getView().close();
        }
    }
});
