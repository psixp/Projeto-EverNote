const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/javascriptNote', {

}).then(() => console.log('connection succesfull'))
.catch((err) => console.log(err))


