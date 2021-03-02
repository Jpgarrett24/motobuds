const port = 8000;
const db_name = 'motobuds_db';
const express = require('express');
const cors = require('cors');

require('./config/mongoose.config')(db_name);

const app = express();
app.use(express.json());
app.use(cors());

require('./routes/trip.routes')(app);
require('./routes/user.routes')(app);
require('./routes/auth.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));