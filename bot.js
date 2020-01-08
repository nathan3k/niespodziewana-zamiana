//discord bot application
const Discord = require('discord.js');
const client = new Discord.Client();
const {
  token,
  prefix
} = require('./config.json');

const users = []
const availableNicknames = []
const formatUser = userData => {
  const user = {
    "id": userData.id,
    "username": userData.username,
    "discriminator": userData.discriminator
  }
  users.push(user);
  availableNicknames.push(userData.username)
}

client.login(token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.startsWith(`${prefix}alakazam`)) {
    msg.reply('Pong!');
    const onlineUsers = client.users;
    onlineUsers.forEach(user => {
      formatUser(user)
    })
    users.forEach(user => {
      const tempAvailableNicknames = availableNicknames.filter(val => val != user.username);
      msg.guild.fetchMember(user.id)
        .then(member => {
          member.setNickname(tempAvailableNicknames[Math.floor(Math.random() * tempAvailableNicknames.length)]).catch(e => console.log(e))
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