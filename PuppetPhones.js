const puppeteer = require('puppeteer');
const Crawler = require("crawler");
let connection = require("./connection-wrapper");

async function puppetCameraScores(phones) {
    for (let i = 0; i < phones.length; i++) {
        let key_words = phones[i];
        const link = 'https://www.phonearena.com/';

        const browser = await puppeteer.launch({ headless: true, slowMo: 100, devtools: true });

        try {
            const page = await browser.newPage();

            await page.setDefaultNavigationTimeout(0);

            await page.setViewport({ width: 1199, height: 900 });

            await page.goto(link);

            await page.waitForSelector('.widgetHeader__search>form .form-group');

            await page.click('.widgetHeader__search>form .form-group');

            await page.keyboard.type(key_words);

            await page.keyboard.press('Enter');

            await page.waitFor(3000);

            await page.waitForSelector('.widget-tilePhoneCard a')

            const url = await getHref(
                page,
                `.widget-tilePhoneCard a`
            );

            // await page.goto(url, { waitUntil: 'domcontentloaded' });

            var c = new Crawler({
                maxConnections: 10,
                callback: async function (error, res, done) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.$('.widgetSpecs > *:nth-child(7) tr:nth-child(2) td').each(function (i, elem) {
                            console.log(res.$(elem).html())
                            console.log(key_words)
                            insertCameraScoreToDB(key_words, res.$(elem).html())
                        });
                    }
                    done();
                }
            });
            c.queue(url);

            await page.close();

            await browser.close();

        } catch (error) {
            console.log(error);
            await browser.close();
        }
    }
}

const getHref = (page, selector) =>
    page.evaluate(
        selector => document.querySelector(selector).getAttribute('href'),
        selector
    );

const insertCameraScoreToDB = async (phone, cameraScore) => {
    let sql = `INSERT INTO camspecs (phone_name,phone_camera_score)  values(?,?)`;
    let parameters = [phone, cameraScore];
    insertPhone = await connection.executeWithParameters(sql, parameters);
}

module.exports = {
    puppetCameraScores
}
