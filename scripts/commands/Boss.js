const fs = require('fs');
const axios = require('axios');

module.exports.config = {
    name: "boss",
    version: "1.0.0",
    permission: 0,
    credits: "Shakil",
    description: "Boss command with video",
    prefix: false,
    category: "auto",
    usages: "",
    cooldowns: 5
};

module.exports.handleEvent = async function ({ api, event }) {
    const triggerWords = ["boss", "boss.", "bos", "বস"];
    if (event.body && triggerWords.includes(event.body.toLowerCase())) {
        const videoUrl = "https://drive.google.com/uc?export=download&id=16sZbk3xiLr3fZ507GmCFSq0vkubZWjRM";
        const videoPath = __dirname + "/boss_video.mp4";

        try {
            // ভিডিও ডাউনলোড করা হচ্ছে
            const response = await axios.get(videoUrl, { responseType: "arraybuffer" });
            fs.writeFileSync(videoPath, Buffer.from(response.data, "binary"));

            const msg = {
                body: "😍 **আমি শাকিলের বট☺️বস এড না থাকলে এড দেন প্লিজ** 🥰\n\n📌 **বসের ফেসবুক লিংক:** link",
                attachment: fs.createReadStream(videoPath)
            };

            // সব গ্রুপে মেসেজ পাঠানো হবে
            global.data.allThreadID.forEach(threadID => {
                api.sendMessage(msg, threadID);
            });

        } catch (error) {
            console.error("ভিডিও ডাউনলোডে সমস্যা হয়েছে:", error);
        }
    }
};

module.exports.run = function () {};
