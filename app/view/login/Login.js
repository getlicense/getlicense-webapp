Ext.define('getlicense.view.login.Login', {

    extend: 'Ext.window.Window',

    requires: [
       'getlicense.view.login.LoginController',
       'Ext.form.Panel',
       'getlicense.model.Session'
   ],

    xtype: 'login',

    controller: 'login',

    /**
     * Return the form of the window.
     */
    getForm: function () {
        return this.lookupReference('form').getForm();
    },

    items: {
        xtype: 'form',
        reference: 'form',
        bodyPadding: '12px 10px',
        items: [{
            xtype: 'textfield',
            name: 'username',
            fieldLabel: 'Username',
            allowBlank: false,
            margin: '0 0 10px 0'
        }, {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Password',
            allowBlank: false
        }, {
            xtype: 'displayfield',
            hideEmptyLabel: false,
            value: 'Enter any non-blank password'
        }],

        buttons: [{
            xtype: 'panel',
            ui: 'footer',
            itemId: 'status',
            bodyPadding: '0 0 0 27'
        },
        '->',
        {
            text: 'Login',
            formBind: true,
            listeners: { click: 'onLogin' }
        }]
    },

    initComponent: function() {
        this.callParent(arguments);
        var session = Ext.create('getlicense.model.Session');
        this.getForm().loadRecord(session);
    },

    title: 'Login form',
    closable: false,
    autoShow: true,
    resizable: false,
    draggable: false
});
