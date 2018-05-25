$(function(){

    function Login(username,pwd,err_info_ele,btn_login){
        this.username = $(username);
        this.pwd =$(pwd);
        this.err_info_ele = $(err_info_ele);
        this.btn_login = $(btn_login);
        if(!this.username && !this.pwd) return;
        this.init();
    }

    Login.prototype = {
        constructor:Login,
        init(){
           this.regular_login();
           this.loging();
        },
        regular_login(){
            var userReg = /^[a-z0-9\-_]{4,20}$/i;    // 4-20位 数字、字母、下划线、横线，不区分大小写
            var pwdReg = /^[a-z0-9\-_]{6,20}$/i;
            this.username.on("blur",function(){
                // console.log(userReg.test($username.val()));
                if(!userReg.test(this.username.val())){   // 验证用户名是否输入正确，错误显示错误信息
                    this.err_info_ele.css({display:"block"});
                }else if(pwdReg.test(this.pwd.val()) && userReg.test(this.username.val())){  // 当用户名和密码都正确错误信息消失
                    this.err_info_ele.css({display:"none"});
                }
            }.bind(this))
            this.pwd.on("blur",function(){
                if(!pwdReg.test(this.pwd.val())){
                    this.err_info_ele.css({display:"block"});
                }else if(pwdReg.test(this.pwd.val()) && userReg.test(this.username.val())){
                    this.err_info_ele.css({display:"none"});
                }
            }.bind(this))
        },
        loging(){
            this.btn_login.on("click",function(){        
                //把登陆信息交给后台验证;
                if(this.err_info_ele.css("display") != "none") return;  // 当用户名密码正则验证错误时，不发送请求
                var opt = {
                    url:"http://localhost/zbird/php/user.php",
                    type:"POST",
                    data:{username:this.username.val(),password:this.pwd.val(),type:"login"}
                }
                $.ajax(opt)
                .then(function(res){
                    // console.log(res);
                    if(res == "true"){
                        location.href="http://localhost/zbird/index.html";
                    }
                    if(res == 0){
                        this.err_info_ele.css({display:"block"});
                    }
                }.bind(this));
            }.bind(this))
        }
    
    }
    new Login("#username","#pwd",".err_info span","#btn")

    // console.log($username,$pwd,$info);
})