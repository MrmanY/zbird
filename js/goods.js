$(function(){
    function Goods(opts,rend_ele,addcar){
        this.opts = opts;
        this.rend_ele = rend_ele;
        this.addcar_ele = addcar;
        if(!this.opts && !this.rend_ele && ! this.addcar_ele) return;
        this.init();
    }
    Goods.prototype = {
        constructor:Goods,
        init(){
            this.Goods_ajax();
        },
        Goods_ajax(){
            $.ajax({url:this.opts.url,dataType:this.opts.dataType})
            .then(function(res){
                var json = res.goods;
                var id = location.href.split("?")[1];
                for(var i = 0 ; i < json.length ; i++){
                    if(json[i].id == id){
                        json = json[i];
                        break;    
                    }
                }
                this.rend_goods(json)
                this.addcar(json)
            }.bind(this))
        },
        rend_goods(json){   // 渲染相应的标签
            $(this.rend_ele.ele1).html(json.title);
            $(this.rend_ele.ele2).children().eq(1).attr("src",json.image);
            $(this.rend_ele.ele3).children().attr("src",json.image);
            $(this.rend_ele.ele4).children().eq(0).attr("src",json.image);
            $(this.rend_ele.ele5).children().eq(0).html(json.title);
            $(this.rend_ele.ele6).children().eq(0).children().html(json.price);
            $(this.rend_ele.ele6).children().eq(1).html(json.sellOut);
            $(this.rend_ele.ele6).children().eq(2).html(json.comment);
        },
        addcar(json){
            $(this.addcar_ele).on("click",function(){
                if(!$.cookie("goods")){  // 第一次加入数据
                    // $.cookie("goods",'["num":'+json.id+',"id":'+1+']');
                    var opts =[
                        {
                            "id":json.id,
                            "num":"1"
                        }
                    ];
                    var goodsString = JSON.stringify(opts);
                    $.cookie("goods",goodsString);
                    location.href="http://localhost/zbird/shopcar.html";   // 跳转到购物车页
                    return;
                }
                
                var goodsString = $.cookie("goods");
                var goodsArray = JSON.parse(goodsString);   
                var flag = false
                goodsArray.forEach(function(item){  // 判断cookie中是否存在，存在 num++，否则 插入
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
                $.cookie("goods",JSON.stringify(goodsArray));  // 插入新的cookie
                location.href="http://localhost/zbird/shopcar.html";
            })
        }
    }
    var opts = {
        url:"http://localhost/zbird/js/zbird.json",
        dataType:"json"
    }
    var rend_ele = {  // 需要渲染的标签
        ele1:".masonry_word_title",
        ele2:".masonry_l_img",
        ele3:"#masonry_l_bigimg",
        ele4:".masonry_img_item ul li",
        ele5:".masonry_r",
        ele6:".masonry_r_pirce p",
    }

    new Goods(opts,rend_ele,"#addcar");
})	
        