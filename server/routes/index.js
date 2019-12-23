const cheerio = require('cheerio');
const https = require('https');
const iconv = require('iconv-lite');

var express = require('express');
var router = express.Router();


const baseURL = "https://www.fuyin.tv";


router.post('/', (req, res, next) => {
    const url = req.body.url

    new Promise((resolve) => {

        https.get(url, (sres) => {
            var chunks = [];
            sres.on('data', (chunk) => {
                chunks.push(chunk);
            });
            sres.on('end', () => {
                var html = iconv.decode(Buffer.concat(chunks), 'gb2312');
                var $ = cheerio.load(html, { decodeEntities: false });
                resolve($);
            });
        });

    }).then(($) => {
        const videoUrls = [];

        $('.movie-list-title a').each((idx, element) => { // 遍历各个得到视频的各个url的地址
            var $element = $(element);
            const videoURL = (baseURL + $element.attr('href'));
            videoUrls.push(videoURL);
        })

        return new Promise((resolve) => {
            resolve(videoUrls);
        })

    }).then((videoUrls) => {

        const promises = videoUrls.map((videoURL) => {

            return new Promise((resolve) => {
                const video_html = [];
                https.get(videoURL, (sres_) => {    //抓取单个视频的html
                    sres_.on('data', (chunk_) => {
                        video_html.push(chunk_);
                    })
                    sres_.on('end', () => {
                        const pattern = /mp4url = "(.*)"/gi;
                        const html_code = iconv.decode(Buffer.concat(video_html), 'gb2312');
                        const arr = pattern.exec(html_code);
                        if (arr) {
                            const video_download_url = arr[1];
                            resolve(video_download_url);
                        } else {
                            resolve("无法找到资源");
                        }
                    })
                })
            })
        })

        Promise.all(promises).then(results => {
            res.json({
                msg: 'success',
                result: results
            })
        })
    })
})


module.exports = router;
