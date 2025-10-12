/*************************************

 项目名称：Revenuecat-系列解锁合集
 更新日期：2024-03-01
 脚本作者：hedroid
 使用声明：⚠️仅供参考，🈲转载与售卖！
 特别说明：自己研究学习使用，参考代码https://ghproxy.com/https://raw.githubusercontent.com/chxm1023/Script_X/main/Collections.conf
 **************************************

 [rewrite_local]
 ^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/hedroid/jailbreak/main/QuantumultX/scripts/RevenueCat.js
 ^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/hedroid/jailbreak/main/QuantumultX/scripts/RevenueCat.js
 ^https?:\/\/app-measurement\.com\/config\/app url reject
 ^https?:\/\/firestore\.googleapis\.com url reject

 [mitm]
 hostname = api.revenuecat.com, app-measurement.com, firestore.googleapis.com

 *************************************/

const response = {};
const headers = $request.headers;
const body = JSON.parse(typeof $response != "undefined" && $response.body || null);
const ua = headers['User-Agent'] || headers['user-agent'];
const bundle_id = headers['X-Client-Bundle-ID'] || headers['x-client-bundle-id'];


const apps = {
    'Noto%20%E7%AC%94%E8%AE%B0': {id: 'com.lkzhao.editor.pro.ios.monthly', name: 'pro', expire: 1},
    'PDF%20Viewer': {id: 'com.pspdfkit.viewer.sub.pro.yearly', name: 'sub.pro', expire: 1},  //PDF Viewerr
}

if (typeof $response == "undefined") {
    delete headers["x-revenuecat-etag"];
    delete headers["X-RevenueCat-ETag"];
    response.headers = headers;
} else if (body && body.subscriber) {
    body.subscriber.subscriptions = body.subscriber.subscriptions || {};
    body.subscriber.entitlements = body.subscriber.entitlements || {};
    for (const i in apps) {
        if (new RegExp(`^${i}`, `i`).test(ua) || new RegExp(`^${i}`, `i`).test(bundle_id)) {
            let id = apps[i].id, name = apps[i].name, id0 = apps[i].id0, name0 = apps[i].name0;
            let data = {"purchase_date": "2023-09-09T09:09:09Z"};
            if (apps[i].expire === 1) {
                Object.assign(data, {"expires_date": "2099-09-09T09:09:09Z"})
            }

            body.subscriber.entitlements[name] = Object.assign({}, data, {product_identifier: id});
            if (typeof name0 !== 'undefined' && name0 !== null) {
                body.subscriber.entitlements[name0] = Object.assign({}, data, {product_identifier: id0});
            }
            const subData = Object.assign({}, data, {
                "author": "github.com",
                "warning": "仅供学习，禁止转载或售卖",
                "original_purchase_date": "2023-09-09T09:09:09Z",
                "store_transaction_id": "4900066666666666",
                "period_type": "normal",
                "store": "app_store",
                "ownership_type": "PURCHASED"
            });
            body.subscriber.subscriptions[id] = subData;
            if (typeof id0 !== 'undefined' && id0 !== null) {
                body.subscriber.subscriptions[id0] = subData;
            }
            response.body = JSON.stringify(body);
            break;
        }
    }
}

$done(response);
