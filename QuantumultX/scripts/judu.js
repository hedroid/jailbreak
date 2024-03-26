[rewrite_local]
# > 句读 vip
^https?:\/\/judouapp.com\/api\/v2\/mine\/profile url script-response-body https://raw.githubusercontent.com/hedroid/jailbreak/main/QuantumultX/scripts/judu.js

[mitm] 
hostname = judouapp.com
*
*
*/
var body = $response.body; 
let obj = JSON.parse($response.body);
obj.is_member = true ;
obj.is_admin = true ;
//obj.is_year_member = true ;
obj.nickname = "hedroid" ;
obj.member_expired_at = 32493834549 ;
obj.is_bind_phone = true ;
$done({body: JSON.stringify(obj)});
