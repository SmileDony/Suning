console.log("加载成功")

require.config({
    paths:{
        jquery:"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        parabola:"parabola",
    },

    shim:{
        "jquery-cookie":["jquery"],
        parabola:{
            exports:"_",
        }
    }
})

require(["index3"] , function(index3){
    test1.body()
})