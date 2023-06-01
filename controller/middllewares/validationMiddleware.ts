import { NextFunction, Request, Response } from "express";
import { IFetchTaskCriteria, ITaskManagement, IUpdateTaskParams } from "../src/taskManagement/api";
import { SortingField } from "../src/types/tasks";

export const validateFetchTaskApiBody = (req: Request<{}, {}, IFetchTaskCriteria>, res: Response, next: NextFunction) => {
    const {task_title, sorting_field} = req.body;
    if(!task_title ) {
        return res.status(400).json({error: "Missing mandatory field 'task_title"});
    }
    if(sorting_field && !Object.values(SortingField).includes(sorting_field)) {
        return res.status(400).json({error: "Invalid value for sorting_field"});
    }
    next();
}

export const validateUpdateTaskApiParams = (req: Request<{}, {}, ITaskManagement, IUpdateTaskParams>, res: Response, next: NextFunction) => {
    const {user_id} = req.query;
    const { task_id } = req.body;
    if(!user_id || !task_id) {
        return res.status(400).json({error: "Invalid Input"});
    }
    next();
}