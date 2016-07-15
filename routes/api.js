const express = require('express')
const router = express.Router()
const knex = require('../db/knex')
const locus = require('locus')

//current graphs for state
router.get('/home', function(req,res,next){
  res.render('layout')
})


//compare states
router.get('/compare', function(req,res,next){
  res.render('compare')
})


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
  knex('data_csv').select('US_State','Postal_Code', 'NoB_15_19', 'NoB_15_17', 'NoB_18_19', 'NoB_14', 'NoA_15_19', 'NoA_15_17', 'NoA_14', 'NoF_15_19', 'NoF_15_17', 'NoF_18_19', 'NoF_14').then(function (data) {
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


//table 1.3
router.get('/v1/table_1.3', function(req, res, next){
  knex('data_csv').select('Postal_Code', 'PR_1988', 'PR_1992', 'PR_1996', 'PR_2000', 'PR_2005', 'PR_2008', 'PR_2010', 'PR_2011').then(
    function (data) {
    res.format({
      json: function(){
        res.send(data)
      }
    })
  })
})

//table 1.4
router.get('/v1/table_1.4', function(req, res, next){
  knex('data_csv').select('Postal_Code', 'BR_1988', 'BR_1992', 'BR_1996', 'BR_2000', 'BR_2005', 'BR_2008', 'BR_2010', 'BR_2011').then(
    function (data) {
    res.format({
      json: function(){
        res.send(data)
      }
    })
  })
})

//table 1.5
router.get('/v1/table_1.5', function(req, res, next){
  knex('data_csv').select('Postal_Code', 'AR_1988', 'AR_1992', 'AR_1996', 'AR_2000', 'AR_2005', 'AR_2008', 'AR_2010', 'AR_2011').then(
    function (data) {
    res.format({
      json: function(){
        res.send(data)
      }
    })
  })
})

//second chart
router.get('/v1/chart2', function(req, res, next){
  knex('data_csv').select('US_State','PR_1988', 'PR_1992', 'PR_1996', 'PR_2000', 'PR_2005', 'PR_2008', 'PR_2010', 'PR_2011', 'BR_1988', 'BR_1992', 'BR_1996', 'BR_2000', 'BR_2005', 'BR_2008', 'BR_2010', 'BR_2011','AR_1988', 'AR_1992', 'AR_1996', 'AR_2000', 'AR_2005', 'AR_2008', 'AR_2010', 'AR_2011').then(
    function (data) {
    res.format({
      json: function(){
        res.send(data)
      }
    })
  })
})

//table 1.6
router.get('/v1/table_1.6', function(req, res, next){
  knex('data_csv').select('US_State','Postal_Code', 'ARO_1988', 'ARO_1992', 'ARO_1996', 'ARO_2000', 'ARO_2005', 'ARO_2008', 'ARO_2010', 'ARO_2011').then(
    function (data) {
    res.format({
      json: function(){
        res.send(data)
      }
    })
  })
})

//table 1.7
router.get('/v1/table_1.7', function(req, res, next){
  knex('data_csv').select('US_State','Postal_Code', 'PR_H', 'PR_NHB', 'PR_NHW', 'PR_NHO', 'BR_H', 'BR_NHB', 'BR_NHW', 'BR_NHO', 'AR_H', 'AR_NHB', 'AR_NHW', 'AR_NHO').then(
    function (data) {
    res.format({
      json: function(){
        res.send(data)
      }
    })
  })
})

//table 1.8
router.get('/v1/table_1.8', function(req, res, next){
  knex('data_csv').select('US_State','Postal_Code', 'NoA_H', 'NoA_NHB', 'NoA_NHW', 'NoA_NHO', 'NoB_H', 'NoB_NHB', 'NoB_NHW', 'NoB_NHO', 'NoF_H', 'NoF_NHB', 'NoF_NHW', 'NoF_NHO', 'NoP_H', 'NoP_NHB', 'NoP_NHW', 'NoP_NHO' ).then(
    function (data) {
    res.format({
      json: function(){
        res.send(data)
      }
    })
  })
})

//table 1.9
router.get('/v1/table_1.9', function(req, res, next){
  knex('data_csv').select('Postal_Code', 'POP_H', 'POP_NHB', 'POP_NHW', 'POP_NHO', 'POP_15_19', 'POP_15_17', 'POP_18_19' ).then(
    function (data) {
    res.format({
      json: function(){
        res.send(data)
      }
    })
  })
})

//notes
router.get('/v1/notes', function(req, res, next){
  knex('Notes').select('ID', 'Note' ).then(
    function (data) {
    res.format({
      json: function(){
        res.send(data)
      }
    })
  })
})




module.exports= router;