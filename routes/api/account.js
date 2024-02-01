var express = require('express');
var router = express.Router();


const AccountModel = require('../../models/AccountModel');
const moment = require('moment/moment');
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware');



/* GET home page. */
//获取列表
router.get('/accounts', checkTokenMiddleware,function(req, res) {
  AccountModel.find().sort({time:-1}).then((doc)=>{
    res.json({
      code:'0000',
      msg:'读取成功',
      data:doc
    })
  },(reject)=>{
    res.json({
      code:'1001',
      msg:'读取失败',
      data:null
    })
  })

  
  
});

//新增接口
router.post('/accounts', checkTokenMiddleware,function(req, res) {
  AccountModel.create({
    ...req.body,
    time:moment(req.body.time).toDate()
  }).then((data)=>{
    res.json({
      code:'0000',
      msg:'添加成功',
      data:data
    })
  },(err)=>{
      res.json({
        code:'1002',
        msg:'新增失败',
        data:null
      }) 
  })
});


//删除接口 
router.delete('/accounts/:id',checkTokenMiddleware,function(req,res){
  let id =req.params.id
  AccountModel.deleteOne({_id:id}).then((data)=>{
    res.json({
      code:'0000',
      msg:'删除成功',
      data:null
    })
  },(err)=>{
    res.json({
      code:'1003',
      msg:'删除失败',
      data:null
    })
    
  })
})

router.get('/accounts/:id',checkTokenMiddleware,function(req,res){
  let id =req.params.id

  AccountModel.findById(id).then((doc)=>{
    res.json({
      code:'0000',
      msg:'查找成功',
      data:doc
    })
  },(err)=>{
    res.json({
      code:'1004',
      msg:'查找失败',
      data:null
    })
  })
})

router.patch('/accounts/:id',checkTokenMiddleware,function(req,res){
  let id =req.params.id

  AccountModel.updateOne({_id:id},req.body).then((doc)=>{
    AccountModel.findById(id).then((data)=>{
      res.json({
        code:'0000',
        msg:'更新成功',
        data:data
      })
    })
    
  },(err)=>{
    res.json({
      code:'1004',
      msg:'更新失败',
      data:null
    })
  })
})

module.exports = router;
