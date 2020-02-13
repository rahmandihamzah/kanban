const { Task } = require('../models')

class Controller {
    static fetchAll(req, res, next) {
        Task.findAll({
            order: [['id', 'ASC']]
        })
            .then(response => {
                res.status(200).json({
                    msg: 'success fetch tasks',
                    data: response
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static findById(req, res, next) {
        const { id } = req.params

        Task.findOne({
            where: {
                id
            }
        })
            .then(response => {
                if (response) {
                    res.status(200).json({
                        msg: `success find task id:${id}`
                    })
                } else {
                    res.status(404).json({
                        msg: 'Not Found'
                    })

                    // const err = {
                    //     name: 'notFound'
                    // }
                    // next(err)
                }
            })
    }

    static create(req, res, next) {
        const { title, description, CategoryId, UserId } = req.body

        Task.create({
            title: title,
            description: description,
            CategoryId: CategoryId,
            UserId: UserId
        })
            .then(response => {
                res.status(200).json({
                    msg: 'success create task',
                    data: response
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static edit(req, res, next) {
        const { id } = req.params
        const { title, description, CategoryId, UserId } = req.body
        
        Task.update(
            {
                title: title,
                description: description,
                CategoryId: CategoryId,
                UserId: UserId
            },
            {
                where: {
                    id
                },
                returning: true
            }
        )
            .then(response => {
                if (response[0]) {
                    res.status(200).json({
                        msg: 'success update task',
                        data: response
                    })
                } else {
                    res.status(404).json({
                        msg: 'Not Found'
                    })

                    // const err = {
                    //     name: 'notFound'
                    // }
                    // next(err)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next) {
        const { id } = req.params

        Task.destroy({
            where: {
                id
            }
        })
            .then(response => {
                if (response) {
                    res.status(200).json({
                        msg: 'success delete task'
                    })
                } else {
                    res.status(404).json({
                        msg: 'Not Found'
                    })

                    // const err = {
                    //     name: 'notFound'
                    // }
                    // next(err)
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = Controller