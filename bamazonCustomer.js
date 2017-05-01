var mysql = require('mysql');
var inquirer = require('inquirer');
//mySQL connection to the database Bamazon//
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password:"",
  database: "Bamazon"
})
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
      name:'item-id',
      message: 'What is the id of the product you would like to purchase?'
    },
    {
      type:'input',
      name: 'quantity',
      message: 'How many units would you like to purchase?'
    },
  ]).then(function(answers){
    console.log(answers);
    connection.query('SELECT * FROM products WHERE ?', {item_id: 'answers.item-id'},
      function(){
        if(answers.quantity < {products: 'stock_quantity'}){
          console.log("You're lucky, we have some in stock!");
            connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: 'stock_quantity - answers.quantity'}, {item_id: 'answers.item-id'}],
            function(error, response){
              console.log(response);
              console.log("Thank you for placing an order!");
            })
        } else {
          console.log("Insuffient Quantity!");
        }
      });
  });
}
customerOrder();
