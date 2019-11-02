const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwt');


const User = require('../models/user');
const Newspapers = require('../models/newspaper');
const Articles = require('../models/article');

router.get('/newspapers', (req, res, next) => {
  Newspapers.find((err, newsList) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(newsList);
  });
});

router.get('/suscribe/:id', passport.authenticate('jwt', { session: false }), (req,res,next) => {
  let idNewspaper = req.params.id;
  let idUser = req.user._id;

  let newspapersUser = req.user.newspapersSubscription;
  if(newspapersUser.indexOf(idNewspaper) === -1){
    newspapersUser.push(idNewspaper);

    User.findOneAndUpdate({"_id": idUser },{$set: {newspapersSubscription: newspapersUser}}, (err,user) => {
      if (err) {
        res.json(err);
        return;
      }
      res.json(user);
    });
  }

});

router.delete('/unsuscribe/:id', passport.authenticate('jwt', { session: false }), (req,res,next) => {
  let idNewspaper = req.params.id;
  let idUser = req.user._id;

  let newspapersUser = req.user.newspapersSubscription;
  let myIndex = newspapersUser.indexOf(idNewspaper);
  newspapersUser.splice(myIndex,1);

  User.findOneAndUpdate({"_id": idUser },{$set: {newspapersSubscription: newspapersUser}}, (err,user) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(user);
  });
});

router.get('/suscribed-newspapers', passport.authenticate('jwt', { session: false }), (req,res,next) => {
  let idUser = req.user._id;

  User.find({"_id": idUser }, (err,user) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(user);
  });
});

router.get('/newspaper/:id', passport.authenticate('jwt', { session: false }), (req,res,next) => {
   Newspapers.find({"_id": req.params.id }, (err,newspaper) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(newspaper);
  });
});

router.post('/save', passport.authenticate('jwt', { session: false }), (req,res,next) => {
  let article = req.body;
  let idUser = req.user._id;

  Articles.find({"url": article.url }, (err,findArticle) => {
    if (err) {
      res.json(err);
      return;
    }
    if(findArticle.length === 0){
      Articles.create(article,(err,data) => {
        if(err){
          console.log(err);
          throw err;
        }
        insertNew();
      });
    }
    else{
      console.log("Already there");
      insertNew();
    }
    console.log("Find ARTICLE:",findArticle);
  });

  function insertNew(){
    Articles.find({"url": article.url }, (err,myArticle) => {
      if (err) {
        res.json(err);
        return;
      }
      console.log("My article:",myArticle);
      let myFav = req.user.articlesFavourites;
      if(myFav.indexOf(myArticle[0]._id) === -1){
        myFav.push(myArticle[0]._id);
        User.findOneAndUpdate({"_id": idUser },{$set: {articlesFavourites: myFav}}, (err,user) => {
          if (err) {
            res.json(err);
            return;
          }
          res.json(user);
        });
      }

    });
  }

});

router.get('/favorites-articles', passport.authenticate('jwt', { session: false }), (req,res,next) => {

  let myFav = req.user.articlesFavourites;
  let sendNews = [];
  let i = 0;
  myFav.forEach((myNew) => {
    Articles.find({"_id": myNew},(err, newFound) => {
      if (err) {
        res.json(err);
        return;
      }
      console.log(newFound);
      sendNews.push(newFound);
      i++;
      if(i === myFav.length){
        returnNews();
      }
    });
  });
  function returnNews(){
    res.json(sendNews);
  }

});

router.delete('/delete-article/:id', passport.authenticate('jwt', { session: false }), (req,res,next) => {

  let idUser = req.user._id;
  let articleId = req.params.id;
  console.log(articleId);

  if(!mongoose.Types.ObjectId.isValid(articleId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  let favArticles = req.user.articlesFavourites;
  favArticles.splice(articleId,1);
  
  User.findOneAndUpdate({"_id": idUser },{$set: {articlesFavourites: favArticles}}, (err,user) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(user);
  });


});

module.exports = router;
