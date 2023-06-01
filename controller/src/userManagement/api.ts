import moment from "moment-timezone";
import { Request, Response } from 'express';
import { getPool } from "../../../dbConnections/db";

export interface IUserManagement {
    user_id?: string;
    user_first_name: string; 
    user_email_address: string;
    user_role: string;
    user_created_on: string;
    user_modified_on?: string;
    user_last_name?: string;
    user_mobile_number?: string;
    user_city?: string;
    user_state?: string;
    user_country?: string;
}
export interface IGetUser {
    user_first_name?: string; 
    user_email_address?: string;
    user_last_name?: string;
    user_mobile_number?: string;
    user_city: string;
    user_state: string;
    user_country: string;
}

export const createApi = async(req: Request<{}, {}, IUserManagement>, res: Response) => {
    try {
    const {user_first_name, user_created_on, user_email_address, user_modified_on, user_role
    , user_city = null, user_last_name = null, user_country = null, user_state = null, user_mobile_number = null
    } = req.body;
    const pool =  await getPool();
    await pool.query(`INSERT INTO "UserManagement" ("user_first_name", "user_email_address",
    "user_role", "user_created_on", "user_modified_on", "user_last_name", "user_mobile_number",
    "user_city", "user_state", "user_country") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [
     user_first_name, user_email_address, user_role, user_created_on, user_modified_on, 
     user_last_name, user_mobile_number, user_city, user_state, user_country
    ]);
    res.send("success");
    } catch(err) {
        console.log(err);
        res.status(500).send("error inserting");
    }
}

export const getApi = async(req: Request<{}, {}, IGetUser>, res: Response) => { 
    try {
        const {user_city, user_country, user_email_address, user_first_name, user_last_name, user_mobile_number, user_state} = req.body;
        const pool = await getPool();
        const result = await pool.query(`SELECT * FROM  "UserManagement" WHERE ("user_first_name" ILIKE $1 OR "user_email_address" ILIKE $2
        OR "user_last_name" ILIKE $3 OR "user_mobile_number" = $4) AND "user_state" = $5 AND "user_city" = $6 AND "user_country" = $7`, 
        [user_first_name, user_email_address, user_last_name, user_mobile_number, user_state, user_city, user_country]);
       const rows = result.rows as IUserManagement
       res.json(rows);
    }
    catch(err) {
        console.log(err);
        res.status(500).send("error searching");
    }
}

export const updateUser = async(req: Request<{}, {}, IUserManagement>, res: Response) => {
    try {
        const {user_first_name, user_email_address, user_role
        , user_city = null, user_last_name = null, user_country = null, user_state = null, user_mobile_number = null, user_id,
        } = req.body;
        const modifiedOn = moment().tz("UTC").format();
        const pool = await getPool();
        await pool.query(`UPDATE "UserManagement" SET "user_first_name" = $1, "user_email_address" = $2,
        "user_role" = $3, "user_modified_on" = $4, "user_last_name" = $5, "user_mobile_number" = $6,
        "user_city" = $7, "user_state" = $8, "user_country" = $9 WHERE user_id = $10`,
        [user_first_name, user_email_address, user_role, modifiedOn, user_last_name,
        user_mobile_number, user_city, user_state, user_country, user_id])
        res.status(200).send("success");
    } catch(err) {
        console.log(err);
        res.status(500).send("error updating");
    }
}
