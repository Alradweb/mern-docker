const {Router} = require('express')
const shortid = require('shortid')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const {BASE_URL} = process.env
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {
    const {from} = req.body

    const code = shortid.generate()

    const existing = await Link.findOne({ from })

    if (existing) {
      return res.json({ link: existing })
    }

    const to = BASE_URL + '/t/' + code
    const link = new Link({
      code, to, from, owner: req.user.id
    })

   const saved = await link.save()
    console.log(saved)

    res.status(201).json({ link })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.id })
    console.log('LINKS', links)
    res.json(links)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    console.log('LINK----', link)
    res.json(link)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router