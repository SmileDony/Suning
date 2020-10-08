define(["jquery","jquery-cookie"], function($){
  function body(){

        $(function(){
   
         $.ajax({
            url:"./goodsList.json",
            success:function(arr){
           
            for(var i = 0; i < arr.length; i++){
                var node = $(`
                <div class="supertitle" >
                <em class="iconfont">&#xe62b;</em>
                <aside id="part2${i}">${arr[i].title}</aside>
                <i class="iconfont">&#xe502;</i>
                </div>
                <div class="shopbox allcenter">
                <div class="itemsleft">
                  <a href="">
                    <img src="${arr[i].childs[0].img}" alt="">
                  </a>
                  <div class="card">
                    <ul class="cardlist">
                    </ul>
                  </div>
                </div>
                <div class="goods">
                  <ul class="goodslist">
                  </ul>
                </div>
                </div>`);
                $('#part2').find(".supershop").append(node);
                var childsArr = arr[i].childs;
                for(var j = 0; j < childsArr.length; j++){
                    if(j==0){
                        var sonsArr=childsArr[0].sonchilds;
                        for(var k=0;k<sonsArr.length;k++){
                        $(`<li><a>${sonsArr[k]}</a></li>`).appendTo(node.find(".card .cardlist"));  
                        }
                    }else{
                        var childnode=$(` 
                        <li class="goods_item">
                        <div class="goods_pic">
                          <img src="${childsArr[j].img}" alt="">
                        </div>
                        <div class="goods_title">
                          <p>${childsArr[j].name}</p>
                        </div>
                        <div class="goods_price">
                          <p>￥${childsArr[j].price}</p>
                          <i id="${childsArr[j].id}" class="sc_btn iconfont">&#xe62e;</i>
                        </div>
                        </li>
                         `);
                       
                        $('.goodslist').eq(i).append(childnode);
                      
                    }
                    
                }
              }
           
        },
        error:function(msg){
            console.log(msg);
        }
      })
  })

}
return {
  body:body  
 }
})   

            