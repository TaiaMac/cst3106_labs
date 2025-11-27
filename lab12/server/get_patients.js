const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',          
    password: 'May.5477',        
    database: 'emergency_waitlist'
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL lab11-webdevdb");
});


app.get('/patients', (req, res) => {
    const sql = `
        SELECT 
            Patient.card_number,
            Patient.name,
            Patient.gender,
            Patient.date_of_birth,
            Patient.medical_issue,
            Patient.arrival_time,
            Priority.description AS priority,
            Room.doctor_assigned AS doctor,
            Room.status AS room_status
        FROM Patient
        LEFT JOIN Priority ON Patient.priority_id = Priority.priority_id
        LEFT JOIN Room ON Patient.room_id = Room.room_id
        ORDER BY arrival_time DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.log("SQL error:", err);
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/patients`);
});