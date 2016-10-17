debateApp.factory('OrderManagerFactory',function($http, $state){

	var OrderManagerFactory = {};
	var orders = [];

	OrderManagerFactory.getAll = function(){
		return $http.get('/api/orderManage')
			.then(function(results){
				angular.copy(results.data, orders);
				console.log ('orders are ' + orders);
				return orders;
			})
	}

	OrderManagerFactory.destroy = function(id){
		return $http.delete('/api/orderManage/' + id)
			.then(function(result){
				var idx = orders.findIndex(function(element){
					return element.id === id;
				})
				orders.splice(idx, 1);
				return orders;
			})
	}

	// QuestionFactory.save = function(newQuestion){
	// 	return $http.post('/api/questions/' + newQuestion.content + '/' + newQuestion.respondent, newQuestion)
	// 		.then(function(result){
	// 			questions.push(result.data);
	// 			return questions;
	// 		})

	// }

	// QuestionFactory.findAllFrom = function(someone){
	// 	console.log ('someone is ' + someone);
	// 	return $http.get('/api/questions/'+ someone)
	// 		.then(function(results){
	// 			angular.copy(results.data, testQuestions);
	// 			console.log('testquestion is ' + testQuestions);
	// 			console.log (testQuestions);
	// 			return testQuestions;
	// 		})
	// }

	return OrderManagerFactory;

})