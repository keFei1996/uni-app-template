export const validIdCard = function (val) {
  const reg=/^((\d{18})|([0-9x]{18})|([0-9X]{18}))$/;
  return reg.test(val)
}

// 手机号验证
export const validTel = (val) => {
  const reg=/^1[3456789]\d{9}$/;
  return reg.test(val)
};

// 密码须包含数字、字母、符号至少2种或以上元素
export const validPassword = function(password) {
  let Modes = [];
  for (let i = 0; i < password.length; i++) {
    Modes.push(CharMode(password.charCodeAt(i)))
  }
  return bitTotal(Modes);
  //CharMode函数
  function CharMode(iN) {
    if (iN >= 48 && iN <= 57)//数字
      return 1;
    if (iN >= 65 && iN <= 90) //大写字母
      return 2;
    if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90))
  //大小写
      return 4;
    else
      return 8; //特殊字符
  }
  //bitTotal函数
  function bitTotal(num) {
    let modeTotal = 0;
    if(num.includes(1)) {
      modeTotal++
    }
    if(num.includes(2) || num.includes(4)) {
      modeTotal++
    }
    if(num.includes(8)) {
      modeTotal++
    }
    return modeTotal;
  }
}

//校验邮箱
export const validEmail = function(val) {
  const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
  return reg.test(val)
}

//校验银行卡号
export const validBankNum = function(val) {
  const reg = /^([1-9]{1})(\d{11}|\d{15}|\d{16}|\d{17}|\d{18})$/;
  return reg.test(val)
}

// 6位验证码
export const telCode = function(val) {
  const reg = /^\d{6}$/;
  return reg.test(val)
}

/*
判断url
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}