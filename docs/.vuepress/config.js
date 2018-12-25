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
        '3',    
        '4',  
      ],
      '/oc/runloop/': [
        '',
        '6',    
        '7',  
      ],

	 	/*Swift*/
	 '/swift/': [
	        '',
	        '3',    
	        '4',  
	      ],

	 	/*c/c++*/
	 '/c/': [
	        '',
	        '3',    
	        '4',  
	      ],
	 	/*html*/
	 '/h5/': [
	        '',
	        '3',    
	        '4',  
	      ],



    },

    // 设置侧栏深度
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
  },
}


