const puppeteer = require('puppeteer');
const Crawler = require("crawler");
let connection = require("./connection-wrapper");

async function puppetCameraScores(phones) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    for (let i = 0; i < phones.length; i++) {
        let key_words = phones[i];
        const link = 'https://www.phonearena.com/';

        try {

            await page.setDefaultNavigationTimeout(0);

            await page.setViewport({ width: 1199, height: 900 });

            await page.goto(link);

            await page.waitForSelector('.widgetHeader__search>form .form-group');

            await page.click('.widgetHeader__search>form .form-group');

            await page.keyboard.type(key_words);

            await page.keyboard.press('Enter');

            await page.waitForSelector('.widget-tilePhoneCard a')

            const url = await page.evaluate((key_words) => { return document.querySelector(`img[alt="${key_words}"]`).parentElement.parentElement.getAttribute('href') }, key_words)

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
                        res.$('.widgetSpecs > *:nth-child(5) tr:nth-child(1) td').each(function (i, elem) {
                            // console.log(res.$(elem).html())
                            // console.log(key_words)
                            insertBatteryScoreToDB(key_words, res.$(elem).html())
                        });
                        for (i of res.$('.widgetSpecs > *:nth-child(7) tbody > tr td').html()) {

                            console.log(i)

                        }
                        // res.$('.widgetSpecs > *:nth-child(7) tr:nth-child(10) td').each(function (i, elem) {
                        //     insertSelfieCameraScoreToDB(key_words, res.$(elem).html())
                        // });
                    }
                    done();
                }
            });
            c.queue(url);
        } catch (error) {
            console.log(error);
        }
    }
    await page.close();

    await browser.close();
}

const getHref = (page, selector) =>
    page.evaluate(
        selector => document.querySelector(selector).getAttribute('href'),
        selector
    );

const insertCameraScoreToDB = async (phone, cameraScore) => {
    let sql = `INSERT INTO rearcamspecs (phone_name,phone_camera_score)  values(?,?)`;
    let parameters = [phone, cameraScore];
    insertPhone = await connection.executeWithParameters(sql, parameters);
}

const insertBatteryScoreToDB = async (phone, batteryscore) => {
    let sql = `INSERT INTO batteryspecs (phone_name,phone_battery_capacity)  values(?,?)`;
    let parameters = [phone, batteryscore];
    insertPhone = await connection.executeWithParameters(sql, parameters);
}

const insertSelfieCameraScoreToDB = async (phone, cameraScore) => {
    let sql = `INSERT INTO selfiecamspecs (phone_name,phone_camera_score)  values(?,?)`;
    let parameters = [phone, cameraScore];
    insertPhone = await connection.executeWithParameters(sql, parameters);
}

module.exports = {
    puppetCameraScores
}
