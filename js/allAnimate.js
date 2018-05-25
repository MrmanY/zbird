$(function(){
    function Animation(options,options2,array,ChangeLTEle,prev,next){
        this.options = options;
        this.options2 = options2;
        this.array = array;
        this.ChangeLTEle = $(ChangeLTEle);
        this.prev = $(prev)
        this.next = $(next) 
        
        if(!this.options) return;  // 参数判断，要是对象为空 不再向下执行代码
        this.init();
    }
    Animation.prototype = {
        constructor:Animation,
        init(){   
            this.index = 0;                  //  或者init:function(){} 
            this.mouse_enter();
            this.mouse_mask();
            this.mouse_moveTop();
            this.mouse_change()
        },
        mouse_enter(){  // 鼠标移入，相应对象显示消失
            var _this = this; 
            $.each(this.options,function(ele,changeEle){     //  对对象遍历，获取 ele => 添加事件的元素,changeEle= >显示隐藏的元素 
                // console.log($(ele),$(changeEle));
                
                if($(ele).length > 1 && $(ele).length < 10){   // 若传入对象 大于1个，对其再次遍历，使每个元素都添加上事件
                    $.each($(ele),function(index,ele){
                        ele.onmouseenter = function(){          // 鼠标移入事件，此处不是jq对象！！！
                            $(changeEle).eq(index).toggle();    // 获取相对应的元素，并使其显示（eq选择是jq对象 [index]选择是原生对象）
                        }
                        $(changeEle).on("mouseenter",function(){
                            $(this).eq(index).show();
                            // console.log(_this);
                        }) 
                        ele.onmouseleave = function(){      // 鼠标移出事件
                            $(changeEle).eq(index).toggle();  
                        }
                        $(changeEle).on("mouseleave",function(){
                            $(this).eq(index).hide();
                            // console.log(this);
                        }) 
                    })
                }else if($(ele).length > 10 ){   // ！特殊处理事件（没有鼠标移出事件 ）
                    $.each($(ele),function(index,ele){
                        ele.onmouseenter = function(){  // 鼠标移入的时候，它的颜色改变，它要改变的对象显示隐藏
                            $(this).css({color:" #f6827a"}).siblings().css({color:"#000"});        
                            $(changeEle).eq(index).show().siblings().hide();
                            _this.mouse_change ();  // 每次触发事件时调用 这个函数，改变其他样式
                        }.bind(this)
                    })
                } else {
                    $(ele).on("mouseenter",function(){  //一个对象的处理  通过toggle设置每个对象相对应元素的display属性
                        $(changeEle).toggle();   
                        // console.log($(ele));
                    })
                    $(ele).on("mouseleave",function(){
                        $(changeEle).toggle();
                    })
                    // console.log(this.options); 
                }               
            });
        },
        mouse_mask(){  // 鼠标移入，对图片透明度进行变换
            // console.log(this.array);
            for(var i = 0 ; i < this.array.length ; i++){  // 遍历数组传入的每一项
                // console.log(this.array[i]);
                if($(this.array[i]).length > 1 && $(this.array[i]).length < 10){  // 如果对象大于一个进行再次遍历，使每个图片都加上事件
                    $.each($(this.array[i]),function(index,ele){
                        ele.onmouseenter = function(){   // 对照片进行透明度的变化，实现闪一下的效果
                            // console.log(this);
                            $(this).stop().animate({opacity:0.8},100,function(){
                                $(this).stop().animate({opacity:1},100)
                            }.bind(this))                      
                        }
                    })
                }else{  // 传入一个对象
                    $(this.array[i]).on("mouseenter",function(){  
                        $(this).stop().animate({opacity:0.8},100,function(){
                            $(this).stop().animate({opacity:1},100)
                        }.bind(this))
                    }) 
                }
            }
        },
        mouse_moveTop(){  // 鼠标放入 图片向上运动，然后下来
            // console.log(this.ChangeTopEle.children());
            $.each(this.ChangeLTEle.children(),function(index,ele){
                ele.onmouseenter=function(){       // 鼠标移入图片向上移动 20像素
                $(this).animate({marginTop:-20},500)
                }
                ele.onmouseleave=function(){     // 鼠标移出图片恢复
                    $(this).animate({marginTop:0},500)
                }
            })
            this.next.on("click",function(){
                this.prev.css({backgroundPosition:"0 0"});
                this.index++;
                if(this.index > this.ChangeLTEle.children().length -4){
                    this.index =  this.ChangeLTEle.children().length -4;
                    return
                };
                if(this.index == this.ChangeLTEle.children().length -4){
                    this.next.css({backgroundPosition:"-37px -51px"});
                }
                this.ChangeLTEle .animate({marginLeft:"-=271"});
                // console.log(this.index);
            }.bind(this))
            
            this.prev.on("click",function(){
                this.next.css({backgroundPosition:"0 -51px"});
                this.index--;
                if(this.index < 0 ){
                    this.index = 0;
                    return;
                } 
                if(this.index == 0){
                    this.prev.css({backgroundPosition:"-37px 0"})
                }
                this.ChangeLTEle.animate({marginLeft:"+=271"});
            }.bind(this))          
        }, 
        mouse_change(){   
            $.each(this.options2,function(ele,changeEle){
                // console.log($(ele),$(changeEle));
                $.each($(ele),function(index,ele){
                    // console.log($(changeEle).eq(index).parent().css("display"));
                    // console.log($(ele).css("color")); 
                    // 进行逻辑判断，ele的父级的改变，也会带来 要改变元素的改变
                    if($(ele).parent().css("display") == "block" && $(ele).css("color") == "rgb(246, 130, 122)"){
                        $(changeEle).eq(index).show().siblings("div").hide();                        
                    }
                    $(ele).on("mouseenter",function(){ // 颜色、对象的变换
                        $(this).css({color:" #f6827a"}).siblings().css({color:"#000"});
                        $(changeEle).eq(index).show().siblings("div").hide();  
                    }.bind(this))
                })
            })
        }
    }
    //鼠标移入，相应对象显示消失
    var options={   // 要触发事件的对象的id/class，和要进行变换的对象的id/class 
        "#shop_car":".shop_car_list",
        "#my_bird":".my_bird_list",
        "#htc":".htc_list",
        ".leve_nav":".nav_menu_bg",
        ".shop_identity_item span":".shop_stores",
    }
    var options2={  // 鼠标移入颜色变红，其他兄弟颜色变黑，并且相应的地方显示该元素详情。
        ".shop_stores span":".shop_stores_word"
    }
    var array =[    // 鼠标移入图片透明度改变
        ".g_top_r img",
        ".g_series_banner img",
        ".g_recommend_banner_box img",
        ".g_image_text img"
    ]
    new Animation(options,options2,array,".g_recommend_banner_box ul",".g_recommend_iconl",".g_recommend_iconr"); 
    // 参数4：鼠标移入，该元素向上运动
    // 参数5，6：对特殊对象的处理（点击按钮相应图片移动）

    //cookie 值判断，将购物车中的商品数量显示在右侧服务框上
    if(!$.cookie("goods")) return;
    var goodsArray = JSON.parse($.cookie("goods"));
    // console.log(goodsArray);
    
    var sum = 0;
    goodsArray.forEach(function(item){
        sum +=item.num *1;
    })
    $(".service_img2").children().html(sum);

    // 回到顶部事件，当滚动长度为700像素时显示回到顶部按钮
    document.onscroll =function(){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop >= 700){
            $(".go_top").css({display:"block"})
            $(".go_top").on("click",function(){
                document.documentElement.scrollTop = 0;
            
            })
        }else{
            $(".go_top").css({display:"none"})
        }
        
    }
})

