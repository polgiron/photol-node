const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

require('dotenv').config();

const flickrOptions = {
  api_key: process.env.FLICKR_API_KEY,
  secret: process.env.FLICKR_SECRET,
  user_id: process.env.FLICKR_USER_ID,
  access_token: process.env.FLICKR_ACCESS_TOKEN,
  access_token_secret: process.env.FLICKR_ACCESS_TOKEN_SECRET
};

const FlickrApi = require("flickrapi");

console.log('Authenticate Flickr API');
FlickrApi.authenticate(flickrOptions, (error, flickr) => {
  if (error) {
    console.log('ERROR', error);
  } else {
    console.log('Flickr API authenticated');
  }
});

// Get all albums
app.get('/albums', (req, res, next) => {
  FlickrApi.authenticate(flickrOptions, (error, flickr) => {
    flickr.photosets.getList({
      authenticated: true,
      api_key: process.env.FLICKR_API_KEY,
      user_id: flickr.options.user_id,
      primary_photo_extras: 'date_taken,url_m'
    }, (err, result) => {
      // console.log(err, result);
      // console.log(result.photos.photo);
      res.json(result.photosets.photoset);
    });
  });
});

// Get one album
app.get('/album/:albumId', (req, res, next) => {
  FlickrApi.authenticate(flickrOptions, (error, flickr) => {
    flickr.photosets.getPhotos({
      authenticated: true,
      api_key: process.env.FLICKR_API_KEY,
      user_id: flickr.options.user_id,
      photoset_id: req.params.albumId,
      extras: 'url_m,tags'
      // extras: 'url_m,tags,title,description'
    }, (err, result) => {
      // console.log(err, result);
      // console.log(result.photos.photo);
      res.json(result.photoset);
    });
  });
});

// Search all photos
app.get('/search/:value', (req, res, next) => {
  FlickrApi.authenticate(flickrOptions, (error, flickr) => {
    flickr.photos.search({
      authenticated: true,
      api_key: process.env.FLICKR_API_KEY,
      user_id: flickr.options.user_id,
      text: req.params.value,
      extras: 'url_m,tags,title,description'
    }, (err, result) => {
      // console.log(err, result);
      // console.log(result.photos.photo);
      res.json(result.photos);
    });
  });
});

// Get a photo
app.get('/photo/:photoId', (req, res, next) => {
  FlickrApi.authenticate(flickrOptions, (error, flickr) => {
    flickr.photos.getInfo({
      authenticated: true,
      api_key: process.env.FLICKR_API_KEY,
      photo_id: req.params.photoId
    }, (err, result) => {
      // console.log(err, result);
      // console.log(result.photos.photo);
      res.json(result.photo);
    });
  });
});

// Get a photo context
app.get('/photo/:photoId/context', (req, res, next) => {
  FlickrApi.authenticate(flickrOptions, (error, flickr) => {
    flickr.photos.getAllContexts({
      authenticated: true,
      api_key: process.env.FLICKR_API_KEY,
      photo_id: req.params.photoId
    }, (err, result) => {
      console.log(err, result);
      // console.log(result.photos.photo);
      res.json(result.set);
    });
  });
});

// Get photostream
app.get('/photostream', (req, res, next) => {
  FlickrApi.authenticate(flickrOptions, (error, flickr) => {
    flickr.people.getPhotos({
      // authenticated: true,
      api_key: process.env.FLICKR_API_KEY,
      user_id: flickr.options.user_id,
      extras: 'url_m,tags,title,description'
    }, (err, result) => {
      console.log(err, result);
      // console.log(result.photos.photo);
      res.json(result.photos.photo);
    });
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
