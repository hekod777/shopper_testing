var debateApp = angular.module('debateApp', ['ui.router', 'ui.bootstrap', 'ui.bootstrap.tpls']);

debateApp
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('home',{
				url:'/',
				templateUrl:'/home.html',
			})
			.state('questions',{
				resolve:{
					questions:function(QuestionFactory){
						return QuestionFactory.getAll();
					}
				},
				url:'/questions',
				templateUrl:'/question/question.html',
				controller: function(questions, QuestionFactory, $scope, $state){
					console.log (questions);
					$scope.questions = questions;

					$scope.save = function(){
						QuestionFactory.save($scope.newquestion)
							.then(function(){
								$scope.newquestion.content = '';
								$scope.newquestion.respondent = '';
							})
					}
				},
			})
			.state('respondent', {
				url: '/respondent/:respondent',
				templateUrl:'/question/respondent.html',
				resolve:{
					testQuestions: function(QuestionFactory, $stateParams){
						console.log ($stateParams.respondent);
						return QuestionFactory.findAllFrom($stateParams.respondent);
					}
				},
				controller: function(testQuestions, $scope){
					console.log (testQuestions);
					$scope.testQuestions = testQuestions;
				}

			})
			.state('login',{
				url:'/login',
				templateUrl:'/login.html',
				controller: function(AuthService, $state, $scope){
					$scope.login = function(){
						AuthService.login($scope.credentials)
							.then(function(){
								$state.go('home');
							})
					}
				}				
			})
			.state('ordermanagement',{
				url:'/ordermanagement',
				templateUrl:'/orderManager/order_manager.html',
				resolve: {
					orders: function(OrderManagerFactory){
						return OrderManagerFactory.getAll();
					}
				},
				controller: function(OrderManagerFactory, $state, $scope, orders){
					$scope.orders = orders;
					$scope.pageOrders = [];
					$scope.numPerPage = 3;
					$scope.currentPage = 1;
					$scope.maxSize = 5;
					$scope.totalPages = Math.ceil($scope.orders.length/$scope.numPerPage);


					console.log ('scope order is ' + $scope.orders);
					console.log ($scope.orders[0]);

					$scope.$watch('currentPage + numPerPage', function(){
						var start = (($scope.currentPage-1) * $scope.numPerPage);
						var end = start + $scope.numPerPage;
						$scope.pageOrders = $scope.orders.slice(start,end);
					})

					$scope.delete = function(id){
						return OrderManagerFactory.destroy(id);

					}
				},
			})

	$urlRouterProvider.otherwise('/');
	
	});

// .state('home')
// .state('home.cool')
// <ui-sref='.cool'></ui-sref>
// $state.go('home({me:'aa'})')  in a controller
// 
