const express = require('express');
const app = express();
const PORT = 3000;
const repairRoutes = require('./routes/repairRoutes');

app.use(express.json());
app.use('/api/v1/repair-requests', repairRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});