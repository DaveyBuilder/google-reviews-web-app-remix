// Function to correct common email typos
export function correctCommonEmailTypos(email) {
    const commonTypos = {
      // Gmail
      "gnail.com": "gmail.com",
      "gamil.com": "gmail.com",
      "gmail.con": "gmail.com",
      "gmial.com": "gmail.com",
      "gmaill.com": "gmail.com",
      "gmal.com": "gmail.com",
      "gimail.com": "gmail.com",
      "gmail.cm": "gmail.com",
      // Hotmail
      "hotmial.com": "hotmail.com",
      "hotmal.com": "hotmail.com",
      "hotmai.com": "hotmail.com",
      "hotail.com": "hotmail.com",
      "hotmil.com": "hotmail.com",
      "hottmail.com": "hotmail.com",
      "hotmaill.com": "hotmail.com",
      // Yahoo
      "yaho.com": "yahoo.com",
      "yaho.co.uk": "yahoo.co.uk",
      "yahooo.com": "yahoo.com",
      "yaoo.com": "yahoo.com",
      "yhoo.com": "yahoo.com",
      "yhaoo.com": "yahoo.com",
      "yahoo.co.k": "yahoo.co.uk",
      // Outlook
      "outlok.com": "outlook.com",
      "outook.com": "outlook.com",
      "outloook.com": "outlook.com",
      "outllok.com": "outlook.com",
      "outlokk.com": "outlook.com",
      // BT Internet
      "btinterent.com": "btinternet.com",
      "btinternt.com": "btinternet.com",
      "btintenet.com": "btinternet.com",
      "btineternet.com": "btinternet.com",
      "btinterenet.com": "btinternet.com",
      // Sky
      "sky.cm": "sky.com",
      "sk.com": "sky.com",
      "syk.com": "sky.com",
      "skey.com": "sky.com",
      // TalkTalk
      "talktlak.com": "talktalk.net",
      "talktalk.cm": "talktalk.net",
      "talktlk.com": "talktalk.net",
      "talktalkk.com": "talktalk.net",
      // Virgin Media
      "virginemdia.com": "virginmedia.com",
      "virginmdia.com": "virginmedia.com",
      "virginmedia.cm": "virginmedia.com",
      "virgimedia.com": "virginmedia.com",
      // Plusnet
      "plusent.com": "plus.net",
      "plusnte.com": "plus.net",
      "plunet.com": "plus.net",
      "plusnet.cm": "plus.net",
      // iCloud
      "icloud.con": "icloud.com",
      "iclod.com": "icloud.com",
      "icould.com": "icloud.com",
      "iclud.com": "icloud.com",
      "icluod.com": "icloud.com",
      "icloud.cm": "icloud.com",
      // AOL
      "aol.con": "aol.com",
      "aol.cm": "aol.com",
      "aoll.com": "aol.com",
      "aol.coom": "aol.com",
      // Live
      "live.con": "live.com",
      "live.cm": "live.com",
      "liv.com": "live.com",
      "liev.com": "live.com",
      "live.coom": "live.com"

  };
  
    const emailParts = email.split("@");
    if (emailParts.length === 2) {
        const domain = emailParts[1];
        if (commonTypos[domain]) {
            return emailParts[0] + "@" + commonTypos[domain];
        }
    }
    return email;
  }