const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL);

var Question = db.define('question',{
	content:{
		type: Sequelize.TEXT,
		allowNull: false,
	},
	respondent:{
		type: Sequelize.STRING,
		allowNull: true,
	},
	tags:{
		type: Sequelize.ARRAY(Sequelize.STRING),
		allowNull:true,
	},
});

var Answer = db.define('answer',{
	content:{
		type: Sequelize.TEXT,
		allowNull: false,
	},
	speakingPerson:{
		type: Sequelize.STRING,
		allowNull: true,
	},
	answerFor:{
		type: Sequelize.INTEGER,
		allowNull: false,
	}
});

var User = db.define('user',{
	email:{
		type: Sequelize.STRING,
		allowNull: false,
	},
	password:{
		type: Sequelize.STRING,
		allowNull: false,
	},
	access:{
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: 'member',
	},
	phone:{
		type:Sequelize.INTEGER,
	},
	first_name:{
		type:Sequelize.STRING,
	},
	last_name:{
		type:Sequelize.STRING,
	}

})

////////////////////////////

var Order = db.define('order',{
	order_status:{
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: 'cart',
	},
	delivery_status:{
		type: Sequelize.STRING,
	},
	address:{
		type: Sequelize.STRING,
	},
	city:{
		type: Sequelize.STRING,
	},
	state:{
		type: Sequelize.STRING,
	},
	zipcode:{
		type: Sequelize.INTEGER,
	},
	country:{
		type: Sequelize.STRING,
	},

})


var OrderItem = db.define('order_item',{
	quantity:{
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	sub_total:{
		type: Sequelize.FLOAT,
	},
})

var Instrument = db.define('instrument',{
	instrument_title:{
		type: Sequelize.STRING,
		allowNull: false,
	},
	instrument_brand:{
		type: Sequelize.STRING,
	},
	instrument_price:{
		type: Sequelize.FLOAT,
	},
	instrument_family:{
		type: Sequelize.STRING,
	},
	instrument_type:{
		type: Sequelize.STRING,
	},
	instrument_description:{
		type: Sequelize.STRING,
	},
	instrument_image:{
		type: Sequelize.ARRAY(Sequelize.STRING),
	},
	instrument_video:{
		type: Sequelize.STRING,
	},
})


OrderItem.belongsTo(Instrument);
Instrument.hasMany(OrderItem);

OrderItem.belongsTo(Order);
Order.hasMany(OrderItem);

Order.belongsTo(User);
User.hasMany(Order);







///////////////////////////





var seed = function(){
	return Promise.all([
		Question.create({
			content:'Whats wrong with your tax! Mr. Trump!',
			respondent:'Trump',
		}),
		Question.create({
			content:'Are you stupid? Mr. Trump!',
			respondent:'Trump',
		}),
		Answer.create({
			content:'This is the great part of our tax code! Help the weaks. Tax the strongs. and grow the economy!',
			answerFor:1,
		}),
		User.create({
			email:'faketrump@yahoo.com',
			password:'abc',
		}),
		User.create({
			email:'ronpaul@yahoo.com',
			password:'1111',
			access:'admin',
		}),
		Instrument.create({
			instrument_title:'Donald Duck Trombone',
			instrument_price: 9999.99,
		}),
		Instrument.create({
			instrument_title:'Goofy Piano',
			instrument_price: 0.99,
		}),
		Order.create({
			order_status: 'cart',
			address: '999 milton cat street',
			city: 'humphey bear city',
			state: 'NY',
			zipcode: 12345,
			country:'USA',
			delivery_status:'almost there!',
			userId: 1,
		}),
		Order.create({
			order_status: 'cart',
			address: '999 milton street',
			city: 'humphrey bear city',
			state: 'NY',
			zipcode: 12345,
			country:'USA',
			delivery_status:'almost there!',
			userId: 2,
		}),
		Order.create({
			order_status: 'order',
			address: '111 milton street',
			city: 'humphrey bear city',
			state: 'NY',
			zipcode: 12356,
			country:'USA',
			delivery_status:'almost there!',
			userId: 1,
		}),
		Order.create({
			order_status: 'cart',
			address: '999 cat street',
			city: 'humphrey bear city',
			state: 'NY',
			zipcode: 13003,
			country:'USA',
			delivery_status:'almost there!',
			userId: 1,
		}),
		Order.create({
			order_status: 'order',
			address: '393 killer street',
			city: 'humphrey bear city',
			state: 'NY',
			zipcode: 55555,
			country:'USA',
			delivery_status:'almost there!',
			userId: 2,
		}),
		Order.create({
			order_status: 'shipped',
			address: '777 ace street',
			city: 'humphrey bear city',
			state: 'NY',
			zipcode: 33345,
			country:'USA',
			delivery_status:'almost there!',
			userId: 2,
		}),		


	])
		.then(function(){
			Promise.all([
				OrderItem.create({
					quantity: 5,
					sub_total: 49999.95,
					instrumentId: 1,
					orderId: 1,
				}),
				OrderItem.create({
					quantity: 1,
					sub_total: 9999.99,
					instrumentId:1,
					orderId: 1,
				}),
				OrderItem.create({
					quantity: 1,
					sub_total: 9999.99,
					instrumentId:1,
					orderId: 2,
				}),
				OrderItem.create({
					quantity: 1,
					sub_total: 9999.99,
					instrumentId:1,
					orderId: 3,
				}),
				OrderItem.create({
					quantity: 1,
					sub_total: 9999.99,
					instrumentId:1,
					orderId: 4,
				}),
				OrderItem.create({
					quantity: 1,
					sub_total: 9999.99,
					instrumentId:1,
					orderId: 5,
				}),
				OrderItem.create({
					quantity: 1,
					sub_total: 9999.99,
					instrumentId:1,
					orderId: 6,
				}),
				OrderItem.create({
					quantity: 1,
					sub_total: 0.99,
					instrumentId:2,
					orderId: 6,
				}),
			])
			
		});
}

var sync = function(){
	return db.sync({force:true});
}

var syncAndSeed = function(){
	return sync()
		.then(seed);
}

module.exports = {

	models:{
		Question: Question,
		Answer: Answer,
		User: User,
		Order: Order,
		Instrument: Instrument,
		OrderItem: OrderItem,
	},
	sync: sync,
	seed: seed,
	syncAndSeed: syncAndSeed,

};


