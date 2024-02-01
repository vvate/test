var express = require('express');
const UserModel = require('../../models/UserModel');
const md5 = require('md5');
const jwt=require('jsonwebtoken')
const {SIGNKEY} = require('../../config/config')

var router = express.Router();

router.post('/login',function(req,res){
  let{username,password}=req.body
  UserModel.findOne({username:username,password:md5(password)}).then((doc)=>{
    if(doc){
      let token = jwt.sign({username:doc.username,_id:doc._id},SIGNKEY,{expiresIn:60*60*24*7})
      res.json({
        code:'0000',
        msg:'登录成功',
        data:token
      })
      
    }else{
      res.json({
        code:'2002',
        msg:"用户名或密码错误",
        data:null
      })
    }
  },(err)=>{
    res.json({
      code:'2001',
      msg:'数据库错误',
      data:null
    })
  })
})

router.post('/logout', function(req, res) {
  req.session.destroy(()=>{
    res.render('success',{msg:'退出成功',url:'/login'})

  })
  
});

module.exports = router;