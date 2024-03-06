/******************************
脚本功能：证件照相馆-美颜证件照——解锁VIP
下载地址：https://is.gd/QCct8l
*******************************

[rewrite_local]

^https:\/\/appss\.rhinoxlab\.com\/app\/account\/getAccountInfo url script-response-body https://raw.githubusercontent.com/hedroid/jailbreak/main/QuantumultX/scripts/zjzXg.js
[mitm] 

hostname = appss.rhinoxlab.com


*******************************/


var objc = JSON.parse($response.body);

    objc = 
{
  "success" : true,
  "result" : {
    "mobile" : "18088888888",
    "registerTime" : "2023-01-01 00:00:00",
    "vipExpireDays" : 7,
    "nickname" : "hedroid",
    "dataId" : "10167836703880764475",
    "vipGroupInfos" : [
      {
        "groupType" : "TYPE_ONE",
        "vipType" : "VIP",
        "autoPay" : "YES"
      }
    ],
    "headImg" : "https://tupian.qqw21.com/article/UploadPic/2019-10/201910162131618924.jpg",
    "type" : "VIP",
    "inviteCode" : "dVWdrPKt",
    "vipExpireTime" : "2099-12-31 23:59:59"
  },
  "returnCode" : "200",
  "timeOut" : false
}



$done({body : JSON.stringify(objc)});
