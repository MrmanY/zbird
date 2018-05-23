$(function(){
    var id = location.href.split("?")[1];
    $.ajax({url:"http://localhost/zbird/js/zbird.json",dataType:"json"})
        .then(function(res){
        var json = res.goods;
        for(var i = 0 ; i < json.length ; i++){
            if(json[i].id == id){
                json = json[i];
                break;    
            }
        }  
        // console.log(json);
        render(json);
        addcar(json);
        
    })

    // console.log( $(".masonry_l_img").children().eq(1).attr("src",1));
    function render(json){
        $(".masonry_word_title").html(json.title);
        $(".masonry_l_img").children().eq(1).attr("src",json.image);
        $("#masonry_l_bigimg").children().attr("src",json.image);
        $(".masonry_img_item ul li").children().eq(0).attr("src",json.image);
        $(".masonry_r").children().eq(0).html(json.title);
        $(".masonry_r_pirce p").children().eq(0).children().html(json.price);
        $(".masonry_r_pirce p").children().eq(1).html(json.sell0ut);
        $(".masonry_r_pirce p").children().eq(2).html(json.comment);
    }
    
    function addcar(json){
        $("#addcar").on("click",function(){
            if(!$.cookie("goods")){
                // $.cookie("goods",'["num":'+json.id+',"id":'+1+']');
                var opts =[
                    {
                        "id":json.id,
                        "num":"1"
                    }
                ];
                var goodsString = JSON.stringify(opts);
                $.cookie("goods",goodsString);
                location.href="http://localhost/zbird/shopcar.html";
                return;
            }
            
            var goodsString = $.cookie("goods");
            var goodsArray = JSON.parse(goodsString);   
            var flag = false
            goodsArray.forEach(function(item){
                if(item.id == json.id){
                    item.num++;
                    flag =true;
                }
            })
            if(!flag){
                var item = {
                    id:json.id,
                    num:1
                }
                goodsArray.push(item);
            }
            $.cookie("goods",JSON.stringify(goodsArray));
            location.href="http://localhost/zbird/shopcar.html";
        })
        // console.log($.cookie("goods"));
        
    }
})	
        