const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI;
mongoose.connect(URI,{
    useNewUrlParser:true,
    useFindAndModify:false,
    useCreateIndex:true
})
    .then(db => console.log('DB is connected!'))
    .catch(err => console.error(err));