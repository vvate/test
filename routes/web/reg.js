var express = require('express');
const UserModel = require('../../models/UserModel');
const md5 = require('md5');
var router = express.Router();



/* GET home page. */
router.get('/reg', function(req, res) {
  res.render('auth/reg')
  
});

router.post('/reg',function(req,res){
  UserModel.create({...req.body,password:md5(req.body.password)}).then((doc)=>{
    res.render('success',{msg:'注册成功',url:'/login'})
  },(err)=>{
    res.status(500).send('注册失败')
  })
})

router.get('/login', function(req, res) {
  res.render('auth/login')
  
});

router.post('/login',function(req,res){
  let{username,password}=req.body
  UserModel.findOne({username:username,password:md5(password)}).then((doc)=>{
    if(doc){
      req.session.username=doc.username
      req.session._id=doc._id
      res.render('success',{msg:'登录成功',url:'/accounts'})
      
    }else{
      res.send('用户名或密码错误') 
    }
  },(err)=>{
    res.send('登录服务错误')
  })
})

router.post('/logout', function(req, res) {
  req.session.destroy(()=>{
    res.render('success',{msg:'退出成功',url:'/login'})

  })
  
});

module.exports = router;