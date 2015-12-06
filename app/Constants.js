Ext.define("getlicense.Constants", {

    singleton: true,

    APIBASE_URL: null,

    constructor: function(config) {
        var me = this;
        Ext.Ajax.request({
            async: false,
            url: 'resources/config.json',
            method: 'GET',
            success: function(response, opts) {
                var config = Ext.JSON.decode(response.responseText);
                me.APIBASE_URL = config.APIBASE_URL;
            },
            failure: function(response, opts) {
                Ext.Msg.alert('Failure', 'Something was wrong');
                console.log(response);
            }
        });
        me.initConfig(config);
    }

});
