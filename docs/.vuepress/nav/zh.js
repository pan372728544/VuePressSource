module.exports = [
      // 一级展示
      { text: '首页', link: '/' },

      {
        text: 'VuePress',
        items: [
          { text: 'k', link: '/language/chinese/' },
          { text: 'Japanese', link: '/language/japanese/' }
        ]
      },



       /*Object-C语言*/
       {
        text: 'Object-C',
        items: [
          { text: 'Runtime', items: [{ text: 'Runtime-1', link: '/foo/1' },{ text: 'Runtime-2', link: '/foo/2' },{ text: 'Runtime-3', link: '/foo/3' },] },
          { text: 'KVO', items: [{ text: 'KVO-1', link: '/foo/2' },{ text: 'KVO-2', link: '/foo/1' },{ text: 'KVO-3', link: '/foo/1' },] },
          { text: 'RunLoop', items: [{ text: 'RunLoop-1', link: '/foo/3' },{ text: 'RunLoop-2', link: '/foo/1' },{ text: 'RunLoop-3', link: '/foo/1' },] },

        ]
       },



      /*React-Native*/
       {
        text: 'React-Native',
        items: [
           { text: 'React-Native配置', items: [{ text: 'React-Native-1', link: '/bar/5' },{ text: 'React-Native-2', link: '/foo/1' },{ text: 'React-Native-3', link: '/foo/1' },] },
          { text: 'React-Native功能', items: [{ text: 'React-Native-1', link: '/bar/6' },{ text: 'React-Native-2', link: '/foo/1' },{ text: 'React-Native-3', link: '/foo/1' },] },
          { text: 'React-Native示例', items: [{ text: 'React-Native-1', link: '/bar/7' },{ text: 'React-Native-2', link: '/foo/1' },{ text: 'React-Native-3', link: '/foo/1' },] },
        ]
      },

        // github地址
        { text: 'GitHub', link: 'https://github.com/pan372728544' },
]

