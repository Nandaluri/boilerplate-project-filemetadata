var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const upload = multer({ dest : 'uploads/'});
const fs = require('fs');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), async (req,res) => {
  const {originalname, mimetype, size, path} = req.file
  res.json({"name": originalname, "type" : mimetype, "size" : size})
  fs.unlink(path, (err) => {
    if(err){
      throw err;
    }
    console.log("file deletes successfully")
  })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
