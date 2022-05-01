const Profile = async (req, res) => {
    const currentUser = req.user;   
    res.render('profile', {currentUser})
}


module.exports = {
    Profile
}