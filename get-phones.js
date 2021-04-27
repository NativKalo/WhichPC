const Crawler = require("crawler");

let index = 1;

const c = new Crawler({
    rateLimit: 500,
    // This will be called for each crawled page
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Got it!!!", index);
            index++;
            if (res.$(".DisabledForwordBtn").html() !== null) {
                done()
                return
            }
            res.$('.ProductBox.CompareModel .MoreInfo a').each(function (i, elem) {
                let infoUrl = res.$(elem).attr('href')
                phoneCrawler.queue('https://www.zap.co.il' + infoUrl);
            });

            // TODO get the url of the more info of a phone.
            // for (phone in phonesOfThePage) {
            // phoneCrawler.queue(moreInfoUrl);
            // }
            // c.queue('https://www.zap.co.il/models.aspx?sog=e-cellphone&pageinfo=' + index);
        }
        done();
    }
});

c.queue('https://www.zap.co.il/models.aspx?sog=e-cellphone');

const phoneCrawler = new Crawler({
    rateLimit: 500,
    // This will be called for each crawled page
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            console.log(res.$('#uc_ModelSpecs_rep_SpecsBlocks_ctl01_uc_rep_SpecsRows_rep_SpecsRows_ctl00_div_SpecValue').html());
        }
        done();
    }
});
