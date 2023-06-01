import { Pool } from "pg";

const poolConnection: any  = {} ;



const createPool = async () => {
    
    const pool = new Pool({
        user: 'postgres',
        password: 'DoomsDay@123',
        host: 'localhost',
        database: 'taskmanagementsystemdb',
        port: 5432,  
    })
    try {
        let dbResponse = await pool.query(`Select NOW();`);
    }
    catch(err) {
        throw(err);
    }
    return pool;
}



export const getPool = async () => {
    if(!poolConnection.pool) {
        let pool = await createPool();
        poolConnection.pool = pool;
    }
    return poolConnection.pool; 
}