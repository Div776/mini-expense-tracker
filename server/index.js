const express = require('express');
const cors = require('cors');
const expenseRoutes = require('./routes/expenses');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/expenses', expenseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});