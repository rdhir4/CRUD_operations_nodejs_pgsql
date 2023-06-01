import { IQueryValue } from "../../types/types";
import { ITaskManagement } from "../api";

export const getQueryWithFieldsToUpdate = (inputBody: ITaskManagement): IQueryValue => {
    const { task_status, task_title, task_description, task_end_date, 
           task_start_date, task_owner_id, task_priority, task_tag} = inputBody;
    let c = 3;
    let values = [];
    let query = '';
    if(task_status) {
        query += `, "task_status" = $${c++}`;
        values.push(task_status);
    } 
    if(task_title) {
        query += `, "task_title" = $${c++}`;
        values.push(task_title);
    } 
    if(task_description) {
        query += `, "task_description" = $${c++}`;
        values.push(task_description);
    } 
    if(task_end_date) {
        query += `, "task_end_date" = $${c++}`;
        values.push(task_end_date);
    } 
    if(task_owner_id) {
        query += `, "task_owner_id" = $${c++}`;
        values.push(task_owner_id);
    } 
    if(task_owner_id) {
        query += `, "task_owner_id" = $${c++}`;
        values.push(task_owner_id);
    } 
    if(task_priority) {
        query += `, "task_priority" = $${c++}`;
        values.push(task_priority);
    } 
    if(task_tag) {
        query += `, "task_tag" = $${c++}`;
        values.push(task_tag);
    } 
    if(task_start_date) {
        query += `, "task_start_date" = $${c++}`;
        values.push(task_start_date);
    } 
    return {
        query,
        values
    }
}