const express = require('express');
const os = require('os');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.json({
        version: 'v2-canary',
        message: 'Hello from NEW Canary Version',
        hostname: os.hostname(),
        features: ['New Feature A', 'Improved Performance'],
        timestamp: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy', version: 'v2' });
});

app.listen(PORT, () => {
    console.log(`Version 2 (Canary) running on port ${PORT}`);
});
