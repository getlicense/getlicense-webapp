/**
 * Singleton class.
 *
 * Session information can be accessed in a static way:
 *
 *    getLicense.SessionManager.getSessionId();
 *    getLicense.SessionManager.getUsername();
 */
Ext.define('getlicense.SessionManager', {

    singleton: true,

    session: null,

    initialized: false,

    init: function(session) {
        var localstore = Ext.create('getlicense.store.Session');
        localstore.load();
        if (session) {
            // new session, set it up
            this.clear();
            localstore.add(session);
            localstore.sync();
            this.initialized = true;
        }
        this.session = localstore.first();
        if (this.session) {
            Ext.Ajax.setDefaultHeaders({
                'GL_SESSION_ID': this.session.get('identifier')
            });
            this.initialized = true;
        } else {
            this.initialized = false;
        }
    },

    getSessionId: function() {
        if (this.initialized) {
            return this.session.get('identifier');
        }
        return null;
    },

    getUsername: function() {
        if (this.initialized) {
            return this.session.get('username');
        }
        return null;
    },

    clear: function() {
        var localstore = Ext.create('getlicense.store.Session');
        localstore.load();
        localstore.getProxy().clear();
        localstore.data.clear();
        localstore.sync();
    },

    isInitialized: function() {
        return this.initialized;
    }
});