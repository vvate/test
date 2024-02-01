var express = require('express');
var router = express.Router();



const AccountModel = require('../../models/AccountModel');
const moment = require('moment/moment');
const checkLoginMiddlewares = require('../../middlewares/checkLoginMiddlewares');


/* GET home page. */

router.get('/',function(req,res){
  res.redirect('/accounts')
})

router.get('/accounts', checkLoginMiddlewares,function(req, res) {
  // let accounts = db.get('accounts').value()
  AccountModel.find().sort({time:-1}).then((doc)=>{
    console.log(doc)
    res.render('account',{accounts:doc,moment:moment})
  },(reject)=>{
    res.status(500).send('读取失败')
  })

  
  
});

router.get('/accounts/create', checkLoginMiddlewares, function(req, res) {
  res.render('create');
});


router.post('/accounts', checkLoginMiddlewares, function(req, res) {
  AccountModel.create({
    ...req.body,
    time:moment(req.body.time).toDate()
  })
  
  res.render('success',{msg:'添加成功',url:'/accounts'});
});

router.get('/accounts/:id', checkLoginMiddlewares,function(req,res){
  let id =req.params.id
  // db.get('accounts').remove({id:id}).write()
  AccountModel.deleteOne({_id:id}).then((data,err)=>{
    if(err){
      res.status.send('删除失败')
      return
    }
    res.render('success',{msg:'删除成功',url:'/accounts'})
  })
})

module.exports = router;
