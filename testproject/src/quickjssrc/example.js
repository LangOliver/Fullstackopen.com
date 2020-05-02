var orders = [
    {amount: 250},
    {amount: 400},
    {amount: 100},
    {amount: 325}
]
console.log('sum:', orders.reduce(function(sum, order) {
    console.log("hello", sum, order)
    return sum + order.amount
},0))
