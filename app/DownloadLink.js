Ext.define('getlicense.DownloadLink', {

    extend: 'Ext.Component',

    alias: 'widget.downloadlink',

    autoEl: {tag: 'iframe', cls: 'x-hidden', src: Ext.SSL_SECURE_URL},

    get: function(config) {
        this.getEl().dom.src = config.url + (config.params ? '?' + Ext.Object.toQueryString(config.params) : '');
    }
});