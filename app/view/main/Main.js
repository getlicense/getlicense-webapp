Ext.define('getlicense.view.main.Main', {

    extend: 'Ext.container.Container',

    plugins: 'viewport',

    requires: [
        'getlicense.view.main.MainController',
        'getlicense.view.main.MainModel',
        'getlicense.view.main.Menu'
    ],

    xtype: 'app-main',

    controller: 'main',

    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [{
        region: 'west',
        xtype: 'app-menu',
        width: 250,
        split: false
    }, {
        region: 'center',
        id: 'app-body',
        layout: 'fit'
    }]
});
