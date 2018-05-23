$(function(){
    $.ajax({url:"http://localhost/zbird/js/zbird.json",dataType:"json"})
    .then(function(res){
        var json = res.goods;
        render(json);
        clear_shopcar();
    })
})

function render(json){
    if(!$.cookie("goods")) return;
    var goodsArray = JSON.parse($.cookie("goods"));
    // console.log(goodsArray);
    var html = "";
    var html_price ="";
    var allTotal = 0;
    var aTotal = 0;
    var sum = 0;
    
    json.forEach(function(item){
        goodsArray.forEach(function(list){
            if(item.id == list.id){
                item.num = list.num;
                aTotal = item.num * item.price;
                allTotal +=aTotal;
                html += `
                            <li data_id="${item.id}">
                                <div class="shop_car_item_list1">
                                    <a href="#">
                                        <img src="${item.image}" alt="">
                                        <span>${item.title}</span>
                                    </a>
                                </div>
                                <span class="shop_car_item_list2"></span>
                                <span class="shop_car_item_list2">${item.num}</span>
                                <span class="shop_car_item_list3">11.0</span>
                                <span class="shop_car_item_list4">${item.price}</span>
                                <span class="shop_car_item_list5">${aTotal}</span>
                                <span class="shop_car_item_list6">删除</span>
                            </li>
                        `;
                   
            }
        })
    })

    html_price = `<p>订单总额<span><i>¥</i>${allTotal}</span>本次应付<em><i>¥</i>${allTotal}</em></p>` 
    $(".shop_car_wrap").html(html);
    $(".shop_price").html(html_price);
}


function clear_shopcar(){
    $(".clear_shopcar").children().eq(0).on("click",function(){
        var clear = confirm("亲,确定清空购物车么？");            
        if(clear){
            $.removeCookie("goods");
            location.reload();
        }
    })
    $(".clear_shopcar").children().eq(1).on("click",function(){
        location.href = "http://localhost/zbird/ring_list.html";
    })
    $(".shop_car_item_list6").on("click",function(){

        
        var goodsArray = JSON.parse($.cookie("goods"));
        var clear_id = $(this).parent().attr("data_id");
        
        goodsArray.forEach(function(item,index){
            if(item.id == clear_id){                    
                goodsArray.splice(index,1);
                $.cookie("goods",JSON.stringify(goodsArray));
                location.reload();
            } 
        })
    })
}
