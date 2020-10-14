const path = require("path");
const { config } = require("process");
const resolve = function(dir) {
  return path.join(__dirname, dir);
};
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist",
  assetsDir: "static",
  lintOnSave: false, // 是否开启eslint保存检测
  productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap

  
css: {
  // 是否使用css分离插件 ExtractTextPlugin
  extract: true,
  // 开启 CSS source maps?
  sourceMap: false,
  // css预设器配置项
  loaderOptions: {
    sass:{
      prependData: `@import "./src/styles/main.scss";`
  }
  },
  // 启用 CSS modules for all css / pre-processor files.
  requireModuleExtension: true
},

   chainWebpack: (config) => {
    const svgRule=config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
    .use("svg-sprite-loader")
    .loader("svg-sprite-loader")
    .options({
      symbolId:"icon-[name]",
      include:["./src/icons"]
    });
  //   config.resolve.alias
  //     .set('vue',resolve('vue/dist/vue.js'))
  //     .set("@", resolve("src"))
  //     .set("@v", resolve("src/views"))
  //     .set("@c", resolve("src/components"))
  //     .set("@u", resolve("src/utils"))
  //     .set("@s", resolve("src/service")) /* 别名配置 */
  //   config.optimization.runtimeChunk("single")
   },
   /**
    * vue3.0两种运行模式
    * 1.compiler（模板模式）
    * 2.runtime模式（运行时）
    * vue模块默认为runtime模式，js指向了"dist/vue.runtime.common.js"位置
    */
    configureWebpack:config=>{
      config.resolve={//怕配置解析别名
        extensions: [".js", ".json", ".vue"],
        alias:{
          'vue':'vue/dist/vue.js',//改变vue指向
          "@": path.resolve(__dirname, "./src"),
          "@c":path.resolve(__dirname,"./src/components")
        }
      }
    },
   
  devServer: {
    // host: "localhost",
    /* 本地ip地址 */
    //host: "192.168.1.107",
    host: "0.0.0.0", //局域网和本地访问
    port: "8080",
    hot: true,
    /* 自动打开浏览器 */
    open: false,
    overlay: {
      warning: false,
      error: true
    },
    hotOnly:false,
    /* 跨域代理 */
    proxy: {
      "/api": {
        /* 目标代理服务器地址 */
        target: "http://www.web-jshtml.cn/productapi/token", 
        // target: "http://192.168.1.102:8888", //
        /* 允许跨域 */
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};