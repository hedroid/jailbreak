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
    'net.domzilla.pdfpro': {
        iap: iap_1,
        expire: 1,
        version: "1",
        id: "net.domzilla.pdfpro.iap.premium.annual",
        latest: "https://github.com/hedroid"
    },
    'com.shengzhou.fileartifact': {
        iap: iap_1,
        expire: 1,
        version: "2",
        id: "com.shengzhou.fileartifact.month",
        latest: "https://github.com/hedroid"
    },
    //色采 https://is.gd/G3Dw6r
    'FuYuan.inkDiary': {
        iap: iap_1,
        expire: 1,
        version: "273",
        id: "FuYuan.inkDiary.YearB.Pro",
        latest: "MIIUBQYJKoZIhvcNAQcCoIIT9jCCE/ICAQExCzAJBgUrDgMCGgUAMIIDpgYJKoZIhvcNAQcBoIIDlwSCA5MxggOPMAoCARQCAQEEAgwAMAsCARkCAQEEAwIBAzAMAgEKAgEBBAQWAjQrMAwCAQ4CAQEEBAICAQAwDQIBAwIBAQQFDAMyNzMwDQIBDQIBAQQFAgMCSlUwDQIBEwIBAQQFDAMyNzMwDgIBAQIBAQQGAgRNN9zjMA4CAQkCAQEEBgIEUDI1NjAOAgELAgEBBAYCBAcVVsswDgIBEAIBAQQGAgQyzsgWMBICAQ8CAQEECgIIBvbVkE2WOscwFAIBAAIBAQQMDApQcm9kdWN0aW9uMBgCAQQCAQIEEHiky6mW6XOtncDuGNqMIvMwGQIBAgIBAQQRDA9GdVl1YW4uaW5rRGlhcnkwHAIBBQIBAQQUEvlOeGxt6SfNbZHNgK+U29NSSZ0wHgIBCAIBAQQWFhQyMDIyLTEwLTExVDA0OjQ5OjMzWjAeAgEMAgEBBBYWFDIwMjItMTAtMTFUMDQ6NDk6NDdaMB4CARICAQEEFhYUMjAyMi0xMC0xMVQwNDo0MTozMVowOAIBBwIBAQQwG2JaXp7w7emPLl/MkV9x/HhXZyTUPjULpE8RKYwLbj0AjJZN99VkKu38Kb4Os9pwMDsCAQYCAQEEM/udug1MnPKIeLcPYubpn+ePSHZaGPeWmrDokeTZH1RbclUeK5loNRA7N+M2QJY5S1ksOjCCAZUCARECAQEEggGLMYIBhzALAgIGrQIBAQQCDAAwCwICBrACAQEEAhYAMAsCAgayAgEBBAIMADALAgIGswIBAQQCDAAwCwICBrQCAQEEAgwAMAsCAga1AgEBBAIMADALAgIGtgIBAQQCDAAwDAICBqUCAQEEAwIBATAMAgIGqwIBAQQDAgEDMAwCAgaxAgEBBAMCAQEwDAICBrcCAQEEAwIBADAMAgIGugIBAQQDAgEAMA8CAgauAgEBBAYCBFaGuG4wEgICBq8CAQEECQIHAYcVUFIlADAaAgIGpwIBAQQRDA80MzAwMDEyNDM0NDE2NDIwGgICBqkCAQEEEQwPNDMwMDAxMjQzNDQxNjQyMB8CAgaoAgEBBBYWFDIwMjItMTAtMTFUMDQ6NDk6MzJaMB8CAgaqAgEBBBYWFDIwMjItMTAtMTFUMDQ6NDk6MzNaMB8CAgasAgEBBBYWFDIwMjItMTAtMTRUMDQ6NDk6MzJaMCQCAgamAgEBBBsMGUZ1WXVhbi5pbmtEaWFyeS5ZZWFyQi5Qcm+ggg5lMIIFfDCCBGSgAwIBAgIIDutXh+eeCY0wDQYJKoZIhvcNAQEFBQAwgZYxCzAJBgNVBAYTAlVTMRMwEQYDVQQKDApBcHBsZSBJbmMuMSwwKgYDVQQLDCNBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9uczFEMEIGA1UEAww7QXBwbGUgV29ybGR3aWRlIERldmVsb3BlciBSZWxhdGlvbnMgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkwHhcNMTUxMTEzMDIxNTA5WhcNMjMwMjA3MjE0ODQ3WjCBiTE3MDUGA1UEAwwuTWFjIEFwcCBTdG9yZSBhbmQgaVR1bmVzIFN0b3JlIFJlY2VpcHQgU2lnbmluZzEsMCoGA1UECwwjQXBwbGUgV29ybGR3aWRlIERldmVsb3BlciBSZWxhdGlvbnMxEzARBgNVBAoMCkFwcGxlIEluYy4xCzAJBgNVBAYTAlVTMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApc+B/SWigVvWh+0j2jMcjuIjwKXEJss9xp/sSg1Vhv+kAteXyjlUbX1/slQYncQsUnGOZHuCzom6SdYI5bSIcc8/W0YuxsQduAOpWKIEPiF41du30I4SjYNMWypoN5PC8r0exNKhDEpYUqsS4+3dH5gVkDUtwswSyo1IgfdYeFRr6IwxNh9KBgxHVPM3kLiykol9X6SFSuHAnOC6pLuCl2P0K5PB/T5vysH1PKmPUhrAJQp2Dt7+mf7/wmv1W16sc1FJCFaJzEOQzI6BAtCgl7ZcsaFpaYeQEGgmJjm4HRBzsApdxXPQ33Y72C3ZiB7j7AfP4o7Q0/omVYHv4gNJIwIDAQABo4IB1zCCAdMwPwYIKwYBBQUHAQEEMzAxMC8GCCsGAQUFBzABhiNodHRwOi8vb2NzcC5hcHBsZS5jb20vb2NzcDAzLXd3ZHIwNDAdBgNVHQ4EFgQUkaSc/MR2t5+givRN9Y82Xe0rBIUwDAYDVR0TAQH/BAIwADAfBgNVHSMEGDAWgBSIJxcJqbYYYIvs67r2R1nFUlSjtzCCAR4GA1UdIASCARUwggERMIIBDQYKKoZIhvdjZAUGATCB/jCBwwYIKwYBBQUHAgIwgbYMgbNSZWxpYW5jZSBvbiB0aGlzIGNlcnRpZmljYXRlIGJ5IGFueSBwYXJ0eSBhc3N1bWVzIGFjY2VwdGFuY2Ugb2YgdGhlIHRoZW4gYXBwbGljYWJsZSBzdGFuZGFyZCB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB1c2UsIGNlcnRpZmljYXRlIHBvbGljeSBhbmQgY2VydGlmaWNhdGlvbiBwcmFjdGljZSBzdGF0ZW1lbnRzLjA2BggrBgEFBQcCARYqaHR0cDovL3d3dy5hcHBsZS5jb20vY2VydGlmaWNhdGVhdXRob3JpdHkvMA4GA1UdDwEB/wQEAwIHgDAQBgoqhkiG92NkBgsBBAIFADANBgkqhkiG9w0BAQUFAAOCAQEADaYb0y4941srB25ClmzT6IxDMIJf4FzRjb69D70a/CWS24yFw4BZ3+Pi1y4FFKwN27a4/vw1LnzLrRdrjn8f5He5sWeVtBNephmGdvhaIJXnY4wPc/zo7cYfrpn4ZUhcoOAoOsAQNy25oAQ5H3O5yAX98t5/GioqbisB/KAgXNnrfSemM/j1mOC+RNuxTGf8bgpPyeIGqNKX86eOa1GiWoR1ZdEWBGLjwV/1CKnPaNmSAMnBjLP4jQBkulhgwHyvj3XKablbKtYdaG6YQvVMpzcZm8w7HHoZQ/Ojbb9IYAYMNpIr7N4YtRHaLSPQjvygaZwXG56AezlHRTBhL8cTqDCCBCIwggMKoAMCAQICCAHevMQ5baAQMA0GCSqGSIb3DQEBBQUAMGIxCzAJBgNVBAYTAlVTMRMwEQYDVQQKEwpBcHBsZSBJbmMuMSYwJAYDVQQLEx1BcHBsZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTEWMBQGA1UEAxMNQXBwbGUgUm9vdCBDQTAeFw0xMzAyMDcyMTQ4NDdaFw0yMzAyMDcyMTQ4NDdaMIGWMQswCQYDVQQGEwJVUzETMBEGA1UECgwKQXBwbGUgSW5jLjEsMCoGA1UECwwjQXBwbGUgV29ybGR3aWRlIERldmVsb3BlciBSZWxhdGlvbnMxRDBCBgNVBAMMO0FwcGxlIFdvcmxkd2lkZSBEZXZlbG9wZXIgUmVsYXRpb25zIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyjhUpstWqsgkOUjpjO7sX7h/JpG8NFN6znxjgGF3ZF6lByO2Of5QLRVWWHAtfsRuwUqFPi/w3oQaoVfJr3sY/2r6FRJJFQgZrKrbKjLtlmNoUhU9jIrsv2sYleADrAF9lwVnzg6FlTdq7Qm2rmfNUWSfxlzRvFduZzWAdjakh4FuOI/YKxVOeyXYWr9Og8GN0pPVGnG1YJydM05V+RJYDIa4Fg3B5XdFjVBIuist5JSF4ejEncZopbCj/Gd+cLoCWUt3QpE5ufXN4UzvwDtIjKblIV39amq7pxY1YNLmrfNGKcnow4vpecBqYWcVsvD95Wi8Yl9uz5nd7xtj/pJlqwIDAQABo4GmMIGjMB0GA1UdDgQWBBSIJxcJqbYYYIvs67r2R1nFUlSjtzAPBgNVHRMBAf8EBTADAQH/MB8GA1UdIwQYMBaAFCvQaUeUdgn+9GuNLkCm90dNfwheMC4GA1UdHwQnMCUwI6AhoB+GHWh0dHA6Ly9jcmwuYXBwbGUuY29tL3Jvb3QuY3JsMA4GA1UdDwEB/wQEAwIBhjAQBgoqhkiG92NkBgIBBAIFADANBgkqhkiG9w0BAQUFAAOCAQEAT8/vWb4s9bJsL4/uE4cy6AU1qG6LfclpDLnZF7x3LNRn4v2abTpZXN+DAb2yriphcrGvzcNFMI+jgw3OHUe08ZOKo3SbpMOYcoc7Pq9FC5JUuTK7kBhTawpOELbZHVBsIYAKiU5XjGtbPD2m/d73DSMdC0omhz+6kZJMpBkSGW1X9XpYh3toiuSGjErr4kkUqqXdVQCprrtLMK7hoLG8KYDmCXflvjSiAcp/3OIK5ju4u+y6YpXzBWNBgs0POx1MlaTbq/nJlelP5E3nJpmB6bz5tCnSAXpm4S6M9iGKxfh44YGuv9OQnamt86/9OBqWZzAcUaVc7HGKgrRsDwwVHzCCBLswggOjoAMCAQICAQIwDQYJKoZIhvcNAQEFBQAwYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4xJjAkBgNVBAsTHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBSb290IENBMB4XDTA2MDQyNTIxNDAzNloXDTM1MDIwOTIxNDAzNlowYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4xJjAkBgNVBAsTHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBSb290IENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5JGpCR+R2x5HUOsF7V55hC3rNqJXTFXsixmJ3vlLbPUHqyIwAugYPvhQCdN/QaiY+dHKZpwkaxHQo7vkGyrDH5WeegykR4tb1BY3M8vED03OFGnRyRly9V0O1X9fm/IlA7pVj01dDfFkNSMVSxVZHbOU9/acns9QusFYUGePCLQg98usLCBvcLY/ATCMt0PPD5098ytJKBrI/s61uQ7ZXhzWyz21Oq30Dw4AkguxIRYudNU8DdtiFqujcZJHU1XBry9Bs/j743DN5qNMRX4fTGtQlkGJxHRiCxCDQYczioGxMFjsWgQyjGizjx3eZXP/Z15lvEnYdp8zFGWhd5TJLQIDAQABo4IBejCCAXYwDgYDVR0PAQH/BAQDAgEGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFCvQaUeUdgn+9GuNLkCm90dNfwheMB8GA1UdIwQYMBaAFCvQaUeUdgn+9GuNLkCm90dNfwheMIIBEQYDVR0gBIIBCDCCAQQwggEABgkqhkiG92NkBQEwgfIwKgYIKwYBBQUHAgEWHmh0dHBzOi8vd3d3LmFwcGxlLmNvbS9hcHBsZWNhLzCBwwYIKwYBBQUHAgIwgbYagbNSZWxpYW5jZSBvbiB0aGlzIGNlcnRpZmljYXRlIGJ5IGFueSBwYXJ0eSBhc3N1bWVzIGFjY2VwdGFuY2Ugb2YgdGhlIHRoZW4gYXBwbGljYWJsZSBzdGFuZGFyZCB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB1c2UsIGNlcnRpZmljYXRlIHBvbGljeSBhbmQgY2VydGlmaWNhdGlvbiBwcmFjdGljZSBzdGF0ZW1lbnRzLjANBgkqhkiG9w0BAQUFAAOCAQEAXDaZTC14t+2Mm9zzd5vydtJ3ME/BH4WDhRuZPUc38qmbQI4s1LGQEti+9HOb7tJkD8t5TzTYoj75eP9ryAfsfTmDi1Mg0zjEsb+aTwpr/yv8WacFCXwXQFYRHnTTt4sjO0ej1W8k4uvRt3DfD0XhJ8rxbXjt57UXF6jcfiI1yiXV2Q/Wa9SiJCMR96Gsj3OBYMYbWwkvkrL4REjwYDieFfU9JmcgijNq9w2Cz97roy/5U2pbZMBjM3f3OgcsVuvaDyEO2rpzGU+12TZ/wYdV2aeZuTJC+9jVcZ5+oVK3G72TQiQSKscPHbZNnF5jyEuAF1CqitXa5PzQCQc3sHV1ITGCAcswggHHAgEBMIGjMIGWMQswCQYDVQQGEwJVUzETMBEGA1UECgwKQXBwbGUgSW5jLjEsMCoGA1UECwwjQXBwbGUgV29ybGR3aWRlIERldmVsb3BlciBSZWxhdGlvbnMxRDBCBgNVBAMMO0FwcGxlIFdvcmxkd2lkZSBEZXZlbG9wZXIgUmVsYXRpb25zIENlcnRpZmljYXRpb24gQXV0aG9yaXR5AggO61eH554JjTAJBgUrDgMCGgUAMA0GCSqGSIb3DQEBAQUABIIBAAD68Wau+dwa3v3cRzCe/DmRz2yGIPwAHWqzz0tgZDRtyyAncwhJdR89yZr4e7Gzu6wQLz9PEQyB2/4FGi4cacPibc89RTBR1+lQvzzX4h8SYZB38fsANvpNosPGJ2tgV/dtZZwHPzTyG5cJS1ZJIF5hfNWXv09VnM5wqCfJfMdEyByuOFv4jbTOqKkQjRN9amRKKpd4WO8WA3m0+F3kTJVPeN2SVxuH/rnRI4Tm9A1Hllhb2xcq8Dnf9FZQ1tHpaX79xuvaJl+znTP09Vq08c8W/vikZrrY+mDP1liBt2KalTQLlDOa5nwQhPqjo8RKs5ppHAqlO+ltu/ohifMROv8=",
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
