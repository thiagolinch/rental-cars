import { getConnection } from "typeorm";
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcryptjs';

import {createConnection} from "../typeorm"

async function create() {
    
    const connection = await createConnection();
    
    const id = uuidV4()
    const password = await hash('admin', 9)

    await connection.query(
        `INSERT INTO USERS(id, username, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'Thiago Linch', 'admin@rentx.com.br', '${password}', 'true', 'now()', 'XXXXX-XXX')`
    )

    connection.close
}

create().then(() => console.log("User admin created"))