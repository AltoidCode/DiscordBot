// simple discord.js bot that you can use

const { Client, Intents } = require("discord.js");
const fs = require("fs"); // To read the JSON files
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// load the quotes and jokes from json files
const quotesData = JSON.parse(fs.readFileSync("quotes.json", "utf8"));
const jokesData = JSON.parse(fs.readFileSync("jokes.json", "utf8"));

// command prefix
const prefix = "!";

// write your bot token here... DONT SHARE IT (which is why i didnt put mine here)
const token = "YOUR_BOT_TOKEN";

// Command: Ping Pong
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(`${prefix}ping`)) {
    message.channel.send("Pong!");
  }

  // Command: Joke
  if (message.content.startsWith(`${prefix}joke`)) {
    const randomJoke =
      jokesData.jokes[Math.floor(Math.random() * jokesData.jokes.length)];
    message.channel.send(`${randomJoke.setup} - ${randomJoke.punchline}`);
  }

  // Command: Quote
  if (message.content.startsWith(`${prefix}quote`)) {
    const randomQuote =
      quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
    message.channel.send(`"${randomQuote.content}" - ${randomQuote.author}`);
  }

  // Command: Roll a Dice
  if (message.content.startsWith(`${prefix}roll`)) {
    const roll = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
    message.channel.send(`You rolled a ${roll}!`);
  }

  // Command: Coin Flip
  if (message.content.startsWith(`${prefix}coinflip`)) {
    const flip = Math.random() < 0.5 ? "Heads" : "Tails";
    message.channel.send(`The coin landed on: ${flip}`);
  }

  // Command: Server Info
  if (message.content.startsWith(`${prefix}serverinfo`)) {
    message.channel.send(
      `This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`
    );
  }

  // Command: User Info
  if (message.content.startsWith(`${prefix}userinfo`)) {
    message.channel.send(
      `Your username: ${message.author.username}\nYour ID: ${message.author.id}`
    );
  }
});

// Telling us that its online
client.once("ready", () => {
  console.log("Bot is online!");
});

// Put in your bot token (Don't share it with anyone)
client.login(token);
