/*************************************

 项目名称：熊掌记
 **************************************

 [rewrite_local]
 ^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/hedroid/jailbreak/main/QuantumultX/scripts/BuyiTunes.js

 [mitm]
 hostname = buy.itunes.apple.com

 *************************************/
const body = JSON.parse($response.body);
//expire:0 永久；1 订阅
const appCfg = {
    version: "6",
    id: "net.shinyfrog.bear_iOS.pro_yearly_subscription_bis",
    latest: "https://github.com/hedroid",
}

let product_id = appCfg.id
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

let iap = [Object.assign({}, receipt_data, {
    "expires_date": "2099-09-09 09:09:09 Etc/GMT",
    "expires_date_pst": "2099-09-09 06:06:06 America/Los_Angeles",
    "is_in_intro_offer_period": "false",
    "web_order_line_item_id": "490000123456789",
    "expires_date_ms": "4092599349000",
})]

//常用数据核心(有到期时间)
body["receipt"]["in_app"] = (iap);
body["latest_receipt_info"] = (iap);
body["pending_renewal_info"] = [{
    "product_id": (product_id),
    "original_transaction_id": "490001314520000",
    "auto_renew_product_id": (product_id),
    "auto_renew_status": "1"
}];
body["latest_receipt"] = (appCfg.latest);

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
common_data["original_application_version"] = appCfg.version;
body["receipt"] = Object.assign({}, body["receipt"], common_data)

$done({body: JSON.stringify(body)});
