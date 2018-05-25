<?php
    // 后台echo的数据会直接返回到前端
    $user = $_POST["username"];
    $pwd = $_POST["password"];
    $type = $_POST["type"];   //判断是登录还是注册
    if($type !== "login" && $type !== "register"){
        $res = array("error"=>"i don't know what are u doing!");
        die(json_encode($res));  // 数组转字符串，前端只能接受字符串
    }
    require("./_connect.php");  //和数据库建立连接
    $pwd = md5($pwd);    //把传过来的密码使用md5加密
    $sql_login = "SELECT username,pwd FROM user";  // 数据库的查询语句
    $sql_register = "INSERT user(username,pwd) VALUES ('{$user}','{$pwd}')";  // 插入数据
    
    $result_login = $conn->query($sql_login);   //执行sql语句   返回结果集
    $hasuser = FALSE;   //用户名是否存在;
    $haspwd = FALSE;   //该用户名密码是否正确;
    // $select_res = FALSE;   //储存用户信息;

    while($row = $result_login->fetch_assoc()){  //对结果集进行遍历
        if($row["username"] == $user){
            $hasuser = TRUE;
            if($type == "register"){ //如果是注册，没必要判断密码;
                break;
            }
            if($row["pwd"] == $pwd){
                // $select_res = json_encode($row);    
                $haspwd = TRUE;
                break;
            }
        }
    }

    if($type == "login" &&  $haspwd == TRUE){  //用户名密码都对，登录成功  = > true
        die("true");   //$select_res
    }else if($type == "login"){ //登录失败 (用户名或密码不正确) => 0
        die("0");
    }

    if($type == "register" && $hasuser == TRUE){  //用户名存在; => 2;
        echo 2;
    }else if($hasuser == FALSE){   //注册成功;   =>1
        if($type == "register"){
            $result_register = $conn->query($sql_register);
        }
        echo 1;
    }

?>