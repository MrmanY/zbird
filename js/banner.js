$(function(){
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
