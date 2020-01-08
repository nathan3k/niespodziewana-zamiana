//discord bot application
const Discord = require('discord.js');
const client = new Discord.Client();
const {token, prefix}=require('./config.json');

const users = 

client.login(token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.startsWith(`${prefix}alakazam`)) {
    msg.reply('Pong!');
    const onlineUsers = client.users;
    console.log(client.guilds);
    // users.forEach(user => { })
  }
});