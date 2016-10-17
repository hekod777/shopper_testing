const express = require('express');
const router = new express.Router();
const models = require('../db');
const Order = models.models.Order;
const Instrument = models.models.Instrument;
const OrderItem = models.models.OrderItem;
const User = models.models.User;

router.get('/', function(req, res, next){
	Order.findAll({
		include:[
			User,
			{
				model: OrderItem,
				include:[Instrument],
			}
		]
	})
		.then(function(results){
			res.send(results);
		})
		.catch(next);
});

router.delete('/:id', function(req, res, next){
	Order.destroy({
		where:{
			id: req.params.id
		}
	})
		.then(function(){
			res.sendStatus(200);
		})
		.catch(next);
})

// router.post('/:content/:respondent', function(req, res, next){
// 	Question.create({
// 		content: req.params.content,
// 		respondent: req.params.respondent,
// 	})
// 		.then(function(result){
// 			res.send(result);
// 		})
// 		.catch(next);
// })

// router.get('/:respondent', function(req, res, next){
// 	console.log (req.params.respondent);
// 	Question.findAll({
// 		where:{
// 			respondent: req.params.respondent,
// 		}
// 	})
// 		.then(function(results){
// 			res.send(results);
// 		})
// 		.catch(next);
// })



module.exports = router;
