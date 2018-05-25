$(function(){
    function Ring(opts,page_ele,rend_ele){
        this.opts = opts;
        this.page_ele = page_ele;
        this.rend_ele = rend_ele;
        if(!this.opts) return;
        this.page = 0;
        this.init();
    }
    Ring.prototype = {
        constructor:Ring,  // 指向自己的指针，防止其丢失，
        init(){
            this.ring_ajax();
            this.paging();
        },
        ring_ajax(){   // ajax 请求
            $.ajax({url:this.opts.url,dataType:this.opts.dataType})
            .then(function(res){
                this.page++;
                if(this.page > 2) this.page = 1;  // 有限数据的分页方法   通过page，每次渲染不同的数据，page最大为二是因为json只有24条数据，每次渲染12条
                var json = res.goods;  
                // console.log(json);
                this.rend_page(json);  
            }.bind(this));
        },
        rend_page(json){   // 渲染页面
            var html = "";
            json.forEach(function(item,index){
                if(index >= (this.page - 1)*12 && index <= this.page * 12 -1){  // 第一次渲染 0-11，第二次 12-23，一个页面只有12条数据。 
                    html+=` <li>
                            <a href="goods.html?${item.id}"><img src=${item.image} alt=""></a>
                            <a class="content_nav_itme_title" href="goods.html?id=1">${item.title}</a>
                            <span><i>¥</i>${item.price}</span>
                            <div>售出<span>${item.sellOut}</span>评价<span>${item.comment}</span></div>
                        </li>
                    `
                } 
            }.bind(this))
            $(this.rend_ele).html(html);
            this.ring_animate(json);
        },
        paging(){  // 分页功能（点击按钮的时候，重新渲染页面）
            $.each($(this.page_ele),function(idnex,ele){ // 获取所有的按钮
                $(ele).on("click",function(){
                    $(ele).children().css({color:"#FF8A81"}).end().siblings().children().css({color:"#000"});
                    this.ring_ajax(); // 再次请求ajax,更换数据；重新渲染。  
                }.bind(this))
            }.bind(this))
        },
        ring_animate(json){  // 动画效果，鼠标移入，改变图片
            // console.log($(this.rend_ele).children());
            // console.log(json);
            $.each($(this.rend_ele).children(),function(index,item){
                $(item).on("mouseenter",function(){
                    // console.log($(item).children().children().eq(0))
                    $(item).children().children().eq(0).attr("src",json[index +((this.page - 1)* 12)].change_image)
                        
                }.bind(this))   
                $(item).on("mouseleave",function(){
                    // console.log($(item).children().children().eq(0))
                    $(item).children().children().eq(0).attr("src",json[index +((this.page - 1)* 12)].image);
                }.bind(this))  
            }.bind(this))
        }
    }

    var opts = {
        url:"http://localhost/zbird/js/zbird.json",
        dataType:"json"
    }

    new Ring(opts,".content_nav_page ul li",".content_nav_itme ul")

    

})