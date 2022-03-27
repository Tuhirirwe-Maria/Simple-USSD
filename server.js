const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')

const port = process.env.PORT || 2020

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('*', (req, res) => {
    res.send('learn USSD')
  })

  app.post('*', (req,res) => {
    let {sessionId, serviceCode, phoneNumber, text} = req.body
    if(text == ""){
        let response = `CON What would you want to check
        1. My Account
        2. My phone number`
        res.send(response)
    }else if (text == '1') {
        // Business logic for first level response and user chose 1
        let response = `CON Choose account information you want to view
        1. Account number
        2. Account balance
        3. Thank maker`
        res.send(response)
      } else if (text == '2') {
        // Business logic for first level response and user chose 2
        let response = `END Your phone number is ${phoneNumber}`
        res.send(response)
      }else if (text == '3'){
             // Business logic for first level response and user chose 3
        let response = `END She has received your appreciation`
        res.send(response)
      } else if (text == '1*1') {
        // Business logic for first level response and user second level chose 1
        let accountNumber = 'ACC1001'
        // This is a terminal request. Note how we start the response with END
        let response = `END Your account number is ${accountNumber}`
        res.send(response)
      } else if (text == '1*2') {
        // This is a second level response where the user chose 1 and chose 2
        let balance = 'UGX 100,000'
        // This is a terminal request. Note how we start the response with END
        let response = `END Your balance is ${balance}`
        res.send(response)
      }else {
        res.status(400).send('failed to connect!')
      }
  })

  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })