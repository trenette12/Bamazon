var mysql = require('mysql');
var inquirer = require('inquirer');
//mySQL connection to the database Bamazon//
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password:"",
  database: "Bamazon"
});
//Error checking statement
connection.connect(function(error, response){
  if(error) throw error;
  console.log("connected as id" + connection.threadID);
});

connection.query('SELECT * FROM products', function(error, response){
  for (var i = 0; i < response.length; i++) {
    console.log(response[i].item_id + " | " + response[i].product_name + " | " +
  response[i].department_name + " Department | " + "$" + response[i].price + " | " +
  response[i].stock_quantity + " left in stock")
}

});

var customerOrder = function(){
  inquirer.prompt([
    {
      type:'input',
      name:'itemid',
      message: 'What is the id of the product you would like to purchase?'
    },
    {
      type:'input',
      name: 'quantity',
      message: 'How many units would you like to purchase?'
    },
  ]).then(function(answers){
    //setting variables for user input value to customerQuantity and itemId so we can check against them in later function
    var customerQuantity = parseInt(answers.quantity);
    var itemId = parseInt(answers.itemid);
      connection.query('SELECT * FROM products WHERE ?', {item_id: itemId},
        function(error,response){
          for (var i = 0; i < response.length; i++){
            var stockQuantity = response[i].stock_quantity;
            var customerPrice = response[i].price;
            var totalPrice = customerPrice * customerQuantity;
              if(customerQuantity < stockQuantity){
              console.log("You're lucky, we have some in stock!");
                connection.query('UPDATE products SET ? WHERE ?', [{stock_quantity: stockQuantity - customerQuantity}, {item_id: itemId}],
                  function(error,response){
                    console.log('response', response);
                    for (var i = 0; i < response.length; i++){
                    console.log('Your order has been placed and your total is $' + totalPrice);
                  }//closes for loop
                })//closes mySQL query
              }//closes if Statement for comparing customerQuantity and stockQuantity
             else {
              console.log("Insuffient Quantity!");
              }
            }//closes first for loop
        });//closes initial mySQL query
    });//closes then function
  };//closes customerOrder function
customerOrder();
