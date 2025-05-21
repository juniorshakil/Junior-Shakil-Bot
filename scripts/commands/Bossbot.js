const fs = require("fs");
const axios = require("axios");

module.exports.config = {
    name: "bossbot",
    version: "1.0.0",
    permission: 0,
    credits: "SK Shakil",
    prefix: true,
    description: "Auto reply to boss related keywords with an image",
    category: "noprefix",
    usages: "boss, k.bot, boss.bot",
    cooldowns: 5
};

module.exports.handleEvent = async ({ api, event, Users }) => {
    var id = event.senderID;
    var name = await Users.getNameUser(event.senderID);
    var message = event.body.toLowerCase();

    if (message.includes("boss k") || message.includes("bot boss k") || message.includes("bot kar")) {
        const imagePath = __dirname + "/shakil-bot.jpg";

        const imageUrl = "https://i.postimg.cc/MZ0DWThV/1732977665089.jpg"; // ছবি লিংক

        const response = await axios({
            url: imageUrl,
            responseType: "arraybuffer"
        });

        fs.writeFileSync(imagePath, Buffer.from(response.data, "binary"));

        api.sendMessage(
            {
                body: "আমি SK Shakil এর ভদ্র বট 🤭\n\nএটা আমার বসের ফেসবুক আইডি, প্রেম করলে নক দিও 🫦\n👉 https://www.facebook.com/DJ.TOM.UPDATE.MALS.FU3K.YOUR.SYSTEM.BBZ",
                attachment: fs.createReadStream(imagePath)
            },
            event.threadID, // এখন ইনবক্সের বদলে গ্রুপেই রিপ্লাই করবে
            () => fs.unlinkSync(imagePath)
        );
    }
};

module.exports.run = async ({ api, event }) => {
    return api.sendMessage("এই কমান্ড অটো কাজ করবে যখন কেউ 'boss k', 'bot boss k', বা 'bot kar' লিখবে।", event.threadID);
};
