define([
    'jquery',
    'jquery-cookie'
], function($) {
    function body(){
        $(function(){

            //先加载右侧购物车的内容  数据从cooke里面找
            buy_msg()
            buy_num()
            check()
            function buy_msg(){
                var cookieStr = $.cookie("cookies")
                //拿不到数据
                if(!cookieStr){
                    return;
                }
                // 先下载所有数据
                $.ajax({
                    url:"data/data.json",
                    success:function(arr){
                        // cookie 的数据
                        var cookieArr = JSON.parse(cookieStr)

                        var newArr = []  // 需要的数据
                        for(var i = 0; i < arr.length; i++){
                            for(var j = 0 ; j < cookieArr.length; j++){
                                if(arr[i].id == cookieArr[j].id){
                                    //拿出数量
                                    arr[i].num = cookieArr[j].num
                                    //拿到图片，id
                                    newArr.push(arr[i])
                                    //结束内层循环，
                                    break;
                                }
                            }
                        }

                        console.log(newArr)

                        //假数据遍历
                        var str = ``
                        for(var i = 0; i < newArr.length; i++){
                            str += `<li id = "${newArr[i].id}">
                            <input type="checkbox" class ="${newArr[i].id}" id = "qwe">
                            <div> <img src="${newArr[i].img}" alt="" srcset="" > </div>
                            <div>无线机械键盘</div>
                            <div>￥ <span>299.00</span></div>
                            <div class = "add"> <a href="" id = "add1">+</a><input type="text" value="${newArr[i].num}"><a href="" id = "add2">-</a> </div>
                            <div class="m1">￥ <span>${newArr[i].num * 299 + ".00"}</span></div>
                            <div id = "dele">删除</div>
                        </li>`
                        }
                        
                        //插入

                        $("#cart-filter-bar ul").html(str)
                    },
                    error:function(msg){
                        console.log(msg)
                    }
                })
            }
            // 处理购物车显示数据
            function buy_num(){
                var cookieStr = $.cookie("cookies")

                var sum = 0;
                if(cookieStr){
                    cookieArr = JSON.parse(cookieStr)
                    for(var i = 0 ; i < cookieArr.length; i++){
                        sum += cookieArr[i].num
                    }
                }
                console.log(sum)
                $(".sc_num").html(sum)
                
            }

            //购物车的删除按钮功能
            $("#cart-filter-bar ul").on("click" , "#dele" ,function(){
                var id = $(this).closest("li").remove().attr("id")
                //  依靠id 在ccokie上删除
                var cookieArr = JSON.parse($.cookie("cookies"))
                //当善品数量为1时 ， jq 筛选
                cookieArr = cookieArr.filter(item => item.id != id)
                //重存
                cookieArr.length ? $.cookie("cookies", JSON.stringify(cookieArr),{expires:7}) : $.cookie("cookies" , null)

                buy_num()

            })

            
               //购物车的加减
            $("#cart-filter-bar ul").on("click",".add a" ,function(){
                var id = $(this).closest("li").attr("id");

                var cookieArr = JSON.parse($.cookie("cookies"))

                var res = cookieArr.find(item => item.id == id)

                if(this.innerHTML == "+"){
                    res.num++
                }else{
                    //数量为1不能减少
                    res.num == 1 ? alert("数量为1，不能减少") : res.num--;
                }

                $(this).siblings("input").val(res.num)

                $.cookie("cookies",JSON.stringify(cookieArr),{
                    expires:7
                })
                 buy_num()
            })

            // function check(){
            //     var cookieStr = $.cookie("cookies")

            //     if(!cookieStr){
            //         return;
            //     }

            //     $.ajax({
            //         url:"data/data.json",
            //         success:function(arr){
            //             var cookieArr = JSON.parse(cookieStr)

            //             var newArr = []
            //             for(var i = 0 ; i < arr.length; i++){
            //                 for(var j = 0 ; j < cookieArr.length; j++){
            //                     if(arr[i].id == cookieArr[j].id){
            //                         newArr.push(arr[i])
            //                             break;
            //                     }
            //                 }
            //             }


            // oul.onclick = function(ev){
            //     var e = ev || window.event;
            //     var target = e.target || window.event.srcElement;
            //         if(target.tagName.toLowerCase() == "li"){
            //            target.style.backgroundColor = "red"
            //        }
            //    }


                          function check(){
                              var cookieStr = $.cookie("cookies")
                              if(!cookieStr){
                                  return;
                              }
                              $.ajax({
                                  url:"data/data.json",
                                  success:function(arr){
                                      var cookieArr = JSON.parse(cookieStr)
                                      var newArr = []
                                      for(var i = 0 ; i < arr.length; i++){
                                          for(var j = 0 ; j < cookieArr.length;j++){
                                              if(arr[i].id == cookieArr[j].id){
                                                  newArr.push(arr[i].id)
                                                  break;
                                              }
                                          }
                                      }
                                      var f2 = [];
                                     for(var n = 0 ; n < newArr.length ; n++){
                                         var i2 = newArr[n]
                                         var f1 = $(`${i2}`)
                                         console.log(f1)  
                                            f2.push(f1)                                                          
                                     }

                                     
                        const all_select = document.querySelector("#ccc")

                      console.log(all_select)
                      console.log(f2)
                        //全选/全不选 父控制子
                       all_select.addEventListener('click', function () {
 
                           $('#switch-cart ul li input').prop('checked', this.checked)
                       })
                   
                      // console.log($("#th input"))
                      //console.log(f2[0])
                    //   var ss= f2[0]
                    //   console.log(ss)
                       
                         
                        $('#switch-cart ul').on('click', 'input',function(){
                            
                            var isyes = true;
                            var aInputs = $("#switch-cart ul").find("li input").filter("[type=checkbox]");
                            aInputs.each(function(index, item){
                                
                                if(!$(item).prop("checked")){
                                    isyes = false;
                                }
                            })
                            console.log(isyes)
                            if(isyes){
                                $(all_select).prop("checked" ,true)
                            }else{
                                $(all_select).prop("checked" , false)
                            }
                        })
                      
                        // for(var i = 0 ; i < f2.length ; i++){                            
                        //     if(   !(  $('.f2[i]').prop("checked") )   ){
                        //         $("#th input").prop("checked",false)
                        //         break;
                        //     }else{
                        //         $("#th input").prop("checked",true)
                        //     }
                        // }
                         
                        //  for(let j = 0, lens = f2.length; j < lens; j++){
                        //    f2[j].onclick = function(){
                        //        let abc = true;
                        //        for(let k = 0 ,lenss = f2.length; k < lenss ; k++){
                        //            if(!f2[k].checked){
                        //                abc = false
                        //            }
                        //        }
                        //        all_select.clecked = abc
                        //    }
                        //  } 
                                  }
                              })
                          }
                        
              
        })
    }

    return{
        body:body
    }
    
});