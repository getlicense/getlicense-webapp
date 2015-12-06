Ext.define('getlicense.view.login.LoginController', {

    extend: 'Ext.app.ViewController',

    requires: [
        'getlicense.view.main.Main',
        'getlicense.store.Session',
        'getlicense.SessionManager'
    ],

    alias: 'controller.login',

    onLogin: function() {
        var me = this;
        var form = me.getView().getForm();
        form.updateRecord();
        if (form.isValid()) {
            var session = form.getRecord();
            session.save({
                success: function(record, operation) {
                    getlicense.SessionManager.init({
                        identifier: record.get('extra').GL_SESSION_ID,
                        username: 'recena'
                    });
                    me.getView().destroy();
                    Ext.widget('app-main');
                },
                failure: function(record, operation) {
                    var validation = Ext.JSON.decode(operation.getError().response.responseText, true);
                    if (validation) {
                        var status = me.getView().down('#status');
                        status.addCls('status-warning');
                        status.update(validation.description);
                        form.markInvalid([{
                            id: 'username',
                            msg: 'Verify your username'
                        }, {
                            id: 'password',
                            msg: 'Verify your password'
                        }]);
                    } else {
                        Ext.Msg.alert('Failure', 'Something was wrong');
                    }
                }
            });
        }

    }
});
