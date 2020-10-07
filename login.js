window.onload = function() {
    // 邮箱验证
    var oEmail = document.getElementById("email");
    //邮箱提示信息
    var oEmail_asd = document.getElementById("email_asd");
    var oas = document.querySelectorAll('.nav li a')
    for (var i = 0; i < oas.length; i++) {
        // oas[i].setAttribute('index', i)

        oas[i].onclick = function() {
           
            for (var i = 0; i < oas.length; i++)
                oas[i].className = ''
            this.className = 'aStyle'

        }
    }
    //获取焦点
    oEmail.onfocus = function() {
        oEmail_asd.style.display = "block";
    };
    //失去焦点
    oEmail.onblur = function() {
            //1、获取输入框的内容
            var oValue = oEmail.value;
            if (!oValue) {
                //当输入为空的时候，提示信息不显示
                oEmail_asd.style.display = "block";
            } else { //当输入信息不为空的时候，判断输入格式是否符合要求
                //2、判断长度是否符合条件
                if (oValue.length > 18 || oValue.length < 6) {
                    oEmail_asd.innerHTML = "！长度应为6~8个字符";
                    oEmail_asd.style.display = "block";
                    oEmail_asd.style.color = "red";
                } else if (!isLetter(oValue[0])) {
                    //3、判断地址是否以字母开头
                    oEmail_asd.innerHTML = "邮箱地址应该以字母开头";
                    oEmail_asd.style.display = "block";
                    oEmail_asd.style.color = "red";
                } else {
                    //4、判断地址是否都是以数字、字母、下划线组成
                    isYes = true;
                    for (i = 0; i < oValue.length; i++) {
                        if (!isDef(oValue[i])) {
                            isYes = false;
                            break;
                        }
                    }
                    if (!isYes) {
                        //不符合条件
                        oEmail_asd.innerHTML = "！输入的字符只能是数字、字母、下划线"
                        oEmail_asd.style.display = "block";
                        oEmail_asd.style.color = "red";
                    } else {
                        //全部符合条件
                        oEmail_asd.innerHTML = "恭喜，该邮箱地址可以注册";
                        oEmail_asd.style.display = "block";
                        oEmail_asd.style.color = "green";

                    }
                }
            }
        }
        // isLetter=true;
        //判断单个字符是否是字母
    function isLetter(charStr) {
        if (charStr >= "A" && charStr <= "z") {
            return true;
        } else {
            return false;
        }
    }
    //判断输入内容是否为字母、数字、下划线
    function isDef(charStr) {
        if ((charStr >= "A" && charStr <= "z") ||
            (charStr >= 0 && charStr <= 9) ||
            charStr == "_") {
            return true;
        } else {
            return false;
        }
    }
    //密码验证
    var opwd = document.getElementById("pwd");
    var opwd_asd = document.getElementById("pwd_asd");
    opwd.onfocus = function() {
        opwd_asd.style.display = "block";
    }
    opwd.onblur = function() {
            //将一个值赋值给字符串
            var psdValue = opwd.value;
            if (psdValue > 16 || psdValue < 6) {
                opwd_asd.innerHTML = "!密码长度应为6~16个字符"
                opwd_asd.style.display = "block";
                opwd_asd.style.color = "red";
            } else if (isNaN) {
                //不能为纯数字、字母、非法字符
                opwd_asd.innerHTML = "!密码过于简单，请尝试字母+数字组合";
                opwd_asd.style.display = "block";
                opwd_asd.style.color = "red";
                return false;
            }

        }
    //手机号验证
    var ophone = document.getElementById("phone");
    var ophone_asd = document.getElementById("phone_asd");
    ophone.onfocus = function() {
        ophone_asd.style.display = "block";
    }
    ophone.onblur = function() {
        var phValue = ophone.value;
        if (!(/^1[3456789]\d{9}$/.test(phValue))) {
            ophone_asd.innerHTML = "请填写正确的中国大陆地区手机号，其他地区手机号请<a>点击此处</a>";
            ophone_asd.style.display = "block";
            ophone_asd.style.color = "red";
            return false;
        } else {
            ophone_asd.style.display = "block";
            ophone_asd.style.color = "green";
        }

    }
}
//条款同意验证
var oCheck = document.getElementById("check");
var okCheck = document.getElementById("ok");
var sub = document.getElementById("submit");
if (!oCheck.checked) {
sub.setAttribute('type', 'submit');
}