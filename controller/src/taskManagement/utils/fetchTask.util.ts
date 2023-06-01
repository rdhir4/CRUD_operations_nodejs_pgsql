import { SortingField } from "../../types/tasks";
import { IQueryValue } from "../../types/types";


export const getQuerywithFilters = (task_status?: string, task_owner_id?: string, task_start_date?: string, task_end_date?: string): IQueryValue => {
    let query = ''
    const values = [];
    let c = 2;
    if(task_status) {
        query += ` AND task_status ILIKE $${c++}`;
        values.push(task_status);
    }
    if(task_owner_id) {
        query += ` AND task_owner_id = $${c++}`;
        values.push(task_owner_id);
    }
    if(task_start_date) {
        query += ` AND task_start_date >= $${c++}`;
        values.push(task_start_date);
    }
    if(task_end_date) {
        query += ` AND task_end_date <= $${c++}`;
        values.push(task_end_date);
    }
    return {
        query,
        values
    }
}