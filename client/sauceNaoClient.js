import https from 'https';
import url from 'url';

class SauceNaoClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    makeRequest(imgUrl, numres = 10, db = 999, dedupe = 2) {

        const requestUrl = url.parse(url.format({
            protocol: "https",
            hostname: "saucenao.com",
            pathname: "search.php",
            query: {
                api_key: this.apiKey,
                db: db,
                output_type: 2,
                numres: numres,
                url: imgUrl
            }
        }));

        const options = {
            hostname: requestUrl.host,
            port: requestUrl.port,
            path: requestUrl.path,
            method: "GET"
        }

        return new Promise((resolve, reject) => {
            	const req = https.request(options, res => {
                    let result = "";

                    res.on("data", d => {
                        result += d;
                    });

                    res.on("end", () => {
                        resolve(JSON.parse(result));
                    });
                });

                req.end();
        });
    }
}

export default SauceNaoClient;