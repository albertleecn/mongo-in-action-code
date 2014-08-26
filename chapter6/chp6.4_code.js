
// 6.4 reshaping documents
db.users.aggregate([
    {$match: {username: 'kbanker'}},
    {$project: {name: {first:'$first_name',
                       last:'$last_name'}}
    }
]);

//    /* should return
//
//
//     { "_id" : ObjectId("4c4b1476238d3b4dd5000001"),
//       "name" : { "first" : "Kyle", "last" : "Banker" } }
//
//     */


// 6.4.1 String functions
db.users.aggregate([
    {$match: {username: 'kbanker'}},
    {$project:
    {name: {$concat:['$first_name', ' ', '$last_name']},    // 1
        firstInitial: {$substr: ['$first_name',0,1]},          // 2
        usernameUpperCase: {$toUpper: '$username'}             // 3
    }
    }
]);

//    /*  Expected results
//
//     { "_id" : ObjectId("4c4b1476238d3b4dd5000001"),
//       "name" : "Kyle Banker",
//       "firstInitial" : "K",
//       "usernameUpperCase" : "KBANKER" }
//
//
//     */

// additional example for 6.4.1 using $substr function

db.orders.aggregate([
    {$unwind: '$line_items'},
    {$project: {
        'line_items.name': 1, 
        orderQuantity: 
            {$substr:['$line_items.quantity',0,10]}}},       // A
    {$project: {
        orderSummary: 
            {$concat: ['$orderQuantity', ' ', '$line_items.name']}}} // B
])
// #A convert ‘line_items.quantity’ to a string.
// #B concatenate string version of order quantity with the line item name

/* expected results 

> db.orders.aggregate([
...     {$unwind: '$line_items'},
...     {$project: {
...         'line_items.name': 1,
...         orderQuantity:
...             {$substr:['$line_items.quantity',0,10]}}},       // A
...     {$project: {
...         orderSummary:
...             {$concat: ['$orderQuantity', ' ', '$line_items.name']}}} // B
... ])
{ "_id" : ObjectId("6a5b1476238d3b4dd5000048"), "orderSummary" : "1 Extra Large Wheel Barrow" }
{ "_id" : ObjectId("6a5b1476238d3b4dd5000048"), "orderSummary" : "2 Rubberized Work Glove, Black" }
{ "_id" : ObjectId("6a5b1476238d3b4dd5000049"), "orderSummary" : "1 Extra Large Wheel Barrow" }
{ "_id" : ObjectId("6a5b1476238d3b4dd5000050"), "orderSummary" : "1 Extra Large Wheel Barrow" }
{ "_id" : ObjectId("6a5b1476238d3b4dd5000051"), "orderSummary" : "1 Extra Large Wheel Barrow" }
{ "_id" : ObjectId("6a5b1476238d3b4dd5000052"), "orderSummary" : "1 Extra Large Wheel Barrow" }

*/


// 6.4.2 Arithmetic functions
// na

// 6.4.3 date functions
// na

// 6.4.4 Logical functions
// na

// 6.4.5 Set functions
// na

// 6.4.6  Misc. functions
// na
