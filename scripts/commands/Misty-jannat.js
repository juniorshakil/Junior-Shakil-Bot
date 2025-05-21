module.exports.config = {
    name: "misty_jannat",
    version: "1.0.4",
    permission: 0,
    credits: "Shakil",
    prefix: false,
    description: "Misty K or Jannat K likhle automatic reply dibe, Misty te image thakbe!",
    category: "auto-reply",
    usages: "",
    cooldowns: 5
};

const fs = require("fs");
const axios = require("axios");

module.exports.handleEvent = async function ({ api, event }) {
    const { body, threadID } = event;
    if (!body) return;

    const text = body.toLowerCase();

    if (text.includes("misty k")) {
        const msg = "😏 Misty আমার বস শাকিল এর এক্স🙂\nএটাই সালির এক্স এর পিক🥹!";
        const imgURL = "https://i.postimg.cc/tgcWtGQy/received-1410295107010134.jpg"; // Misty এর ছবি

        const imgPath = __dirname + "/misty-pic.jpg";
        const response = await axios.get(imgURL, { responseType: "arraybuffer" });
        fs.writeFileSync(imgPath, Buffer.from(response.data, "binary"));

        api.sendMessage({ body: msg, attachment: fs.createReadStream(imgPath) }, threadID, () => {
            fs.unlinkSync(imgPath);
        });

    } else if (text.includes("jannat k")) {
        api.sendMessage("💔 Jannat আমার বস শাকিলের এক্স🤕", threadID);
    }
};

module.exports.run = async function ({ api, event }) {
    return api.sendMessage("এই কমান্ডটি স্বয়ংক্রিয়ভাবে কাজ করে! শুধু 'Misty K' বা 'Jannat K' লিখুন!", event.threadID);
};
