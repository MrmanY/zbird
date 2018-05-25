$(function(){
    function Register(opts){
        this.opts = opts;
        this.init();
    }
    Register.prototype = {
        constructor:Register,
        init(){
            this.regular_register();
            this.registering();
        },
        regular_register(){
            
            var userReg = /^[a-z0-9\-_]{4,20}$/i;
            var pwdReg = /^[a-z0-9\-_]{6,20}$/i;
            $(this.opts.username).on("blur",function(){
                if(!userReg.test($(this.opts.username).val())){
                    $(this.opts.info1).css({display:"block"});
                    $(this.opts.username).css({borderColor:"red"})
                }else{
                    $(this.opts.info1).css({display:"none"});
                    $(this.opts.username).css({borderColor:"#FCEDEA"})
                }
            }.bind(this))
            $(this.opts.pwd).on("blur",function(){
                if(!pwdReg.test($(this.opts.pwd).val())){
                    $(this.opts.info2).css({display:"block"});
                    $(this.opts.pwd).css({borderColor:"red"})
                }else{
                    $(this.opts.info2).css({display:"none"});
                    $(this.opts.pwd).css({borderColor:"#FCEDEA"})
                }
            }.bind(this))
            $(this.opts.confirmpwd).on("blur",function(){
                if($(this.opts.confirmpwd).val() != $(this.opts.pwd).val()){
                    $(this.opts.info3).css({display:"block"});
                    $(this.opts.confirmpwd).css({borderColor:"red"})
                }else{
                    $(this.opts.info3).css({display:"none"});
                    $(this.opts.confirmpwd).css({borderColor:"#FCEDEA"})
                }
            }.bind(this))
        },
        registering(){
            $(this.opts.register_btn).on("click",function(){
                //把登陆信息交给后台验证;
                if($(this.opts.info1).css("display") != "none" || $(this.opts.info2).css("display") != "none" || $(this.opts.info3).css("display") != "none") return;
                var opt = {
                    url:"http://localhost/zbird/php/user.php",  
                    type:"POST",  // 传送方式
                    data:{username:$(this.opts.username).val(),password:$(this.opts.pwd).val(),type:"register"}  // 传送的数据
                    // dataType:数据类型，
                }
                $.ajax(opt)
                .then(function(res){                 
                    if(res == 1){
                        alert("注册成功！为您跳转登录页面。")
                        location.href ="http://localhost/zbird/login.html"
                    }
                    if(res == 2){
                        alert("注册失败！该用户名存在。")
                    }
                })
            }.bind(this));
        }
    }
    var opts = {
        username:"#username",
        pwd:"#pwd",
        confirmpwd:"#confirmpwd",
        register_btn:"#register",
        info1:".err_info1 span",
        info2:".err_info2 span",
        info3:".err_info3 span"
    }
    new Register(opts);

})