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
            $.each(this.options,function(ele,changeEle){     //对对象遍历，获取 ele => 添加事件的元素,changeEle= >显示隐藏的元素 
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
        },
    }

    var options={   // 要触发事件的对象的id/class，和要进行变换的对象的id/class 
        "#shop_car":".shop_car_list",
        "#my_bird":".my_bird_list",
        "#htc":".htc_list",
        ".leve_nav":".nav_menu_bg",
        ".shop_identity_item span":".shop_stores",
    }
    var options2={  
        ".shop_stores span":".shop_stores_word"
    }
    var array =[
        ".g_top_r img",
        ".g_series_banner img",
        ".g_recommend_banner_box img",
        ".g_image_text img"
    ]
    new Animation(options,options2,array,".g_recommend_banner_box ul",".g_recommend_iconl",".g_recommend_iconr"); 
    
    function ZbBanner(banner_ele){
        this.prev = $(banner_ele.prev);
        this.next = $(banner_ele.next);
        this.item = $(banner_ele.item);
        this.span = $(banner_ele.span);
        this.span_active = banner_ele.span_active;
        this.data = banner_ele.data;
        this.index = 0;
        if(!this.item) return;
        this.init()
    }
    ZbBanner.prototype = {
        constructor:ZbBanner,
        init(){     // 建立多个轮播效果
            if(this.data == 1){     // 1. 淡入淡出
                this.banner1();
            } else if(this.data == 2){  // 2. 无缝轮播，向左滑动。
                this.banner2();
            }else if(this.data == 3){
                this.banner3();
            }
            this.motion_banner();   // 轮播图自行运动。
            this.move_banner_fspan()  // 移动span，图片移动
        }, 
        banner1(){            
            // console.log(this.prev,this.next,this.item,this.span);
            var show,hidden;
            this.next[0].onclick = function(){  //给按钮添加点击事件（next[0],将jq对象 => 原生对象）
                // console.log(1);
                hidden = this.index;   // 图片显示和隐藏的下标
                if(this.index == this.item.children().length - 1){
                    this.index= 0;
                    show = 0;
                }else{
                    ++this.index;
                    show = this.index;
                }
                // console.log(this.index,hidden,show);
                // console.log(this.item.eq(0));
                // this.item.children().eq(show).css({opacity:1});
                // this.item.children().eq(hidden).css({opacity:0});
                this.item.children().eq(show).stop().animate({opacity:0},function(){
                    this.item.children().eq(show).animate({opacity:1});                    
                }.bind(this)) 
                this.item.children().eq(hidden).stop().animate({opacity:1},function(){
                    this.item.children().eq(hidden).animate({opacity:0},300)                           
                }.bind(this))
                $.each(this.span,function(subs,ele){
                    // console.log(index,ele);
                    $(ele).removeClass(this.span_active);   // 移除所有的样式
                }.bind(this));
               this.span.eq(show).attr("class",this.span_active);
            }.bind(this)
            this.prev[0].onclick = function(){  //给按钮添加点击事件（next[0],将jq对象 => 原生对象）
                // console.log(1);
                hidden = this.index;   // 图片显示和隐藏的下标
                if(this.index == 0){
                    this.index= this.item.children().length - 1;
                    show = this.index
                }else{
                    show = --this.index;;
                }
                // console.log(this.index,hidden,show);
                // console.log(this.item.eq(0));
                // this.item.children().eq(show).css({opacity:1});
                // this.item.children().eq(hidden).css({opacity:0});
                this.item.children().eq(show).stop().animate({opacity:0},function(){
                    this.item.children().eq(show).animate({opacity:1});                    
                }.bind(this)) 
                this.item.children().eq(hidden).stop().animate({opacity:1},function(){
                    this.item.children().eq(hidden).animate({opacity:0},300)                           
                }.bind(this))

                $.each(this.span,function(subs,ele){
                    // console.log(index,ele);
                    $(ele).removeClass(this.span_active);   // 移除所有的样式
                }.bind(this));
               this.span.eq(show).attr("class",this.span_active);
            }.bind(this)
        },
        banner2(){
            // console.log(1);
            var show,hidden
            var move_width = this.item.children().width();
            this.Wf_banner = function(){    // 定义事件，以便轮播
                hidden = this.index;
                if(this.index == this.item.children().length - 1){
                    this.index= 0;
                    show = 0;
                }else{
                    ++this.index;
                    show = this.index;
                }
                // console.log(this.index,hidden,show);
                // console.log(this.item.eq(0));
                this.item.children().eq(show).css({   // 要显示的先放到右边，z-index级别最高
                    zIndex:2,
                    left: move_width
                });
                this.item.children().eq(show).animate({left:0},500)  // 运动
                this.item.children().eq(hidden).animate({   // 要隐藏的运动到最左边，z-index调低
                    left: - move_width,
                    zIndex:1
                },500);
                $.each(this.span,function(subs,ele){
                    // console.log(index,ele);
                    $(ele).removeClass(this.span_active);   // 移除所有的样式
                }.bind(this));
               this.span.eq(show).attr("class",this.span_active);    
            }          
        },
        banner3(){
            var hidden= this.item.attr("class");
            this.dsbanner = function(){
                this.item.eq(this.index).show();
                this.item.eq(this.index).siblings("."+hidden).hide(); 
                // console.log(this.item.eq(this.index).siblings("."+hidden));
                this.span.eq(this.index).attr("class",this.span_active);
                this.span.eq(this.index).siblings().removeClass(this.span_active);
                
                if(this.index == this.item.length - 1){
                    this.index = 0;
                }else{
                    this.index++;
                }
                
                
            }
            this.dsbanner();
        },
        motion_banner(){
            var timer = null;
            if(this.data == 1){
                timer = setInterval(function(){this.next[0].onclick()}.bind(this),4000);
                this.item.on("mouseover",function(){clearInterval(timer)});
                this.prev.on("mouseover",function(){clearInterval(timer)});
                this.next.on("mouseover",function(){clearInterval(timer)});
                this.span.on("mouseover",function(){clearInterval(timer)});
                this.item.on("mouseout",function(){
                    timer = setInterval(function(){this.next[0].onclick()}.bind(this),4000)
                }.bind(this))
            }else if(this.data == 2){
                timer = setInterval(function(){this.Wf_banner()}.bind(this),4000)
                this.item.on("mouseover",function(){clearInterval(timer)});
                this.span.on("mouseover",function(){clearInterval(timer)});
                this.item.on("mouseout",function(){
                    timer = setInterval(function(){this.Wf_banner()}.bind(this),4000)
                }.bind(this))
            }else if(this.data ==3){
                timer = setInterval(function(){this.dsbanner()}.bind(this),4000)
                this.item.on("mouseover",function(){clearInterval(timer)});
                this.span.on("mouseover",function(){clearInterval(timer)});
                this.item.on("mouseout",function(){
                    timer = setInterval(function(){this.dsbanner()}.bind(this),4000)
                }.bind(this))
                this.span.on("mouseout",function(){
                    timer = setInterval(function(){this.dsbanner()}.bind(this),4000)
                }.bind(this))
            }
        },
        move_banner_fspan(){
            if(this.data == 1){
                var hidden,show;
                var _this = this
                $.each(this.span,function(subs,ele){
                    // console.log(index,ele);
                    $(ele).on("mouseenter",function(){
                        // console.log(subs);
                        $(this).siblings().removeClass(_this.span_active);
                        $(this).attr("class",_this.span_active); 
                        hidden = _this.index;
                        show = subs;
                        _this.index = subs;
                        // console.log(subs,hidden,show);
                        _this.item.children().eq(hidden).css({opacity:0});  // 对于subs == index的问题，如下顺序即可
                        _this.item.children().eq(show).css({opacity:1});
                        // console.log(_this.item.children().eq(show));
                    });
                }.bind(this));
            }else if(this.data == 2){
                var hidden,show;
                var _this = this
                var move_width = this.item.children().width();
                $.each(this.span,function(subs,ele){
                    // console.log(index,ele);
                    $(ele).on("mouseenter",function(){
                        // console.log(subs);
                        $(this).siblings().removeClass(_this.span_active);
                        $(this).attr("class",_this.span_active); 
                        hidden = _this.index;
                        show = subs;
                        _this.index = subs;
                        // console.log(subs,hidden,show);
                        // 当 show == hidden 的时候不做任何处理
                        if(show>hidden){
                            _this.item.children().eq(show).css({   // 要显示的先放到右边，z-index级别最高
                                zIndex:2,
                                left: move_width
                            });
                            _this.item.children().eq(show).animate({left:0},300)  // 运动
                            _this.item.children().eq(hidden).animate({   // 要隐藏的运动到最左边，z-index调低
                                left: - move_width,
                                zIndex:1
                            },500);
                        }else if(show < hidden){
                            _this.item.children().eq(show).css({   // 要显示的先放到右边，z-index级别最高
                                zIndex:2,
                                left: -move_width
                            });
                            _this.item.children().eq(show).animate({left:0},300)  // 运动
                            _this.item.children().eq(hidden).animate({   // 要隐藏的运动到最左边，z-index调低
                                left: move_width,
                                zIndex:1
                            },500);
                        }
                        // console.log(_this.item.children().eq(show));
                    });
                }.bind(this));
            }else if(this.data == 3){
                var _this = this
                var hidden = this.item.attr("class");
                $.each(this.span,function(subs,ele){
                    $(ele).on("mouseenter",function(){
                        _this.index = subs;
                        _this.item.eq(_this.index).show();
                        _this.item.eq(_this.index).siblings("."+hidden).hide(); 
                        _this.span.eq(_this.index).attr("class",_this.span_active);
                        _this.span.eq(_this.index).siblings().removeClass(_this.span_active);
                    })
                    
                })
                
            }
        }
    }
    var banner_ele = {
        prev:".nav_banner_iconl",
        next:".nav_banner_iconr",
        item:".nav_banner ul",
        span:".banner_radius span",
        span_active:"banner_radius_active",
        data:1
    }
    var banner_ele2 = {
        item:".shop_banner ul",
        span:".banner_circle span",
        span_active:"banner_circle_active",
        data:2
    }
    var banner_ele3 = {
        item:".g_series_banner",
        span:".g_series_nav span",
        span_active:"g_series_active",
        data:3
    }
    new ZbBanner(banner_ele);
    new ZbBanner(banner_ele2);
    new ZbBanner(banner_ele3);
})

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