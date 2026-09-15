/*************************************

 项目名称：iTunes-系列解锁合集
 更新日期：2024-03-01
 脚本作者：hedroid
 使用声明：⚠️仅供参考，🈲转载与售卖！
 特别说明：此脚本可能会导致App Store无法登录ID
 解决方法：关[MITM][脚本][代理工具]方法选一即可
 特别说明：自己研究学习使用，参考代码https://ghproxy.com/https://raw.githubusercontent.com/chxm1023/Script_X/main/Collections.conf
 **************************************

 [rewrite_local]
 ^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/hedroid/jailbreak/main/QuantumultX/scripts/BuyiTunes.js

 [mitm]
 hostname = buy.itunes.apple.com

 *************************************/
const body = JSON.parse($response.body);
const ua = $request.headers['User-Agent'] || $request.headers['user-agent'];
const bundle_id = body.receipt["bundle_id"] || body.receipt["Bundle_Id"];

//识别数据，处理到期时间或永久，多重购买
const iap_1 = function (receipt_data) {
    return [Object.assign({}, receipt_data, {
        "expires_date": "2099-09-09 09:09:09 Etc/GMT",
        "expires_date_pst": "2099-09-09 06:06:06 America/Los_Angeles",
        "is_in_intro_offer_period": "false",
        "web_order_line_item_id": "490000123456789",
        "expires_date_ms": "4092599349000",
    })]
}
const iap_2 = function (receipt_data) {
    return [(receipt_data)];
}

const iap_3 = function (receipt_data) {
    return [];
}

const iap_4 = function (receipt_data) {
    let product_id0 = this.id0
    let product_id = this.id
    return [
        Object.assign({}, receipt_data, {"product_id": (product_id0)}),
        Object.assign({}, receipt_data, {
            "expires_date": "2099-09-09 09:09:09 Etc/GMT",
            "expires_date_pst": "2099-09-09 06:06:06 America/Los_Angeles",
            "is_in_intro_offer_period": "false",
            "web_order_line_item_id": "490000123456789",
            "expires_date_ms": "4092599349000",
            "product_id": (product_id)
        })];
}

//expire:0 永久；1 订阅
const apps = {
    'com.zhk.forworld': {iap: iap_3, expire: 0, version: "1", id: "", latest: "https://github.com/hedroid"},
    'com.coderforart.iOS.MWeb': {
        iap: iap_2,
        expire: 1,
        version: "968",
        id: "10001",
        latest: "https://github.com/hedroid"
    },
    'com.icandiapps.nightsky': {
        iap: iap_1,
        expire: 1,
        version: "12.0.2.1",
        id: "com.icandiapps.ns4.annual",
        latest: "https://github.com/hedroid"
    },
    'com.shengzhou.fileartifact': {
        iap: iap_1,
        expire: 1,
        version: "2",
        id: "com.shengzhou.fileartifact.month",
        latest: "https://github.com/hedroid"
        // 文晓生，文件管理小说阅读神器
    },
    'com.dandelion.Routine': {
        iap: iap_1,
        expire: 1,
        version: "364",
        id: "membership",
        latest: "https://github.com/hedroid",
        //小日常
    },
}

for (const i in apps) {
    if (new RegExp(`^${i}`, `i`).test(ua) || new RegExp(`^${i}`, `i`).test(bundle_id)) {
        let product_id = apps[i].id
        let receipt_data = {
            "quantity": "1",
            "purchase_date_ms": "1694250549000",
            "transaction_id": "490001314520000",
            "is_trial_period": "false",
            "original_transaction_id": "490001314520000",
            "purchase_date": "2023-09-09 09:09:09 Etc/GMT",
            "product_id": (product_id),
            "original_purchase_date_pst": "2023-09-09 02:09:10 America/Los_Angeles",
            "in_app_ownership_type": "PURCHASED",
            "original_purchase_date_ms": "1694250550000",
            "purchase_date_pst": "2023-09-09 02:09:09 America/Los_Angeles",
            "original_purchase_date": "2023-09-09 09:09:10 Etc/GMT"
        };

        let iap = apps[i].iap(receipt_data)
        //永久数据核心(无到期时间)
        if (apps[i].expire === 0) {
            body["receipt"]["in_app"] = (iap);
        }
        //常用数据核心(有到期时间)
        if (apps[i].expire === 1) {
            body["receipt"]["in_app"] = (iap);
            body["latest_receipt_info"] = (iap);
            body["pending_renewal_info"] = [{
                "product_id": (product_id),
                "original_transaction_id": "490001314520000",
                "auto_renew_product_id": (product_id),
                "auto_renew_status": "1"
            }];
            body["latest_receipt"] = (apps[i].latest);
        }
        //通用数据(可有可无)
        let common_data = {
            "request_date": "2023-09-09 16:06:27 Etc/GMT",
            "request_date_pst": "2023-09-09 06:06:27 America/Los_Angeles",
            "request_date_ms": "1694273635000",
            "original_purchase_date": "2023-09-09 16:00:00 Etc/GMT",
            "original_purchase_date_pst": "2023-09-09 06:00:00 America/Los_Angeles",
            "original_purchase_date_ms": "1694273430000",
            "receipt_creation_date": "2023-09-09 16:06:26 Etc/GMT",
            "receipt_creation_date_pst": "2023-09-09 06:06:26 America/Los_Angeles",
            "receipt_creation_date_ms": "1694273634000"
        };
        //判断是否需要加入版本号(可有可无)
        if (apps[i].version && apps[i].version.trim() !== '') {
            common_data["original_application_version"] = apps[i].version;
        }
        body["receipt"] = Object.assign({}, body["receipt"], common_data);
        break;
    }
}
$done({body: JSON.stringify(body)});
