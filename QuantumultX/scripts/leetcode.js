/*************************************

 项目名称：leetcode
 脚本作者：hedroid
 使用声明：⚠️仅供参考，🈲转载与售卖！

 **************************************

 [rewrite_local]

 ^https:\/\/leetcode\.cn\/graphql\/(app)?$ url script-response-body https://raw.githubusercontent.com/hedroid/jailbreak/main/QuantumultX/scripts/leetcode.js

 [mitm]

 hostname = leetcode.cn

 *************************************/

let leetcode = JSON.parse($response.body);
const premiumExpiredAt = 4084012799000
const method = $request.headers["X-APOLLO-OPERATION-NAME"];

if (method === "UserPremiumInfo") {
    leetcode.data.userStatus.isPremium = true;
    leetcode.data.userStatus.premiumExpiredAt = premiumExpiredAt;
} else if (method === "restoreAppleReceiptInput") {
    leetcode.data.restoreAppleReceipt.ok = true;
    leetcode.data.restoreAppleReceipt.message = "恢复成功";
} else if (method === "UserStatus") {
    leetcode.data.userStatus.isPremium = true;
    leetcode.data.userStatus.isSuperuser = true;
    leetcode.data.userStatus.premiumExpiredAt = premiumExpiredAt;
}
$done({body: JSON.stringify(leetcode)});
