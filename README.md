# vue2 dataPick



## 此项目主要是利用data-pick与vue进行一次实际操作的例子
### 更多方法请看看官方文档[data-pick](https://github.com/benitolopez/hotel-datepicker)

### 所用到的技术
vue2  + vue-router + webpack + ES6/7 + axios



# 项目布局
```
|-- build                            //  webpack配置文件
|-- config                           //  项目打包路径
|-- components                       //  组件
|-- page                             //  主页面
|-- src                              //  源码目录
|-- |
|    |--plugins
|         |-- base.js                 //  axios 方法封装
|         |-- env.js                  //  区分正式环境与测试环境
|         |-- fec.js                  //  时间戳各种转换方法封装
|         |-- pick.js                 //  核心代码实现（日期选择）
|         |-- screen.js               //  px转rem （这里px/32）
|		|--service	                      //  服务中心
|		   |-- getData.js                 //  获取数据的统一调配文件，对接口进行统一管理
|		|-- router
|      |-- index.js                   //  路由配置
|   |-- App.vue                      //   页面入口文件
|   |-- main.js                      //   程序入口文件，加载各种公共组件
|
|-- .babelrc                         //   ES6语法编译配置
|-- .editorconfig                    //   代码编写规格
|-- .gitignore                       //   忽略的文件
|-- favicon.ico                      //   页面左上角小图标
|-- index.html                       //   入口html文件
|-- package.json                     //   项目及工具的依赖配置文件
|-- README.md                        //   说明
```
> A Vue.js project
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer repo
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
