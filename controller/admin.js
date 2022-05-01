const User = require("../models/user.modal");
const mongoose = require('mongoose');
const { roles } = require("../Utils/constants");
const Department = require("../models/department");
/** 
* @description Get all user (admin only)
* @render manage-users.ejs file
* @return users list
*/
const getAllUsers = async (req, res, next) => {
    try {
        const rowPerPage = 10;
        const page = req.query.page || 1;
        const {department, role} = req.query;
        const queryObj = {};
        if(department){
            queryObj.department = department
        }
        if(role){
            queryObj.role = role
        }

        const users = await User.find(queryObj).populate('department', '_id, name')
        .skip((rowPerPage * page) - rowPerPage)
        .limit(rowPerPage);
        const userCount = await User.count(queryObj);
        const pages = Math.ceil(userCount / rowPerPage);

        const userRole = Object.values(roles);
        const departments = await Department.find();
        res.render('manage-user', {users, userRole, current: page, pages,departments, department: department?department:null, role: role?role:null });
    } catch (error) {
        next(error)
    }
}

/** 
* @description Get single user (admin only)
* @render manage-users.ejs file
* @return user object
*/
const getUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            req.flash('danger', 'Invalid Id');
            res.redirect('/admin/users');
            return;
        }

    const currentUser = await User.findById(id).populate('department', '_id, name');
    
    res.render('profile', {currentUser})
    } catch (error) {
        next(error)
    }
};

/** 
* @description Update user (admin only)
* @render register.ejs file
* @return user object
*/
const updateUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        //check for mongoose object id
        if(!mongoose.Types.ObjectId.isValid(id)){
            req.flash('danger', 'Invalid Id');
            res.redirect('/admin/users');
            return;
        }
        const userToUpdate = await User.findById(id);
        const userRole = Object.values(roles);
        const departments = await Department.find();
        res.render('update-user', {userToUpdate,userRole, departments })
    } catch (error) {
        next(error)
    }
}

/** 
* @description Update user (admin only)
* @render manage-users.ejs file
* @return 
*/
const updateUserPost = async (req, res, next) => {
    try {
        const {email, department, role} = req.body;
        const {id}= req.params;

        //checking for id, email, department, and role
        if(!id || !email || !department || !role){
            req.flash('danger', 'Invalid Request');
            return res.redirect('back')
        }

        //check for mongoose object id
        if(!mongoose.Types.ObjectId.isValid(id)){
            req.flash('danger', 'Invalid Id');
            return res.redirect('back');
        }

        //check valid role
        const roleArr = Object.values(roles)
        if(!roleArr.includes(role)){
            req.flash('danger', 'Invalid role');
            return res.redirect('back');
        }
        //admin can't remove himself as an admin
        if(req.user.id === id){
            req.flash('danger', "Admins can't remove themselves from Admin, ask another Admin");
            return res.redirect('back');
        }

        //update user
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {email: email, department:department, role: role},
            { new: true, runValidators:true }
          )

          if(!updatedUser){
            req.flash('danger', 'Invalid Id');
            return res.redirect('back');
          }
          req.flash('success', `Successfully updated for ${email}`)
          res.redirect('/admin/users')
    } catch (error) {
        next(error)
    }
}

/** 
* @description Delete user (admin only)
* @render 
* @return user object
*/
const deleteUser = async (req, res, next) => {
    try {
        const {id}= req.params;

        //check for mongoose object id
        if(!mongoose.Types.ObjectId.isValid(id)){
            req.flash('danger', 'Invalid Id');
            res.redirect('/admin/users');
            return;
        }

        //admin can't delete himself as an admin
        if(req.user.id === id){
            req.flash('danger', "Admins can't delete themselves from Admin, ask another Admin");
            return res.redirect('back');
        }

        const user = await User.findByIdAndRemove(id)

          if(!user){
            req.flash('danger', 'Invalid Id');
            res.redirect('/admin/users');
            return;
          }
          req.flash('success', `Successfully Deleted for ${user.email}`)
          res.redirect('/admin/users')
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    updateUserPost,
}
