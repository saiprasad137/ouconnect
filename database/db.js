// module.exports = {
//     db: 'mongodb://localhost:27017/connect'
// };
// let mongoose = require('mongoose');
let mongoose = require('mongoose');

const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const methodOverride = require('method-override')

require('dotenv').config({path : '.env'}); //to use env variables


mongoose.Promise = global.Promise;
// let gfs;
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useFindAndModify:false,
    useUnifiedTopology:true,
    useCreateIndex:true
})
// .then(() => {
//     console.log('DataBase connected sucessfully !')
// },
//     error => {
//         console.log('DataBase could not be connected : ' + error)
// })

mongoose.connection
// conn
.once('open',  () => {
    // gfs = Grid(conn.db,mongoose.mongo);
    // gfs.collection('uploads');
    console.log('DataBase connected sucessfully !')
})
.on('error', error => {
    console.log('DataBase could not be connected : ' + error)
})


// const conn = mongoose.connect(process.env.DATABASE).then(() => {
//     console.log('DataBase connected sucessfully !')
// },
//     error => {
//     console.log('DataBase could not be connected : ' + error)
//     })
