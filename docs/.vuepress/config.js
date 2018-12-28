module.exports = {
  // 网站标题
  title: "Pan's Blog",  
  // 网站描述
  description : 'Just playing around', 
  plugins: ['@vuepress/back-to-top'],

   themeConfig: {
    //  设置导航栏
    nav: require('./nav/zh'),

    // 设置侧栏
	  sidebar: {
	  	/*Object-c*/
      '/oc/runtime/': [
      
      // oc群组
          {
              title: 'Object-c之isa指针',
              collapsable: true,
              children: [
                '/oc/runtime/',
              ]
            },
            {
              title: 'Object-c之对象的本质',
              collapsable: true,
              children: [
                '/oc/runtime/instance1',
                '/oc/runtime/instance2',
              ]
            },





      ],
       '/oc/kvo/': [
        '',
        'kvo',
      ],
      '/oc/runloop/': [
        '',
        'runloop'
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
          'reactnew',
          'reactxianyou',
          'reactjichu',
          'react-flexbox',
          'reactview',
          'reactimg',
        ],
    '/h5/weex/': [
          '',
          'weex-start'
        ],
    '/h5/js/': [
          '',
        ],

    },

    // 设置侧栏深度
    sidebarDepth: 2,
    lastUpdated: '上次更新',
  },
}


