$(function(){
    var $username = $("#username");
    var $pwd = $("#pwd"); 
    var $info = $(".err_info span");
    // console.log($username,$pwd,$info);
    var userReg = /^[a-z0-9\-_]{4,20}$/i;    // 4-20位 数字、字母、下划线、横线，不区分大小写
    var pwdReg = /^[a-z0-9\-_]{6,20}$/i;
    $username.on("blur",function(){
        // console.log(userReg.test($username.val()));
        if(!userReg.test($username.val())){   // 验证用户名是否输入正确，错误显示错误信息
            $info.css({display:"block"});
        }else if(pwdReg.test($pwd.val()) && userReg.test($username.val())){  // 当用户名和密码都正确错误信息消失
            $info.css({display:"none"});
        }
    })
    $pwd.on("blur",function(){
        if(!pwdReg.test($pwd.val())){
            $info.css({display:"block"});
        }else if(pwdReg.test($pwd.val()) && userReg.test($username.val())){
            $info.css({display:"none"});
        }
    })
    $("#btn").on("click",function(){        
        //把登陆信息交给后台验证;
        if($info.css("display") != "none" || $username.val() == "" || $pwd.val() == "") return;
        var opt = {
            url:"http://localhost/zbird/php/user.php",
            type:"POST",
            data:{username:$username.val(),password:$pwd.val(),type:"login"}
        }
        $.ajax(opt)
        .then(function(res){
            var user = JSON.parse(res);
            if(user.username == $username.val() && user.pwd == $pwd.val()){
                location.href="http://localhost/zbird/index.html";
            }
            if(user == 0){
                $info.css({display:"block"});
            }
        })
    })
})