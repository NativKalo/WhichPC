let connection = require("./connection-wrapper");
const Crawler = require("crawler");


getPhoneList = async () => {
    let sql = "SELECT phone_name FROM allphones.ranks;";
    phones = await connection.execute(sql);
    getPhoneCamera(phones)

}

getPhoneList()

getPhoneCamera = async (phones) => {
    for (let i = 0; i < phones.length; i++) {
        console.log(phones[i].phone_name)
    }
}

