const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());
 


const customers = [
    {title: 'aman' , id : 1} ,
    {title: 'ajay' , id : 2} ,
    {title: 'shubham' , id : 3} , 
    {title: 'neha' , id : 4} ,
    {title: 'indrabhan' , id : 5} ,
    {title: 'rohit' , di : 6}
]

//GET
app.get('/' , (req , res) => {
    res.send('welcome to your REST API');
});

app.get('/api/customers', (req, res) => {
    res.send(customers);
});

app.get('api/customers/:id', (req , res) => {
    const customer = customers.find( c => c.id === parseInt(req.param.id));

if(!customer)res.status(404).send('<h3 style="font-family: Malgun Gothic; color: darkred;"> Cant  find what you are looking for!<h3>');
res.send(customer); });

//POST - CREATE New Customer Information

app.post('/api/customers', (req, res)=> {
    const { error } = validateCustomer(req.body);

    if (error) {
    res.status(400).send(error.details[0].message)
    return;
    }

    const customer = {
    id: customers.length + 1,
    title: req.body.title
    };
    customers.push(customer);
    res.send(customer);
    });

    // PUT - Update Customer Information
app.put('/api/customers/:id', (req, res) => {
    const customer = customers.find(c=> c.id === parseInt(req.params.id));
    if (!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');
     
    const { error } = validateCustomer(req.body);
    if (error){
    res.status(400).send(error.details[0].message);
    return;
    }
     
    customer.title = req.body.title;
    res.send(customer);
    });
    // DELETE - Delete Customer Information
    app.delete('/api/customers/:id' , (req, res) => {
        const customer = customers.find(c=> c.id === parseInt (req.params.id));
        if(!customer) res.status(400).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!!</h2>');
        const index = customers.indexOf(customer);
        customers.splice(index, 1);
        res.send(customer);
    });

    
    //Validate Information
function validateCustomer(customer) {
    const schema = {
    title: Joi.string().min(3).required()
    };
    return Joi.validate(customer, schema);
     
    }
     
    //PORT ENVIRONMENT VARIABLE
    const port = process.env.PORT || 8080;
    app.listen(port, () => console.log(`Listening on port ${port}..`));

  /* function validateCustomer(customer) {
        const schema = {
            title: joi.string().min(3).required() 
             };
             return joi.validate(customer, schema);

          }
          
          const port = process.env.PORT || 8080;
          app.listen(port, () => console.log(`Listening on port ${port}..`)); */