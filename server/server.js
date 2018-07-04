const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const serveStatic = require('serve-static');

app = express();
// app.use(serveStatic(__dirname + "/dist"));
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('/status', (req, res) => {
	res.send({
		message: 'hello'
	})
});
let port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);