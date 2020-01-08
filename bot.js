//discord bot application
const Discord = require('discord.js');
const client = new Discord.Client();
const {
  token,
  prefix
} = require('./config.json');

client.login(token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.startsWith(`${prefix}alakazam`)) {
    const users = [] // lista dostępnych użytkowników
    const availableNicknames = []
    msg.reply('Szufla nicków!');
    const onlineUsers = client.users;
    onlineUsers.forEach(user => {

      users.push({
        "id": userData.id,
        "username": userData.username,
        "discriminator": userData.discriminator
      });
      availableNicknames.push(userData.username)
    })
    users.forEach(user => {
      const tempAvailableNicknames = availableNicknames.filter(val => val != user.username); // utworznie tablicy z podanego warunku
      msg.guild.fetchMember(user.id) //pobranie użytkownika po jego id
        .then(member => {
          member.setNickname(tempAvailableNicknames[Math.floor(Math.random() * tempAvailableNicknames.length)]) //ustanienie nicku
        })
    })

  } else if (msg.content.startsWith(`${prefix}info`)) {
    const serverIcon = msg.guild.iconURL;
    const embed = new Discord.RichEmbed()
      .setDescription("Informacje o serwerze")
      .setThumbnail(serverIcon)
      .addField("Ilość członków: ", msg.guild.memberCount);
    msg.channel.send(embed);
  }
});