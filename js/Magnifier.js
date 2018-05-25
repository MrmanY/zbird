$(function(){

    function Magnifier(options){
		this.small_ele = $(options.small_ele);
		this.box_ele = $(options.box_ele);
		this.big_ele = $(options.big_ele);
        if(this.small_ele.length == 0 || this.box_ele.length == 0 || this.big_ele.length == 0) return;        
		this.init();
	}
	Magnifier.prototype = {
		constructor:Magnifier,
		init(){
        // 	this.ratio();
        // 鼠标移入，box，big显示，移出 消失
        this.small_ele.on("mouseenter",{hidden:false},$.proxy(this.toggleEle,this));
        this.small_ele.on("mouseleave",{hidden:true},$.proxy(this.toggleEle,this));
        // 鼠标移动，box，大图图片移动；
        this.small_ele.on("mousemove.smallMove",$.proxy(this.smallMove,this));
        this.small_ele.on("mousemove.bigMove",$.proxy(this.bigMove,this));
		},
		toggleEle(event){
			if(event.data.hidden){
				this.box_ele.hide();
				this.big_ele.hide();
			}else{
				this.box_ele.show();
				this.big_ele.show();
			}
		},
		smallMove(event){
			var eleX = event.offsetX-this.box_ele.width()/2;
			var eleY = event.offsetY-this.box_ele.height()/2;
			// console.log(eleX,eleY);
			// 边界检测;
			var maxWidth = this.small_ele.width() - this.box_ele.width();
			var maxHeight = this.small_ele.height() - this.box_ele.height();
			eleX = eleX <= 0 ? 0 : eleX;
			eleX = eleX >= maxWidth ?  maxWidth : eleX;
			eleY = eleY <= 0 ? 0 : eleY;
			eleY = eleY >= maxHeight ?  maxHeight : eleY;
			this.box_ele.css({left:eleX,top:eleY})
			this.propX = - eleX * 2
			this.propY = - eleY * 2
		},
		bigMove(){
            this.big_ele.children().css({
                left:this.propX,
                top:this.propY
            })
		}	
	}
	new Magnifier({
		small_ele:".masonry_l_img",
		box_ele:".small_box",
		big_ele:"#masonry_l_bigimg"
	})


	
	
})