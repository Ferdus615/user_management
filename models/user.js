const db = require('./db');
const bcrypt = require('bcryptjs');

const User = {
    findByEmail: (email, callback) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], callback);
    },

    create: (name, email, password, callback) => {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return callback(err);
            db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], callback);
        });
    },

    updateStatus: (userIds, status, callback) => {
        db.query('UPDATE users SET status = ? WHERE id IN (?)', [status, userIds], callback);
    },

    delete: (userIds, callback) => {
        db.query('DELETE FROM users WHERE id IN (?)', [userIds], callback);
    },

    updateLastLogin: (userId, callback) => {
        db.query('UPDATE users SET last_login = NOW() WHERE id = ?', [userId], callback);
    },

    getAll: (callback) => {
        db.query('SELECT id, name, email, last_login, registration_time, status FROM users', callback);
    }
};

module.exports = User;
