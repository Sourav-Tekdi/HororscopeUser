const menuData = [
    {
        title: 'Dashboard',
        icon: 'zmdi zmdi-view-dashboard',
        path: '/',
        submenu: [],
        role: ['admin', 'astrologer']
    },
    {
        title: 'Astrologers',
        icon: 'fa fa-users',
        path: '/astrologers',
        submenu: [
            {
                title: 'Add Astrologers',
                path: '/astrologers/add',
                icon: 'zmdi zmdi-star-outline'
            },
            {
                title: 'All Astrologers',
                path: '/astrologers',
                icon: 'zmdi zmdi-star-outline'
            }
        ],
        role: ['admin']
    },
    {
        title: 'Categories',
        icon: 'fa fa-list-alt',
        path: '/category',
        submenu: [
            {
                title: 'Add Category',
                path: '/category/add',
                icon: 'zmdi zmdi-star-outline'
            },
            {
                title: 'All Category',
                path: '/category',
                icon: 'zmdi zmdi-star-outline'
            }
        ],
        role: ['admin']
    },
    {
        title: 'Products',
        icon: 'fa fa-cart-plus',
        path: '/products',
        submenu: [
            {
                title: 'Add Products',
                path: '/products/add',
                icon: 'zmdi zmdi-star-outline'
            },
            {
                title: 'All Products',
                path: '/products',
                icon: 'zmdi zmdi-star-outline'
            }
        ],
        role: ['admin']
    },
    {
        title: 'Posts',
        icon: 'fa fa-globe',
        path: '/posts',
        submenu: [
            {
                title: 'All Post',
                path: '/post',
                icon: 'zmdi zmdi-star-outline'
            },
            {
                title: 'Add Post',
                path: '/post/add',
                icon: 'zmdi zmdi-star-outline'
            },
            {
                title: 'My Post',
                path: '/mypost',
                icon: 'zmdi zmdi-star-outline'
            }
        ],
        role: ['admin', 'astrologer']
    }, 
    {
        title: 'FAQ',
        icon: 'fa fa-question-circle',
        path: '/faq',
        submenu: [
            {
                title: 'Add FAQ',
                path: '/faq/add',
                icon: 'zmdi zmdi-star-outline'
            },
            {
                title: 'All FAQ',
                path: '/faq',
                icon: 'zmdi zmdi-star-outline'
            }
        ],
        role: ['admin']
    }, 
    {
        title: 'Contact Us',
        icon: 'fa fa-address-book',
        path: '/contact',
        submenu: [],
        role: ['admin']
    },
    {
        title: 'Chat',
        icon: 'far fa-comment-dots',
        path: '/chat',
        submenu: [],
        role: ['astrologer']
    },
];

export default menuData;
