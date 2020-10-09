define(["jquery","jquery-cookie","parabola"], function($){
    // 加载已经加入购物车的商品数据
    // cookie只存储商品数量和id，加载商品必须要使用商品的具体信息
    // 需要从两个json中取数据
    // 利用 new promise（串行）异步处理两次数据加载
    function loadCarData(){
        //清除上一次加载的结果
        // $("#J_cartListBody .J_cartGoods").html("");
        //通过promise取得，goodsList2.json和goodsCarList.json中的数据
        new Promise(function(resolve, reject){
            $.ajax({
                url: "./data.json",
                success: function(arr){
                    //如果下载成功，把下载到数据中的商品列表传输过去
                    var son1=[];
                    for(var i=0; i<arr.length;i++){
                        son1=son1.concat(arr[i].childs);
                    }
                    // resolve(arr[0].childs);
                    resolve(son1);
                },
                error: function(msg){
                    //如果下载错误，调用reject方法
                    reject(msg);
                }
            })
        }).then(function(arr1){
            // console.log(arr1);
            // 下载第二份代码
            return new Promise(function(resolve, reject){
                $.ajax({
                    url: "./goodsList.json",
                    success: function(arr2){
                        //将两份数据合并
                        // console.log(arr2);
                        // console.log(arr2[0].childs[1]);
                        var son2=[];
                        for(var i=0; i<arr2.length;i++){
                            for(var j=0;j<arr2[i].childs.length;j++){
                                if(j!=0){
                                    son2=son2.concat(arr2[i].childs);
                                }
                            }
                        }
                        var newArr = arr1.concat(son2);
                        resolve(newArr);
                        // var newArr = arr1.concat(arr2);
                        // resolve(newArr);
                    },
                    error: function(msg){
                        reject(msg);
                    }
                })
            })

        }).then(function(arr){
             console.log(arr);
            
            //拿到服务器上，所有的商品数据，然后找出cookie中有的数据
           var cookieStr = $.cookie("goods");
            if(cookieStr){
                var cookieArr = JSON.parse(cookieStr);
                
                var newArr = [];
                for(var i = 0; i < cookieArr.length; i++){
                    for(var j = 0; j < arr.length; j++){
                        if(cookieArr[i].id == arr[j].id){
                            arr[j].num = cookieArr[i].num;
                            //设置商品id一致
                            // arr[j].id = arr[j].product_id ? arr[j].product_id : arr[j].goodsid;
                             newArr.push(arr[j]);
                        }

                    }
                }
            }


        })
    }
    // 加载页面商品数据
    function download(){
        $.ajax({
            url: "./data.json",
            success: function(arr){
                console.log(arr[0].title);
              var str = ``;
              for(var i = 0; i < arr[0].childs.length; i++){
                str += `<li class="goods_item">
                <div class="goods_pic">
                  <img src="${arr[0].childs[i].img}" alt="">
                </div>
                <div class="goods_title">
                  <p>${arr[0].childs[i].name}</p>
                </div>
                <div class="goods_price">
                  <p>￥<b>${arr[0].childs[i].price}</b></p>
                  <i id="${arr[0].childs[i].id}" class="sc_btn iconfont">&#xe62e;</i>
                </div>
            </li>`
              }
              $(".goods_box .rankshop").html(str);
        
            },
            error: function(msg){
              console.log(msg);
            }
          })
    }
    // 通过时间委托，实现加入购物车操作
     //给加入购物车按钮添加点击
    //设置cookie <1>只能存储字符串  <2>cookie大小限制
    //json数据，id num  [{id:1,num:1},{id:2,num2}];
    $(".goods_box .rankshop").on("click", ".sc_btn", function(){
        //取出当前点击加入购物车按钮的id
        var id = this.id;
        //1、判断是否是第一次添加
        // var first = $.cookie("goods") == null ? true : false;
        var first = !($.cookie("goods"));
        if(first){
          $.cookie("goods", JSON.stringify([{id:id,num:1}]), {
            expires: 7
          });
        }else{
          //2、不是第一次，判定之前是否添加过
          var cookieArr = JSON.parse($.cookie("goods"));
          var same = false; //假设没有相同的数据
          for(var i = 0; i < cookieArr.length; i++){
            if(cookieArr[i].id == id){
              same = true;
              break;
            }
          }
          same ? cookieArr[i].num++ : cookieArr.push({id:id, num: 1});
    
          //3、将处理完的数据存储回去
          $.cookie("goods", JSON.stringify(cookieArr), {
            expires: 7
          })
        }
        // sc_msg();
        // sc_num();
        // ballMove(this);
      })
  

return {
        download:download, 
        loadCarData:loadCarData
       }
})  