/*
    Users routes 
    localhost:4005/api/users
 */
const { Router } = require('express')
const router = Router();


const { GetAllUsers, DeleteUser } = require('../../controllers/Users/UsersController')


//get all users

router.get('/allUsers', GetAllUsers)


//Delete user

router.delete('/delete/:id', DeleteUser)

module.exports = router;