const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();
console.log('server begins');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
