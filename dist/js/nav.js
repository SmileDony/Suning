$(function(){
   
    $('#leftnav li').mouseenter(function(){
        var index = $(this).index();
        $('.navcontbox').css('display','block')
        $('.navcontbox .navcont').empty();
        // $('#leftnav li').removeClass("active");
        // $('#leftnav li').eq(index).addClass("active");
        Ajax(index)
    })
    $('#leftnav li').mouseleave(function(){
        $('.navcontbox').css('display','none')

    }
    )
  function Ajax(index){
    $.ajax({
        url:"./nav.json",
        success:function(arr){
            
            // console.log(arr[0].title);
            for(var i=0;i<arr[index]['childs'].length;i++){
                
                var node =`
                <div class="navcell">
                  <p>${arr[index].childs[i].name}</p>
                  <span>`
              for(var j=0;j<arr[index].childs[i].sonchilds.length;j++){
                node +=`<a>${arr[index].childs[i].sonchilds[j][0]}</a>`
              }
              node += `</span>
              </div>
             `
            $('.navcontbox .navcont').append(node);


            //   var charArr=arr[0].childs;

            //   for(var j=0;j<charArr.length;j++){
            //   console.log(charArr[j].sonchilds[j]);

            //     console.log(charArr.sonchilds[j][0]);
            //       var childnode=$(`<a>${charArr.sonchilds[j][0]}</a>`);
            //       $(".navcontbox").eq(i).find(".navcont .navcell span").append(childnode);
            //   }
            }
        },
        error:function(msg){
            console.log(msg);
        }
    })
  }
}    
)
 