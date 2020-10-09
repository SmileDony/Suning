console.log("加载成功")

require.config({
    paths:{
        jquery:"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        parabola:"parabola",
        order:"order"
    },

    shim:{
        "jquery-cookie":["jquery"],
        parabola:{
            exports:"_",
        }
    }
})

require(["order"] , function(order){
    order.download();
    order.loadCarData();
})