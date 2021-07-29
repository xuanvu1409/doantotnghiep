const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) return res.status(401).send("Access denied");
        const token = req.headers.authorization.split(' ')[1];
        await jwt.verify(token, process.env.JWT_SECRET, {}, (err, decode) => {
            if (err) {
                console.log(`JWT Error: ${err}`);
                return res.status(401).send("Access denied");
            }
            console.log(decode)
            req.member = decode;
        })
        next();
    } catch (e) {
        res.status(400).send('Invalid token!');
    }
}

module.exports = auth;
