$(function(){
    function Shopcar(opts,opts2){
        this.opts = opts;
        this.opts2 = opts2;
        this.opts3 = opts3;
        if(!this.opts && !this.opts2) return;
        this.init();
    }

    Shopcar.prototype = {
        constructor:Shopcar,
        init(){
            this.ajax_shocar();
        },
        ajax_shocar(){
            $.ajax({url:this.opts.url,dataType:this.opts.dataType})
            .then(function(res){
                var json = res.goods;
                this.rend_shopcar(json);
            }.bind(this));
        },
        rend_shopcar(json){
            if(!$.cookie("goods")) return;   //cookie没有数据，不进行渲染;
            var goodsArray = JSON.parse($.cookie("goods"));
            // console.log(goodsArray);
            var html = "";
            var html_price ="";
            var allTotal = 0;   // 所有商品的总价
            var aTotal = 0;    // 单个商品的总价 num * price
            var sum;
            json.forEach(function(item){
                goodsArray.forEach(function(list){
                    if(item.id == list.id){
                        item.num = list.num;
                        sum = item.num;
                        aTotal = item.num * item.price;
                        allTotal +=aTotal;
                        html += `
                                    <li data_id="${item.id}">
                                        <div class="shop_car_item_list1">
                                            <a href="goods.html?${item.id}">
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
                }.bind(this))
            })

            html_price = `<p>订单总额<span><i>¥</i>${allTotal}</span>本次应付<em><i>¥</i>${allTotal}</em></p>` 
            $(this.opts2.rend_ele1).html(html);
            $(this.opts2.rend_ele2).html(html_price);
            this.clear_shopcar();      
        },
        clear_shopcar(){
            $(this.opts3.allClear).children().eq(0).on("click",function(){
                var clear = confirm("亲,确定清空购物车么？");            
                if(clear){
                    $.removeCookie("goods");
                    location.reload();
                }
            })
            $(this.opts3.aClear).on("click",function(){
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
    }

    var opts = {
        url:"http://localhost/zbird/js/zbird.json",
        dataType:"json"
    }
    var opts2 = {
        rend_ele1:".shop_car_wrap",
        rend_ele2:".shop_price"
    }
    var opts3 = {
        allClear:".clear_shopcar",
        aClear:".shop_car_item_list6"
    }

    new Shopcar(opts,opts2,opts3);

    
})

$(".clear_shopcar").children().eq(1).on("click",function(){
    location.href = "http://localhost/zbird/ring_list.html";
})