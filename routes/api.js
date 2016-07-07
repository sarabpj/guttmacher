const express = require('express')
const router = express.Router()
const knex = require('../db/knex')
const locus = require('locus')

//complete data file
router.get('/v1', function(req, res, next) {
  knex('data_csv').select().then(function (data) {
    res.format({
      json: function(){
        res.send(data)
      }


    })
  })
})

//table 1.1
router.get('/v1/table_1.1', function(req, res, next) {
  knex('data_csv').select('Postal_Code','PR_15_19', 'BR_15_17', 'BR_18_19', 'BR_15_19', 'BR_15_17', 'BR_18_19', 'AR_15_19', 'AR_15_17', 'AR_18_19').then(function (data) {
    res.format({
      json: function(){
        res.send(data)
      }
    })
  })
})


//table 1.2
router.get('/v1/table_1.2', function(req, res, next) {
  knex('data_csv').select('Postal_Code', 'NoB_15_19', 'NoB_15_17', 'NoB_18_19', 'NoB_14', 'NoA_15_19', 'NoA_15_17', 'NoA_14', 'NoF_15_19', 'NoF_15_17', 'NoF_18_19', 'NoF_14').then(function (data) {
    res.format({
      json: function(){
        res.send(data)
      }
    })
  })
})




module.exports= router;