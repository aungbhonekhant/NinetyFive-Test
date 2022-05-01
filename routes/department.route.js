const { render } = require('ejs');
const { getAllDepartment, createDepartment, createDepartmentPost, updateDepartment, updateDepartmentPost, deleteDepartment } = require('../controller/department');
const validateRequestSchema = require('../middleware/validate-request-schema');
const { departmantCreateSchema } = require('../schema/departmantSchema');

const router = require('express').Router();

router.get('/create', createDepartment)
router.get('/update/:id', updateDepartment)

router.post('/create',departmantCreateSchema, validateRequestSchema, createDepartmentPost)
router.post('/update/:id', updateDepartmentPost)

router.post('/delete/:id', deleteDepartment)

router.get('/', getAllDepartment)

module.exports = router;