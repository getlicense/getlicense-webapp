Ext.define('getlicense.store.Session', {

    extend: 'Ext.data.Store',

    alias: 'store.session',

    requires: [ 'Ext.data.proxy.SessionStorage' ],

    fields: [
         { name: 'identifier', type: 'string' },
         { name: 'username', type: 'string' }
    ],

    proxy: {
        type: 'sessionstorage',
        id: 'GL_SESSION'
    }
});