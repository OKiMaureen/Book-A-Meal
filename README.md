# Book-A-Meal
[![Build Status](https://travis-ci.org/OKiMaureen/Book-A-Meal.svg?branch=ci-coverage)](https://travis-ci.org/OKiMaureen/Book-A-Meal) [![Coverage Status](https://coveralls.io/repos/github/OKiMaureen/Book-A-Meal/badge.svg?branch=ci-coverage)](https://coveralls.io/github/OKiMaureen/Book-A-Meal.svg?branch=ci-coverage) [![Maintainability]<a href="https://codeclimate.com/github/OKiMaureen/Book-A-Meal/maintainability"><img src="https://api.codeclimate.com/v1/badges/28db66ae72040322f0f5/maintainability" /></a>
<a href="https://codeclimate.com/github/OKiMaureen/Book-A-Meal/test_coverage"><img src="https://api.codeclimate.com/v1/badges/28db66ae72040322f0f5/test_coverage" /></a>


## Application Description
Book-A-Meal is an application that allows customers to make food orders and helps the food
vendor know what the customers want to eat.

 
## Table of Content

 [Features](#features)
 [Built With](#built-with)
 [Installation](#installation)
 [Testing](#testing)
 [API End Points](#api-end-points)
 [License](#lincense)

## Features

###  Users

Users can signup and signin to the application<br/>
Users can add new meals<br/>
Users can add edit meals added<br/>
Users can add delete meals added<br/>
Users can get menu for a specific day<br/>
Users can make an order from options presented in the menu<br/>
Users can edit an order made<br/>
Users can delete an order made<br/>

### Caterers
Caterers can signup and signin to the application<br/>
Caterers can set up menu for a specific day<br/>
Caterers can get all orders for a specific day<br/>


## Built With

NodeJs-EXPRESS

html

css

sequelize

postgreSQL

## Installation
1. Clone this repository into your local machine:
```
git clone https://github.com/OKiMaureen/Book-A-Meal
```
2. Install dependencies
```
npm install
```
3. Start the application by running
```
npm start
4. Install postman to test all endpoints on port '8020'



## Testing
run test using 'npm test'

## API Routes
GET /meals/
POST /meals/
POST /meals/
DELETE /meals/<mealId>
POST /menu/ 
GET /menu/ 
POST /orders 
PUT /orders/orderId 
GET /orders 

## LICENSE
This project is licensed under the MIT License - see the LICENSE.md file for details