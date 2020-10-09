<?php
  header("Content-type:text/html;charset=utf-8");

  // 模拟官方返回数据
  $responseData = array("code" => 0 , "msg" => "");

  //post 的数据取出
  $phone = $_POST['phone'];
  $username = $_POST['username'];
  $password = $_POST['password'];
  $createTime = $_POST['createTime'];

  // 判断

  if(!$phone){
    $responseData['code'] = 1;
    $responseData['msg'] = "手机号不能为空";
    echo json_encode($responseData);
    exit;
  }

  if(!$username){
    $responseData['code'] = 2;
    $responseData['msg'] = "用户名不能为空";
    echo json_encode($responseData);
    exit;
  }

  
  if(!$password){
    $responseData['code'] = 3;
    $responseData['msg'] = "密码不能为空";
    echo json_encode($responseData);
    exit;
  }

  // 连接数据库
  $link = mysql_connect("localhost" , "root" , "123456");

  //判断是否链接
  
  if(!$link){
    $responseData['code'] = 4;
    $responseData['msg'] = "服务器忙";
    echo json_encode($responseData);
    exit;
  }

  //设置访问字符集
  mysql_set_charset("utf8");

  // 选择数据库
  mysql_select_db("suning");

  //sql
  $sql = "SELECT * FROM users WHERE username = '{$username}'";

   //
   $res = mysql_query($sql);

   $row = mysql_fetch_assoc($res);

   if($row){
       $responseData['code'] = 5;
       $responseData['msg'] = "用户名已存在";
       echo json_encode($responseData);
       exit;
   }

   $password = md5(md5(md5($password)."qianfeng")."qingdao");

   //注册

   $sql2 = "INSERT INTO users(phone,username,password,createTime) VALUES('{$phone}','{$username}','{$password}',{$createTime})";

   $res = mysql_query($sql2);

   if(!$res){
       $responseData['code'] = 6;
       $responseData['msg'] = "注册失败";
       echo json_encode($responseData);
       exit;
   }

   $responseData['msg'] = "注册成功";
   echo json_encode($responseData);

   //
   mysql_close($link);


?>