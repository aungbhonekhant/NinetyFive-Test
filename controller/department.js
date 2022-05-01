const Department = require("../models/department");
const mongoose = require('mongoose')

/** 
* @description Get All  Department (admin only)
* @render epartmant-list.ejs file
* @return 
*/
const getAllDepartment = async (req, res, next) => {
    const rowPerPage = 5;
    const page = req.query.page || 1;

    const departments = await Department.find()
    .skip((rowPerPage * page) - rowPerPage)
    .limit(rowPerPage);

    const dpmCount = await Department.count();
    const pages = Math.ceil(dpmCount / rowPerPage);
    res.render('departmant-list', {departments, current: page, pages});
}


/** 
* @description create  Department (admin only)
* @render create-departmentt.ejs file
* @return 
*/
const createDepartment = async (req, res, next) => {
    res.render('create-department')
}


/** 
* @description create  Department (admin only)
* @render 
* @return to departmant-list.ejs file
*/
const createDepartmentPost = async (req, res, next) => {
    try {
        const name = req.body.name;

        const department = await Department.create({name});
        req.flash('success', `${department.name} created successfually`)
        res.redirect('/department')
    } catch (error) {
        next(error)
    }
    
}


/** 
* @description Update  Department (admin only)
* @render update-department.ejs file
* @return 
*/
const updateDepartment = async (req, res, next) => {
    try {
        const {id} = req.params;
        //check for mongoose object id
        if(!mongoose.Types.ObjectId.isValid(id)){
            req.flash('danger', 'Invalid Id');
            return res.redirect('back');
        }
        const department = await Department.findById(id);
        res.render('update-department', {department})
    } catch (error) {
        next(error)
    }
}

/** 
* @description Update  Department (admin only)
* @render update-department.ejs file
* @return 
*/
const updateDepartmentPost = async (req, res, next) => {
    try {
        const {id} = req.params;
        const name = req.body.name;
        if(!name){
            req.flash('danger', 'Invalid name');
            return res.redirect('back');
        }
        //check for mongoose object id
        if(!mongoose.Types.ObjectId.isValid(id)){
            req.flash('danger', 'Invalid Id');
            return res.redirect('back');
        }
        const department = await Department.findByIdAndUpdate(
            id,
            {name: name},
            { new: true, runValidators:true }
        );
        if(!department){
            req.flash('danger', 'Invalid Id');
            return res.redirect('back');
          }
          req.flash('success', `Successfully updated for ${name}`)
          res.redirect('/department')
    } catch (error) {
        next(error)
    }
}

const deleteDepartment = async (req, res, next) => {
    try {
        const {id} = req.params;
        //check for mongoose object id
        if(!mongoose.Types.ObjectId.isValid(id)){
            req.flash('danger', 'Invalid Id');
            return res.redirect('back');
        }

        const department = await Department.findByIdAndRemove(id)
        if(!department){
            req.flash('danger', 'Invalid Id');
            res.redirect('back');
            return;
          }
          req.flash('success', `Successfully Deleted for ${department.name}`)
          res.redirect('back')
    } catch (error) {
        next(error)
    }
}



module.exports = {
    getAllDepartment,
    createDepartment,
    createDepartmentPost,
    updateDepartment,
    updateDepartmentPost,
    deleteDepartment
}