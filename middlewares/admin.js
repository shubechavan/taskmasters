console.log('Admin middleware loaded'); // Add this at the top

const jwt = require('jsonwebtoken');   




const secretKey = process.env.JWT_SECRET || 'your_secret_key';

function isAdmin(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }

        // Assuming your admin data is stored in the JWT
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Not an admin.' });
        }

        req.user = decoded; // Attach user info to the request object
        next(); // Proceed to the next middleware or route handler
    });
}

module.exports = { isAdmin };
console.log('Admin middleware loaded');
