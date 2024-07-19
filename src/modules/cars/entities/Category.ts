import { v4 as uuidv4 } from 'uuid';

import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity("categories") // Category
// Class referente ao model a ser estruturado
class Category {

    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;


    // aqui estou dizendo que se nao tiver this(referenciando ao proprio id) 
    // criar um novo
    constructor(){
        if(!this.id){
            this.id = uuidv4()
        };
    };
};

// lembrar sempre de exportar uma class ou function que precise ser usada fora deste
// arquivo
export {Category};