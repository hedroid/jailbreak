/*************************************

脚本功能：句读——解锁会员
更新日期：2026-09-14
使用声明：⚠️仅供参考，🈲转载与售卖！

[rewrite_local]
^https?:\/\/judouapp.com\/api\/v2\/mine\/profile url script-response-body https://raw.githubusercontent.com/hedroid/jailbreak/main/QuantumultX/scripts/judou.js

[mitm]
hostname = judouapp.com

*************************************/

var body = $response.body;
let obj = JSON.parse($response.body);
obj.is_member = true;
obj.is_admin = true;
obj.is_year_member = true;
obj.member_expired_at = 32493834549;
obj.is_bind_phone = true;
$done({body: JSON.stringify(obj)});
