import LoginAttempt from '../models/LoginAttempt.js';
import logInAttempt from '../models/LoginAttempt.js';

const logInAttemptLogger = async (req, res, next) => {

    const originalJson = req.json;
    res.json = function(data) {
        const username = req.body.username;
        const ipAddres = req.id || req.connection.remoteAddress;
        const successfulLogin = !data.message || data.message !== 'Invalid ceredentials';

        LoginAttempt.create({username, ipAddress, successfulLogin})
        .catch(err => console.error('Error logging login attempt:',err));

        originalJson.call(this, data);
    };
    next();
}

export default logInAttemptLogger;