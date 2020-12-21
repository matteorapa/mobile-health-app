const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// const {connection} = await connectSQL()
//     connection.query('SELECT * FROM `items` WHERE item_id= "'+ req.query.item_id +'"', (err, results) => {
//       if(err){
//         res.status(500).json({
//           error: `Error has occured whilst fetching item`
//         })
//       }
//       if(results){
//         const item = results[0];
//         res.status(200).json(item);
//       }
//     })
   
//   })