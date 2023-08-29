const { Board, List, Task } = require('../../models')


class BoardController {
    static findBoard = async (req, res, next) => {
        try {
            const user_id = +req.loggedUser.id;
            const data = await Board.findAll({
                where: { user_id },
                include: [
                    {
                        model: List,
                        include: [
                            {
                                model: Task,
                            },
                        ],
                    },
                ],
            });
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    static findBoardById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await Board.findOne({ where: { id: +id } })
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static createBoard = async (req, res, next) => {
        try {
            const { name} = req.body;
            const data = await Board.create({
                name,
                user_id: +req.loggedUser.id,
            });
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    static updateBoard = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name} = req.body;
            const Board = await Board.update(
                {
                    name
                },
                {
                    where: { id: +id },
                }
            );
            res.status(200).json({ message: "Title updated successfully" });
        } catch (err) {
            next(err);
        }
    };

    static deleteBoard = async (req, res, next) => {
        try {
            const { id } = req.params;
            const findBoard = await Board.findOne({ where: { id: +id } });

            if (findBoard) {
                const board = await Board.destroy({
                    where: { id: +id }
                });
                if (board) {
                    res.status(200).json({
                        message: "Board deleted successfully"
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

module.exports = BoardController;
