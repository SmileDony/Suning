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

require(["register"] , function(register){
    register.body()
})