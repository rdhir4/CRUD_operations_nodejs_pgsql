import { Request, Response } from "express";
import { getPool } from "../../../dbConnections/db";
import { getQuerywithFilters,  } from "./utils/fetchTask.util";
import { SortingField } from "../types/tasks";
import moment from "moment-timezone";
import { getQueryWithFieldsToUpdate } from "./utils/updateTasks.util";

export interface ITaskManagement {
    task_id?: string;
    task_status: string;
    task_title: string;
    task_created_on: string;
    task_created_by: string;
    task_modified_on: string;
    task_modified_by: string;
    task_description?: string;
    task_owner_id?: string;
    task_tag?: string;
    task_start_date?: string;
    task_end_date?: string;
    task_priority?: string;
    task_comments?: string;
}

export interface IFetchTaskCriteria {
    task_title: string;
    sorting_field?: SortingField;
    task_owner_id?: string;
    task_status?: string;
    task_start_date?: string;
    task_end_date?: string;
}

export interface IReadTaskCriteria {
    task_id: string;
}

export interface IUpdateTaskParams {
    user_id: string;
}

export interface ITaskComments {
    commentId: string;
    createdOn: string;
    createdBy: string;
    commentValue: string;
    modifiedOn: string;
    modifiedBy: string;
}
export const createTask = async(req: Request<{}, {}, ITaskManagement>, res: Response) => {
    try {
        const { task_status, task_title, task_created_on, task_created_by, task_modified_on, task_modified_by,
        task_description, task_owner_id, task_tag, task_start_date, task_end_date, task_priority, task_comments
        } = req.body;
        const pool =  await getPool();
        await pool.query(`INSERT INTO "taskmanagement" ("task_status", "task_title", "task_created_on",
        "task_created_by", "task_modified_on", "task_modified_by", "task_description", "task_owner_id", 
        "task_tag", "task_start_date", "task_end_date", "task_priority", "task_comments") 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        [task_status, task_title, task_created_on, task_created_by, task_modified_on, task_modified_by,
        task_description, task_owner_id, task_tag, task_start_date, task_end_date, task_priority, JSON.stringify(task_comments)]);
        res.status(200).send("success");
    } catch(err) {
        console.log(err);
        res.status(500).send("Error inserting");
    }
}

export const fetchTask = async(req: Request<{}, {},  IFetchTaskCriteria>, res: Response) => {
    try {
        const {task_title, task_end_date, task_owner_id, task_status, task_start_date, sorting_field} = req.body;
        const values = [task_title];
        const pool = await getPool();
        let query = `SELECT task_id, task_title, task_description, task_status FROM "taskmanagement"
        WHERE task_title ILIKE $1`  
        const sort = ` ORDER BY ${sorting_field || SortingField.task_title}`  
        const filters = getQuerywithFilters(task_status, task_owner_id, task_start_date, task_end_date);
        query += filters.query + sort;
        const queryValues = [...values, ...filters.values];
        const result = await pool.query(query, queryValues);
        const rows = result.rows as ITaskManagement;
        res.send(rows);
    } catch(err) {
        console.log(err);
        res.status(500).send("Error searching task");
    }
}

export const fetchTaskAndUserByTaskId = async(req: Request<{}, {},  IReadTaskCriteria>, res: Response) => {
    try {
    const pool = await getPool();
    const {task_id} = req.body;
    const result = await pool.query(`SELECT t.*, CONCAT(u."user_first_name", ' ', u."user_last_name") AS user_full_name FROM "taskmanagement" as 
    t JOIN "UserManagement" AS u ON t."task_owner_id" = u."user_id" WHERE task_id  = $1`,[task_id]);
    return res.json(result.rows);
    }
    catch(err) {
        console.log(err);
        return res.status(200).json({error: "Error fetching"});
    }
}

export const updateTasks = async(req: Request<{}, {}, ITaskManagement, IUpdateTaskParams>, res: Response) => {
    try {
        const pool = await getPool();
        const { user_id } = req.query;
        const { task_id } = req.body;
        let query = `UPDATE "taskmanagement" SET "task_modified_on" = $1, "task_modified_by" = $2`;
        const values = [moment().tz("UTC").format(), user_id];
        const { query: updatedQuery, values: updatedValues } = getQueryWithFieldsToUpdate(req.body);
        const queryValues = [...values, ...updatedValues];
        const queryCondition = ` WHERE "task_id" = $${queryValues.length+1}`
        query+=updatedQuery + queryCondition;
        queryValues.push(task_id as string);
        console.log(query, queryValues);
        await pool.query(query, queryValues);
        res.status(200).send("success");
    } catch(err) {
        console.log(err);
        res.send("Error Updating");
    }
}
