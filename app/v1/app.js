const express = require('express');
const os = require('os');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.json({
        version: 'v1-stable',
        message: 'Hello from Stable Version',
        hostname: os.hostname(),
        timestamp: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy', version: 'v1' });
});

app.listen(PORT, () => {
    console.log(`Version 1 running on port ${PORT}`);
});
