
const express= require('express')
const {register , Login, logout, authMiddleware}= require('../../controllers/auth/auth-controller')


const router = express.Router();

router.post('/register', register);
router.post('/login', Login);
router.post('/logout', logout);
router.get('/checkauth', authMiddleware, (req,res)=>{
  const user = req.user;
  res.status(200).json({
    success : true,
    message: 'User is authenticated',
    user,

    
  })
})




module.exports = router