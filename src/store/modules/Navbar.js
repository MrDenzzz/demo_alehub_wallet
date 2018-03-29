const state = {
    links: [{
        path: '/',
        iconName: 'wallet',
        iconWidth: '23',
        iconHeight: '20.5',
        name: 'wallet'
    },
    //     {
    //     path: '/offers',
    //     iconName: 'jobs-ic',
    //     iconWidth: '24.5',
    //     iconHeight: '22.5',
    //     name: 'offers'
    // }, {
    //     path: '/resume',
    //     iconName: 'wallet',
    //     iconWidth: '23',
    //     iconHeight: '20.5',
    //     name: 'resume'
    // },
        {
        path: '/notifications',
        iconName: 'notifications-ic',
        iconWidth: '20',
        iconHeight: '22',
        isBadge: true,
        name: 'notifications'
    }, {
        path: '/settings',
        iconName: 'settings',
        iconWidth: '19',
        iconHeight: '19',
        name: 'settings'
    }]
};

export default {
    state
};
