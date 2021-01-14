const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
const xpfile = require("../xp.json");

module.exports.run = async (client, message, args) => {
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;


module.exports.run = async (client, message, args) => {
//------------------------------------KONTROL ETTİRME------------------------------------\\
  const level = xpfile[message.author.id].level
  if(level === undefined) level = "0"
  if(level === null) level = "0"
  const xp = xpfile[message.author.id].xp
  if(xp === undefined) xp = "0"
  if(xp === null) xp = "0"
  const totalxp = xpfile[message.author.id].reqxp
  if(totalxp === undefined) totalxp = "0"
  if(totalxp === null) totalxp = "0"

  const card = new canvacord.Rank()
    .setUsername(user.username)
    .setDiscriminator(user.discriminator)
    .setLevel(level)
    .setCurrentXP(xp)
    .setRequiredXP(totalxp)
    .setStatus(user.presence.status)
    .setAvatar(user.displayAvatarURL({ format: "png", size: 1024 }));

  const img = await card.build();
  
  return message.channel.send(new MessageAttachment(img, "rank.png"));
};
}
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['rank2'],
  permLevel: 0 
};

exports.help = {
  name: 'rank2'
};