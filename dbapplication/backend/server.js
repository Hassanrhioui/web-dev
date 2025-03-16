const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files from the "frontend" folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve static files from the "public" folder (for testing)
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
const db = new sqlite3.Database('./mydatabase.db', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create the trainers table if it doesn't exist
const createTrainersTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS trainers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            rating REAL NOT NULL CHECK(rating >= 0 AND rating <= 5)
        )
    `;
    db.run(sql, (err) => {
        if (err) {
            console.error('Error creating trainers table:', err.message);
        } else {
            console.log('Trainers table created successfully.');
        }
    });
};

// Initialize database schema
const initializeDatabase = () => {
    createTrainersTable();
};

// API endpoint to get all trainers
app.get('/trainers', (req, res) => {
    const sql = 'SELECT * FROM trainers';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

// API endpoint to create a new trainer
app.post('/trainers', (req, res) => {
    const { title, description, rating } = req.body;

    // Validate input
    if (!title || !description || typeof rating !== 'number' || rating < 0 || rating > 5) {
        return res.status(400).json({ error: 'Title, description, and valid rating (0-5) are required.' });
    }

    // Insert the new trainer into the database
    const sql = 'INSERT INTO trainers (title, description, rating) VALUES (?, ?, ?)';
    db.run(sql, [title, description, rating], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Trainer created successfully.', id: this.lastID });
    });
});

// API endpoint to delete a specific trainer by ID
app.delete('/trainers/:id', (req, res) => {
    const { id } = req.params;

    // Delete the trainer from the database
    const sql = 'DELETE FROM trainers WHERE id = ?';
    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Trainer not found or already deleted.' });
        }
        res.status(200).json({ message: 'Trainer deleted successfully.', id });
    });
});

// Serve the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start the server
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

// Initialize database and start server
initializeDatabase();
startServer();