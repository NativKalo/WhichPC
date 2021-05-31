let connection = require("./connection-wrapper");
let cameraScores = require('./PuppetPhones')
const Crawler = require("crawler");

const c = new Crawler({
    rateLimit: 500,
    // This will be called for each crawled page
    callback: (error, res, done) => {
        const phonesArray = []
        const scoresArray = []
        const specialRegex = new RegExp(/[&\/\\#,+()$~%.":*?<>{}!-]/g)
        const lineBreakRegex = new RegExp((/^\s*$/, ""))
        if (error) {
            console.log(error);
        } else {
            console.log("Got it!!!")
            res.$('.benchmark_topaccordeon > li:nth-child(2) .row.clear .benchmark_searchable .name.name2').each(function (i, elem) {
                console.log(res.$(elem).html())
                phonesArray.push(res.$(elem).html())
            });
            res.$('.benchmark_topaccordeon > li:nth-child(2) .row.clear .score .bar.block').each(function (i, elem) {
                if (res.$(elem).css('background-color') === '#FFCC51') {
                    let score = res.$(elem).children().text()
                    if (score === '') {
                        if (res.$(elem).next().text().trim() >= '1000' && res.$(elem).next().text().trim() >= 1000) {
                            scoresArray.push(res.$(elem).next().text().trim())
                        }
                    } else {
                        scoresArray.push(score.trim())
                    }
                }
            });
        }

        console.log(phonesArray)
        console.log(scoresArray)
        phonesCleanUp()
        insertPhonesToDB(phonesArray, scoresArray)
        cameraScores.puppetCameraScores(phonesArray)
        done();
    }
});

async function phonesCleanUp() {
    let sql = 'TRUNCATE TABLE ranks;'
    await connection.execute(sql);

}

async function insertPhonesToDB(phones, scores) {
    for (let i = 0; i < phones.length; i++) {
        let sql = `INSERT INTO ranks (phone_name,phone_score)  values(?,?)`;
        let parameters = [phones[i], scores[i]];
        insertPhone = await connection.executeWithParameters(sql, parameters);

    }

}


c.queue('https://www.phonearena.com/phones/benchmarks#');
