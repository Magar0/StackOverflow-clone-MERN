const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" })
        }

        // const decodedData= jwt.verify(token,process.env.JWT_SECRET)
        // req.userId= decodedData.userId;

        //alternate way
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err || !decoded.userId) {
                return res.status(401).json({ error: "Unauthorized" })
            }
            req.userId = decoded.userId;
            req.email = decoded.email;
            next()
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" })
    }
}

module.exports = authMiddleware;