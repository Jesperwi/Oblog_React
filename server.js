const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const AWS = require('aws-sdk');
const { check, validationResult } = require('express-validator');
const bodyparser = require('body-parser');
const fs = require('fs');
const Models = require('./models.js');


const port = 3002

const passport = require('passport');  
require('./passport.js');

const S3_BUCKET ='myblog-olivia';
const REGION ='eu-north-1';

require('dotenv').config()

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET},
  region: REGION,
})

const Post = Models.Post;
const User = Models.User;     
// put password
mongoose.connect(process.env.CONNECTION_URI, 
                 { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());

app.use(express.json());

var formidable = require('formidable')

let auth = require('./auth.js')(app);

let allowedOrigins = ['http://localhost:3000', 'http://localhost:3002', 'https://localhost:3002', 'https://oliviablog.netlify.app/', 'http://oliviablog.netlify.app/'];

app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ 
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));

app.get('/archive/:id', (req, res) => {
  Post.findOne({ _id: req.params.id})
    .then((test) => {
      res.status(201).json(test);
 })
   .catch((err) => {
     console.error(err);
     res.status(500).send('Error: ' + err);
 })
});

app.get('/admin', passport.authenticate('jwt', { session: false}), (req, res) => {
  User.find({ Username: req.params.Username})
    .then((test) => {
      res.status(201).json(test);
 })
   .catch((err) => {
     console.error(err);
     res.status(500).send('Error: ' + err);
 })
});


app.get('/posts', (req, res) => {
  Post.find()
  .then((test) => {
    console.log(test)
    res.status(201).json(test);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  })
});

app.post('/posts', passport.authenticate('jwt', { session: false}), async (req, res) => {

  var form = new formidable.IncomingForm();
  var title
  var description
  var file
  var description1
  var file1
  var description2
  var file2
  form.parse(req, function(err, fields, files) {
  if (err) {

    // Check for and handle any errors here.

    console.error(err.message);
    return;
  }
  title = fields.title
  description = fields.description
  description1 = fields.description1
  description2 = fields.description2
  file = files.file
  file1 = files.file1
  file2 = files.file2


  var data = fs.readFileSync(file.path)
  var data1 = fs.readFileSync(file1.path)
  var data2 = fs.readFileSync(file2.path)

    console.log(files.file.name);
    const params =[
  {
  ACL: 'public-read',
  Body: data,
  Bucket: S3_BUCKET,
  Key: file.name,
  },
  {
    ACL: 'public-read',
    Body: data1,
    Bucket: S3_BUCKET,
    Key: file1.name,
  },
  {
    ACL: 'public-read',
    Body: data2,
    Bucket: S3_BUCKET,
    Key: file2.name,
    }
]

// Iterates the array and makes sure that the empty strings wont cause an  upload

  params.forEach((e) => {
    if (e.Body != null && e.Body !== '') 
    myBucket.putObject(e)
    .send((err) => {
        if (err) console.log(err)
    })
    

});

var urlS3
var urlS31
var urlS32

if (file.name != null && file.name !== '') 
  urlS3 = `https://myblog-olivia.s3.eu-north-1.amazonaws.com/${file.name}`
else
  urlS3 = ''

if (file1.name != null && file1.name !== '') 
  urlS31 = `https://myblog-olivia.s3.eu-north-1.amazonaws.com/${file1.name}`
else
  urlS31 = ''

if (file2.name != null && file2.name !== '') 
  urlS32 = `https://myblog-olivia.s3.eu-north-1.amazonaws.com/${file2.name}`
else
  urlS32 = ''

  const newPost = new Post({
    title: title,
    description: description,
    image: urlS3,
    description1: description1,
    image1: urlS31,
    description2: description2,
    image2: urlS32
    });
  newPost.save((err, data) => {
    if (err) return err;
    console.log('uploaded');
  })
  
})

  res.send('post uploaded');
});

app.put('/posts/:id', (req, res) => {
  Post.findOneAndUpdate({ _id: req.params.id }, { $set:
    {
      title: req.body.title,
      description: req.body.description,
      image: ""
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json();
    }
  });
});

app.delete('/posts/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
  Post.findOneAndRemove({ _id: req.params.id })
    .then((post) => {
      if (!post) {
        res.status(400).send(req.params.id + ' was not found');
      } else {
        res.status(200).send(req.params.id + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


app.get('/user', (req, res) => {
  User.find()
  .then((user) => {
    console.log(user)
    res.status(201).json(user);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  })
});

// app.post('/user',
// [
//     check('Username', 'Username is required').isLength({min: 3}),
//     check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
//     check('Password', 'Password is required').not().isEmpty(),
// ], (req, res) => { 
  
//   let errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(422).json({ errors: errors.array() 
//     });
//   }
// //** HashedPassword gets created */
//   let hashedPassword = User.hashPassword(req.body.Password);

//   User.findOne({ Username: req.body.Username })
//     .then((user) => {
//       if (user) {
//         return res.status(400).send(req.body.Username + 'already exists');
//       } else {
//         User
//           .create({
//             Username: req.body.Username,
//             Password: hashedPassword,
//           })
//           .then((user) =>{res.status(201).json(user) })
//         .catch((error) => {
//           console.error(error);
//           res.status(500).send('Error: ' + error);
//         })
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).send('Error: ' + error);
//     });
// });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to mongo db');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

