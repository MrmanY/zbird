$(function(){
    var $username = $("#username");
    var $pwd = $("#pwd");
    var $confirmpwd = $("#confirmpwd");
    var $register = $("#register") 
    var $info1 = $(".err_info1 span");
    var $info2 = $(".err_info2 span");
    var $info3 = $(".err_info3 span");
    // console.log($confirmpwd.val());
    var userReg = /^[a-z0-9\-_]{4,20}$/i;
    var pwdReg = /^[a-z0-9\-_]{6,20}$/i;
    $username.on("blur",function(){
        if(!userReg.test($username.val())){
            $info1.css({display:"block"});
            $username.css({borderColor:"red"})
        }else{
            $info1.css({display:"none"});
            $username.css({borderColor:"#FCEDEA"})
        }
    })
    $pwd.on("blur",function(){
        if(!pwdReg.test($pwd.val())){
            $info2.css({display:"block"});
            $pwd.css({borderColor:"red"})
        }else{
            $info2.css({display:"none"});
            $pwd.css({borderColor:"#FCEDEA"})
        }
    })
    $confirmpwd.on("blur",function(){
        if($confirmpwd.val() != $pwd.val()){
            $info3.css({display:"block"});
            $confirmpwd.css({borderColor:"red"})
        }else{
            $info3.css({display:"none"});
            $confirmpwd.css({borderColor:"#FCEDEA"})
        }
    })



    $("#register").on("click",function(){
        //把登陆信息交给后台验证;
        if($info1.css("display") != "none" || $info2.css("display") != "none" || $info3.css("display") != "none" || $username.val() == "") return;
        var opt = {
            url:"http://localhost/zbird/php/user.php",  
            type:"POST",  // 传送方式
            data:{username:$username.val(),password:$pwd.val(),type:"register"}  // 传送的数据
            // dataType:数据类型，
        }
        $.ajax(opt)
        .then(function(res){
            var user = JSON.parse(res);
            if(user == 1){
                alert("注册成功！为您跳转登录页面。")
                location.href ="http://localhost/zbird/login.html"
            }
            if(user == 2){
                alert("注册失败！该用户名存在。")
            }
        })
    })
})