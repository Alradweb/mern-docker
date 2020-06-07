const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const {JWT_SECRET} = process.env
const User = require('../models/User')
const router = Router()


// /api/auth/register
router.post('/register',
    [
        // validate email
        check('email', 'Некорректный е-мейл').isEmail(),
        // password must be at least 6 chars long
        check('password', 'Пароль должен быть не менее 6 символов').isLength({min: 6}),
        check('name', 'Имя должно содержать не менее 2 символов').isLength({min: 2})
    ],
    async (req, res) => {
        console.log(req.body)
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array(), message: 'Некорректные данные при регистрации'})
            }
            const {email, password, name} = req.body
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(409).json({
                    message: "Такой пользователь уже существует"
                })
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                name,
                email,
                password: hashedPassword
            })
            await user.save()
            res.status(201).json({
                message: 'Пользователь успешно создан'
            })
        } catch (e) {
            console.log(`ROUTER POST REGISTER: ${e.message}`)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте ещё раз'})
        }
    })


// /api/auth/login
router.post('/login',
    [
        // validate email
        check('email', 'Введите корректный е-мейл').normalizeEmail().isEmail(),
        // password must be at least 6 chars long
        check('password', 'Пароль должен быть не пустым').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) return res.status(400).json({message: 'Пользователь не найден'})
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (!passwordMatch) return res.status(400).json({message: 'Неверный пароль'})
            const token = jwt.sign(
                {
                    email: user.email,
                    id: user._id
                },
                JWT_SECRET,
                {expiresIn: '1h'}
                )

            res.status(200).json({
                token: `Bearer ${token}`,
                userId: user._id,
                name: user.name,
                message: `Привет ${user.name}!`
            })
        } catch (e) {
            console.log(`ROUTER POST LOGIN: ${e.message}`)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте ещё раз'})
        }
    })

module.exports = router