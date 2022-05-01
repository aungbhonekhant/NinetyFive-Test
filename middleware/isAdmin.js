const { roles } = require("../Utils/constants");

const isAdmin = (req, res, next) => {
    if(req.user.role === roles.admin){
        next()
    }else{
        req.flash('warning', 'your are not authorized to see this route');
        res.redirect('/');
    }
}

module.exports = isAdmin;