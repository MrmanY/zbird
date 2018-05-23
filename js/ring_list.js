$(function(){
    // $.ajax({url:"zbird.json"})
    // .then(function(res){
    //     console.log(res);     
    // })
    var page = 0;
    function nextpage(){
        $.ajax({url:"http://localhost/zbird/js/zbird.json",dataType:"json"})
            .then(function(res){
            page++;
            if(page > 2) page = 1;
            var json = res.goods;
            reder(json);  
        })
    }
    nextpage();
    function reder(json){
        var html = "";
        json.forEach(function(item,index){
            if(index >= (page - 1)*12 && index <= page * 12 -1){
                html+=` <li>
                        <a href="goods.html?${item.id}"><img src=${item.image} alt=""></a>
                        <a class="content_nav_itme_title" href="goods.html?id=1">${item.title}</a>
                        <span><i>¥</i>${item.price}</span>
                        <div>售出<span>${item.sellOut}</span>评价<span>${item.comment}</span></div>
                    </li>
                 `
            } 
        })
        $(".content_nav_itme ul").html(html);
    }
    $.each($(".content_nav_page ul li"),function(idnex,ele){
        $(ele).on("click",function(){
            $(ele).children().css({color:"#FF8A81"}).end().siblings().children().css({color:"#000"});
            nextpage();    
        })
    })
})