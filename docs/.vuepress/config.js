module.exports = {
  base: "/wheels-ada/",   
  title: "wheels-ada",    // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
  description: "一个易用的 UI 框架",  // meta 中的描述文字，用于SEO
  markdown: {
    anchor: { permalink: false },
  },
  themeConfig: {
    // 顶部导航栏
    nav: [
      { text: "主页", link: "/" },
      { text: "欢迎 Star", link: "https://github.com/Adashuai5/wheels-ada/" },
      { text: "Github", link: "https://github.com/Adashuai5/" }
    ],
    //侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
    sidebar: [
      {
        title: "介绍",
        collapsable: false,
        children: ["/introduce/"]
      },
      {
        title: "入门",
        collapsable: false,
        children: ["/install/", "/get-started/"]
      },
      {
        title: "组件",
        collapsable: false,
        children: [
          "/components/button",
          "/components/input",
          "/components/tabs",
          "/components/grid",
          "/components/layout",
          "/components/popover",
          "/components/collapse"
        ]
      }
    ],
  }
};
