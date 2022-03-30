const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');
const multer = require('multer');
const path = require('path');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images')
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '--' + file.originalname)
    }
});
const upload = multer({ storage: fileStorageEngine })

module.exports = (app) => {
    app.get('/api/users', authenticate, UserController.findAllUsers);
    app.post('/api/users/register', UserController.register);
    app.post('/api/users/login', UserController.login);
    app.get('/api/users/logout', UserController.logout);
    app.get('/api/users/thisuser', UserController.findThisUser);
    app.get('/api/users/recipes', UserController.getRecipes);
    app.put('/api/users/update', UserController.updateUser);
    app.post('/api/users/pic', (req, res) => {
        const filepath = path.join(__dirname, '..', 'images', `${req.body.user['pic']}`)
        res.sendFile(filepath);
    });
    app.post('/api/users/upload', upload.single('image'), UserController.uploadImage);
}