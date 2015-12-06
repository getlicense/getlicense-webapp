Ext.define('getlicense.view.main.Menu', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.container.ButtonGroup',
        'Ext.button.Button',
        'Ext.button.Segmented',
        'Ext.layout.container.SegmentedButton'
    ],

    xtype: 'app-menu',

    controller: 'menu',

    items: [{
        xtype: 'segmentedbutton',
        vertical: true,
        items: [{
            text: 'Licenses',
            scale: 'medium',
            listeners: { click: 'onSelectLicenses' }
        }, {
            text: 'Customers',
            scale: 'medium',
            listeners: { click: 'onSelectCustomers' }
        }, {
            text: 'Products',
            scale: 'medium',
            listeners: { click: 'onSelectProducts' }
        }]
    }, {
        xtype: 'component',
        flex: 1
    },{
        xtype: 'button',
        text: 'Logout',
        scale: 'medium',
        listeners: { click: 'onLogout' }
    }],

    layout: {
        type: 'vbox',
        align: 'stretch',
        padding: '20'
    },

    bodyStyle: {
        background: '#F6F6F6'
    }
});