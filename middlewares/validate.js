module.exports = (varlidator) => {
    return async (req, res, next) => {
        try {
            await varlidator.varlidate(req.body, {
                abortEarly: false
            });

        } catch (err) {
            return res.status(400).json({errors: err.errors[0]});
        }

        
        next();
    }
};