var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
})

function start(){
connection.query('SELECT * FROM products', function(err, res){
  if(err) throw err;

  console.log('Welcome to Bamazon!')
  console.log('------------------------------------------------------------------------------------------------')

  for(var i = 0; i<res.length;i++){
    console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
    console.log('------------------------------------------------------------------------------------------------')
  }

  console.log(' ');
  inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What is the ID of the product you would like to purchase?",
      validate: function(value){
        if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
          return true;
        } else{
          return false;
        }
      }
    },
    {
      type: "input",
      name: "qty",
      message: "How many would you like to purchase?",
      validate: function(value){
        if(isNaN(value)){
          return false;
        } else{
          return true;
        }
      }
    }
    ]).then(function(ans){
      var itemBought = (ans.id)-1;
      var quantityBought = parseInt(ans.qty);
      var grandTotal = parseFloat(((res[itemBought].price)*quantityBought).toFixed(2));

      if(res[itemBought].stock_quantity >= quantityBought){
        connection.query("UPDATE Products SET ? WHERE ?", [
        {stock_quantity: (res[itemBought].stock_quantity - quantityBought)},
        {item_id: ans.id}
        ], function(err, result){
            if(err) throw err;
            console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you with FREE 2-Day shipping because you are an Amazon-Prime member!");
        });

        connection.query("SELECT * FROM departments", function(err, deptRes){
          if(err) throw err;
          var index;
          for(var i = 0; i < deptRes.length; i++){
            if(deptRes[i].department_name === res[itemBought].department_name){
              index = i;
            }
          }

          connection.query("UPDATE departments SET ? WHERE ?", [
          {TotalSales: deptRes[index].TotalSales + grandTotal},
          {department_name: res[itemBought].department_name}
          ], function(err, deptRes){
              if(err) throw err;
          });
        });

      } else{
        console.log("Sorry, there's not enough in stock!");
      }

      reprompt();
    })
})
}

function reprompt(){
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Would you like to purchase another item?"
  }]).then(function(ans){
    if(ans.reply){
      start();
    } else{
      console.log("Hope to see you again soon!");
    }
  });
}

start();