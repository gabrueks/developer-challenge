module.exports = async (req, res) => {
    res.status(200).json({
        auth: false,
        token: null
    });
}