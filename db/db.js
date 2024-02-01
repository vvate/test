module.exports=function(success,error){
  if(typeof error !== 'function'){
    error=()=>{
      console.log('连接失败')
    }
  }
  const mongoose = require('mongoose')
  const {DBHOST,DBPORT,DBNAME} = require('../config/config')
  mongoose.set('strictQuery',true)
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)
  mongoose.connection.once('open',()=>{
    success()
  })
  mongoose.connection.on('error',()=>{
    error()
  })
}