let connection = require("./connection-wrapper");
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
            // res.$('.row.clear').each(function (i, elem) {
            //     console.log(res.$(elem).find('.bar.block').html())
            //     console.log(res.$(elem).find('.bar.block').next().html())
            // });
            res.$('.row.clear .benchmark_searchable .name.name2').each(function (i, elem) {
                console.log(res.$(elem).html())
                phonesArray.push(res.$(elem).html())

            });
            res.$('.row.clear .score .bar.block').each(function (i, elem) {
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
                // else {
                //     console.log("n")
                // }
            });
        }

        console.log(phonesArray)
        console.log(scoresArray)
        insertPhonesToDB(phonesArray, scoresArray)
        done();
    }
});

async function insertPhonesToDB(phones, scores) {
    for (let i = 0; i < phones.length; i++) {
        let sql = `INSERT INTO ranks (phone_name,phone_score)  values(?,?)`;
        let parameters = [phones[i], scores[i]];
        insertPhone = await connection.executeWithParameters(sql, parameters);

    }

}


c.queue('https://www.phonearena.com/phones/benchmarks#');
