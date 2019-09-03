module.exports = [

      // 一级展示
      { text: '首页', link: '/' },

       /*Object-C语言*/
      {
        text: 'Object-C',
        items: [
           { text: 'Runtime', link: '/oc/runtime/' },
           { text: 'KVO', link: '/oc/kvo/' },
           { text: 'RunLoop', link: '/oc/runloop/' },
           { text: 'Other', link: '/oc/other/' },
        ]
      },

      /*Swift*/
      {
        text: 'Swift',
        items: [
           { text: 'Swift4.2', link: '/swift/' },
        ]
      },
      /*C/C++*/
      {
        text: 'C/C++',
        items: [
           { text: 'C/C++', link: '/c/' },

        ]
      },
      /*HTML*/
      {
        text: 'Multi-Platform',
        items: [

              { text: 'Native Group',items: [  
                    { text: 'Flutter', link: '/h5/flutter/' },
                    { text: 'SwiftUI', link: '/h5/swiftui/' },
                    { text: 'React-native', link: '/h5/reactnative/' },
                    { text: 'Cordova', link: '/h5/cordova/' },
                    { text: 'Weex', link: '/h5/weex/' },

              ]},

            { text: 'Web Group',items: [     
               { text: 'HTML', link: '/h5/html/' },
               { text: 'CSS', link: '/h5/css/' },
               { text: 'JS', link: '/h5/js/' },

             ]}
        ]
      },



        // github地址
        { text: 'GitHub', link: 'https://github.com/pan372728544' },
]

