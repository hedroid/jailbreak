/*
扫描宝
[rewrite_local]

#资料
https://app.yinxiang.com/third/profile/public/restful/public-user-profile? url script-response-body https://raw.githubusercontent.com/hedroid/jailbreak/blob/main/QuantumultX/scripts/saomiaobao.js

#会员
https://app.yinxiang.com/third/scanner/scanner/app/userInfo/get url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/saomiaobao2.js

[mitm]
hostname = app.yinxiang.com

*/
var baby = JSON.parse($response.body);
baby.userProfile.nickname = "hedroid";
baby.userProfile.avatarUrl = "https://tupian.qqw21.com/article/UploadPic/2019-10/201910162131618924.jpg";
baby.userProfile.email = "hedroid@126.com";
$done({body : JSON.stringify(baby)});
