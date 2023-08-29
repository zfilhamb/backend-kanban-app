const { List, Choice } = require('../../models')
const fs = require('fs')


class ListController {
    static findList = async (req, res, next) => {
        try {
            const data = await List.findAll({where: { board_id }});
            res.status(200).json(data);
          } catch (err) {
            next(err);
          }
    };

    static findListById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await List.findOne({ where: { id: +id } })
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static createList = async (req, res, next) => {
        try {
            const { title, board_id } = req.body;
            const data = await List.create({
                title,
                board_id: +board_id
            });
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    static updateList = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { title, category_id } = req.body;
            let fileName = "";

            if (req.file === undefined) {
                const updatedList = await List.update(
                    {
                        title,
                        category_id,
                    },
                    {
                        where: { id: +id },
                    })
            } else {
                const image = req.file.path;
                fileName = `http://localhost:3001/${image}`;

                const post = await List.findByPk(+id);
                if (post.image) {
                    const filePath = post.image.replace("http://localhost:3001/", "");
                    fs.unlinkSync(filePath);
                }
                const updatedList = await List.update(
                    {
                        title,
                        image: fileName,
                        category_id,
                    },
                    {
                        where: { id: +id },
                    })
            }
            res.status(200).json({ message: "List updated successfully" });
        } catch (err) {
            next(err);
        }
    }

    static deleteList = async (req, res, next) => {
        try {
            const { id } = req.params;
            const findList = await List.findOne({ where: { id: +id } });

            if (findList) {
                const list = await List.destroy({
                    where: { id: +id }
                });
                if (list) {
                    res.status(200).json({
                        message: "List deleted successfully"
                    });
                }
            } else {
                next({ name: "ErrorNotFound" });
            }
        } catch (err) {
            next(err);
        }
    };
}

module.exports = ListController;