console.log("加载完成");
/* 
    配置当前项目引入的模块
*/
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "parabola": "parabola",
        //引入banner图效果
        // "nav": "nav",
        // "slide": "slide",
        // "data": "data"
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"],
        //声明当前模块不遵从AMD
        "parabola": {
			exports: "_"
		}
    }
})

require(["data", "goodslist", "nav","shopcar"], function(data,goodslist,nav,shopcar){
    data.body()
    goodslist.body()
    nav.body()
    shopcar.body()
    
})