const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI);

const Newspapers = require('../models/newspaper');

const newspapers = [
  {
    request_link: 'https://newsapi.org/v1/articles?source=abc-news-au&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/74xyc09wfc7pm19/abc-news.png?raw=1",
    name: "abc-news-au"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/mvpla24yspsdrbp/bbc-news.png?raw=1",
    name: "bbc-news"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=bbc-sport&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/p73nkm9r66w004b/bbc-sport.png?raw=1",
    name: "bbc-sport"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=bild&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/khay0uxehr78pdf/bild.png?raw=1",
    name: "bild"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/3c60n9ejia73tuq/bloomberg.png?raw=1",
    name: "bloomberg"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=business-insider&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/f3s6wtr3qknv6a4/business-insider.png?raw=1",
    name: "business-insider"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=buzzfeed&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/9gcky98mdkr0rqd/buzzfeed.png?raw=1",
    name: "buzzfeed"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/6zsbtidu3mk03bo/cnn.png?raw=1",
    name: "cnn"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/wsjndf2zw8i0o17/espn.png?raw=1",
    name: "espn"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=financial-times&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/k0bmfuwbyzit2vh/financial-times.png?raw=1",
    name: "financial-times"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=fortune&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/4xp9eowcdp3hdw2/fortune.png?raw=1",
    name: "fortune"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=fox-sports&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/jzqvbu8vyi293dl/fox-sports.png?raw=1",
    name: "fox-sports"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/mons4qwan24uqu5/google-news.png?raw=1",
    name: "google-news"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=hacker-news&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/74isqpk1fqzxd8v/hacker-news-new.png?raw=1",
    name: "hacker-news"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=ign&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/fdbw6b9coenqdit/ign.png?raw=1",
    name: "ign"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=mirror&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/vng7hqedllbi0a7/mirror.png?raw=1",
    name: "mirror"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=mtv-news&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/2z0vbq9rr86nmv8/mtv.png?raw=1",
    name: "mtv-news"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=nfl-news&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/dgxc4uwnjpqlkbl/nfl.png?raw=1",
    name: "nfl-news"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=recode&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/spdzg7jlrlcoohn/recode.png?raw=1",
    name: "recode"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=techcrunch&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/hxc0ivt3olmxbi3/techcrunch.png?raw=1",
    name: "techcrunch"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=talksport&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/xmq1cnjqoq2muoj/talk-sport.png?raw=1",
    name: "talksport"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=the-economist&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/ttgzf7dww7uftlh/the-economist.png?raw=1",
    name: "the-economist"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/f5duku2a26eroeg/the-new-york-times.png?raw=1",
    name: "the-new-york-times"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=the-telegraph&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/9my1f9ighvq6kgj/the-telegraph.png?raw=1",
    name: "the-telegraph"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=the-wall-street-journal&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/5ttp584trx1cspy/the-wall-street-journal.png?raw=1",
    name: "the-wall-street-journal"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=usa-today&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/jmyar2s87ncml5x/usa-today.png?raw=1",
    name: "usa-today"
  },
  {
    request_link: 'https://newsapi.org/v1/articles?source=time&sortBy=top&apiKey=ff08caa309f14d89aa2b32242ccbe515',
    image: "https://www.dropbox.com/s/cu8620oipdvjde6/time.png?raw=1",
    name: "time"
  }

];
Newspapers.create(newspapers,(err,data) =>{
  if(err){
    console.log(err);
    throw err;
  }
  mongoose.connection.close();
});
