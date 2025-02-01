const express = require('express');
const cors = require('cors');
const faqRoutes = require('./routes/faqRoutes');

const app = express();

app.use(cors());
app.use(express.json()); 
app.use('/api/faqs', faqRoutes);


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
