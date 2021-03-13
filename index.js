const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')

client.on('ready', () => {
  console.log('De bot is online!')

  command(client, ['ping', 'test'], (message) => {
    message.channel.send('Pong!')
  })
  
  command(client, 'servers', (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `${guild.name} heeft in totaal ${guild.memberCount} members!`
      )
    })
  })
  
  command(client, ['cc', 'clearchannel'], (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results)
      })
    }
  })
  
  command(client, 'status', (message) => {
    const content = message.content.replace('.status ', '')

    client.user.setPresence({
      activity: {
        name: content,
        type: 0,
      },
    })
  })
})


client.login(config.token)
