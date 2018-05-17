$(function(){
    function Animation(options){
        this.options = options;
        if(!this.options) return;  // 参数判断，要是对象为空 不再向下执行代码
        this.init();
    }
    Animation.prototype = {
        constructor:Animation,
        init(){                     //  或者init:function(){} 
            $.each(this.options,function(ele,changeEle){     //对对象遍历，获取 ele => 添加时间的元素,changeEle= >显示隐藏的元素 
                if($(ele).length > 1){   // 若传入对象 大于1个，对其再次遍历，使每个元素都添加上事件
                    $.each($(ele),function(index,ele){
                        ele.onmouseenter = function(){          // 鼠标移入事件，此处不是jq对象！！！
                            $(changeEle).eq(index).toggle();    // 获取相对应的元素，并使其显示（eq选择是jq对象 [index]选择是原生对象）
                        }
                        ele.onmouseleave = function(){      // 鼠标移出事件！
                            $(changeEle).eq(index).toggle();  
                        }
                    })
                } else {
                    $(ele).on("mouseenter",function(){  //  通过toggle设置每个对象相对应元素的display属性
                        $(changeEle).toggle();     
                    })
                    $(ele).on("mouseleave",function(){
                        $(changeEle).toggle();
                    })
                    // console.log(this.options); 
                }               
            });
        },
        mouse(){
        }
    }
    var options={   // 要触发事件的对象的id/class，和要进行变换的对象的id/class 
        "#shop_car":".shop_car_list",
        "#my_bird":".my_bird_list",
        "#htc":".htc_list",
        ".leve_nav":".nav_menu_bg"
    }    
    new Animation(options); 
})
