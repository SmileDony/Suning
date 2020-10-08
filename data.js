define(["jquery","jquery-cookie"], function($){
  function body(){
    $(function(){
      Ajax(0)

      $('#rank li').click(function(){
          var index = $(this).index();
          
          console.log(index);
          $('.rankshop').empty();
          $('#rank li').removeClass("active");
          $('#rank li').eq(index).addClass("active");
          Ajax(index)
      })
    function Ajax(index){
      $.ajax({
          url:"./data.json",
          success:function(arr){
              
              // console.log(arr[0].title);
              for(var i=0;i<arr[index]['childs'].length;i++){
                  console.log(arr[index].childs[i].img);
                  var node=$(` 
                  <li class="goods_item">
                      <div class="goods_pic">
                        <img src="${arr[index].childs[i].img}" alt="">
                      </div>
                      <div class="goods_title">
                        <p>${arr[index].childs[i].name}</p>
                      </div>
                      <div class="goods_price">
                        <p>￥${arr[index].childs[i].price}</p>
                        <i id="0" class="sc_btn iconfont">&#xe62e;</i>
                      </div>
                      <!-- <div class="goods_count">
                        <i id="${arr[index].childs[i].id}" class="sc_btn iconfont">&#xe62e;</i>
                      </div> -->
                  </li>
                `);
                console.log(arr[index].childs[i].img)
                $('.rankshop').append(node)
              }
          },
          error:function(msg){
              console.log(msg);
          }
      })
  }
  // $(function(){
  //   //创建节点，添加元素  JQ创建节点 html部分如何写，这里就如何写
  //   for(var i = 0; i < arr.length; i++){
  //     var node = $(`<div class = 'item'><p>${arr[i].title}</p><ul class = 'childUl'></ul></div>`);
  //     node.appendTo($("body"));
  //     var childsArr = arr[i].childs;
  //     for(var j = 0; j < childsArr.length; j++){
  //       $(`<li>${childsArr[j]}</li>`).appendTo(node.find("ul"));
  //     }
  //   }
  // })
    }
  
)

  }

  return {
   body:body
    
  }
})   
 