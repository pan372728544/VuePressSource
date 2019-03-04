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
            {
              title: 'Object-c之RunLoop',
              collapsable: true,
              children: [
                '/oc/runtime/runloop',
              ]
            },
            {
              title: 'Object-c之Category',
              collapsable: true,
              children: [
                '/oc/runtime/category',
              ]
            },
            {
              title: 'Object-c之关联对象',
              collapsable: true,
              children: [
                '/oc/runtime/assoc',
              ]
            },
             {
              title: 'Object-c之Block本质',
              collapsable: true,
              children: [
                '/oc/runtime/block1',
                  '/oc/runtime/block2',
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

      '/oc/other/': [
        '',
        'JLRouter',
        'git',
        'aframework',
        'copy',
        'Jenkins',
        'pod',
        'spec',
        'package',
        'autoPackage',
        'spec22',
      ],

	 	/*Swift*/
	 '/swift/': [
	        '',
          'swift1',
           'swift2',

	      ],

	 	/*c/c++*/
	 '/c/': [
	        '',
          'c',
          'c1',
	      ],

	 	/*html*/
	 '/h5/cordova/': [
	        '',
          'cordova'
	      ],

    '/h5/css/': [
          '',
        ],

    '/h5/html/': [
          '',
          'html-1',
        ],

    '/h5/reactnative/': [
          '',
          'reactnew',
          'reactxianyou',
          'react-flexbox',
          'reactview',
          'reactimg',
        ],

    '/h5/weex/': [
          '',
          'weex-demo',
        ],

    '/h5/js/': [
          '',
        ],

     '/h5/flutter/': [
        '',
        'flutter-develop',
        'flutter-demo',
        'flutter-first',
        'flutter-existing',
      ],

      '/guide/':[
        '',
      ],

    },

    // 设置侧栏深度
    sidebarDepth: 1,
    lastUpdated: '上次更新',
  },
}


