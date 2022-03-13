var express = require('express');
var router = express.Router();
const Note = require('../models/user')
const WithOut = require('../middlewares/auth');
const WithAuth = require('../middlewares/auth');

/* CRIAR NOTA */
router.post('/', WithOut, async (req, res) => {
    const { title, body } = req.body


    try {
        let note = new Note({ title: title, body: body, author: req.user._id })
        await note.save()
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({ error: 'Problem to create a new note' })
    }
})

/* VER NOTA LOGADO (UNICA) */
router.get('/:id', WithAuth, async (req, res) => {
    try {
        const { id } = req.params
        let note = await Note.findById(id)
        if (isOwner(re.user, note))
            res.json(note)
        else
            res.status(403).json({ error: 'Permission denied' })
    } catch (erro) {
        res.status(500).json({ error: 'Problem to get a note' })
    }
})

/* LISTAR NOTAS */
router.get('/', WithAuth, async (req, res) => {
    try {
        let notes = await Note.find({ author: req.user_id })
        res.json(notes)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

/* ATUALIZAR NOTAS */
router.put(('/id:', WithAuth, async (req, res) => {
    const { title, body } = req.body
    const { id } = req.params

    try {
        let note = await Note.findById(id)
        if (isOwner(req.user, note)) {
            let note = await Note.findOneAndUpdate(id,
                { $set: { title: title, body: body } },
                { upasert: true, 'new': true })

            res.json(note)
        } else
            res.status(403).json({ error: 'Permission denied' })
    } catch (error) {
        res.status(500).json({ error: 'Problem to update a note' })
    }
}))

router.delete('/:id', WithAuth, async (req, res) => {
    const { id } = req.params
    try {
        let note = await Note.findOneAndUpdate(id)
        if (isOwner(req.user, note)) {
            await note.delete()
            res.json({ massage: 'OK' }).status(204)
        } else
            res.status(403).json({ error: 'Permission denied' })
    } catch (error) {
        res.status(500).json({ error: 'Problem to delete a note' })
    }
})

router.search('/search', WithAuth, async (req, res) => {
    const { query } = req.query
    try {
        let notes = await Note.find({ author: req.user_id })
            .find({ $text: { search: query } })
        res.json(notes)
    } catch (error) {
        res.json({ error: error }).status(500)
    }
})

const isOwner = (user, note) => {
    if (JSON.stringify(user._id) == JSON.stringify(note.author._id))
        return true
    else
        return false
}

module.exports = router