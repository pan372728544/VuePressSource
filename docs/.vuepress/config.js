module.exports = {
  title: 'Hello VuePress',  // 设置网站标题
  description : 'Just playing around', // 网站描述

   themeConfig: {
    //  设置导航栏
    nav: require('./nav/zh'),


    // 设置侧栏
	  sidebar: {
	  	/*Object-c*/
      '/oc/runtime/': [
        '',
        'instance1',    
        'instance2',  
      ],
       '/oc/kvo/': [
        '',
        'kvo',
      ],
      '/oc/runloop/': [
        '',
      ],

	 	/*Swift*/
	 '/swift/': [
	        '',

	      ],

	 	/*c/c++*/
	 '/c/': [
	        '',
	      ],
	 	/*html*/
	 '/h5/cordova/': [
	        '',
	      ],

    '/h5/css/': [
          '',
        ],

    '/h5/html/': [
          '',
        ],
    '/h5/reactnative/': [
          '',
        ],
    '/h5/weex/': [
          '',
        ],
    '/h5/js/': [
          '',
        ],

    },

    // 设置侧栏深度
    sidebarDepth: 2,
    lastUpdated: '更新时间',
  },
}


