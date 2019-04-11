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

// FlickrApi.authenticate(flickrOptions, (error, flickr) => {
//   // flickr.photosets.getList({
//   //   user_id: flickr.options.user_id,
//   //   authenticated: true
//   // }, (err, result) => {
//   //   console.log(err, result);
//   //   console.log(result.photosets);
//   //   // return result.photos.photo;
//   //   // res.json(result.photos.photo);
//   // });
//   // flickr.photosets.getPhotos({
//   //   api_key: process.env.FLICKR_API_KEY,
//   //   user_id: flickr.options.user_id,
//   //   photoset_id: 72157685510004936,
//   //   authenticated: true
//   //   // page: 1,
//   //   // per_page: 20
//   // }, (err, result) => {
//   //   console.log(err, result);
//   // });
//   // flickr.people.getPhotos({
//   //   api_key: process.env.FLICKR_API_KEY,
//   //   user_id: flickr.options.user_id,
//   //   authenticated: true,
//   //   page: 1,
//   //   per_page: 500
//   // }, (err, result) => {
//   //   console.log(err, result);
//   // });
// });

// searchPhotos = (flickr, res) => {
//   flickr.photos.search({
//     authenticated: true,
//     api_key: process.env.FLICKR_API_KEY,
//     user_id: flickr.options.user_id,
//     // page: 1,
//     // per_page: 20
//   }, (err, result) => {
//     console.log(err, result);
//     // console.log(result.photos.photo);
//     // return result.photos.photo;
//     res.json(result.photos.photo);
//   });
// }

// getAllPhotos = (flickr, res) => {
//   flickr.people.getPhotos({
//     api_key: process.env.FLICKR_API_KEY,
//     user_id: flickr.options.user_id,
//     authenticated: true,
//     // page: 1,
//     // per_page: 500
//   }, (err, result) => {
//     console.log(err, result);
//     res.json(result.photos.photo);
//   });
// }

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
      extras: 'url_m,tags,title,description'
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
      console.log(err, result);
      // console.log(result.photos.photo);
      res.json(result.photo);
    });
  });
});

// app.get('/photos', (req, res, next) => {
//   // res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
//   FlickrApi.authenticate(flickrOptions, (error, flickr) => {
//     // console.log('error', error);
//     console.log('Flickr authenticate');
//     // console.log(flickr);
//     // searchPhotos(flickr, res);
//     getAllPhotos(flickr, res);
//   });
// });

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
