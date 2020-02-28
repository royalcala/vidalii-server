import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn
  } from "typeorm";
  
  import { Key } from "./Key";
  
  /** A Film entity, unlocked using keys */
  @Entity()
  export class Film {
    @PrimaryGeneratedColumn("increment")
    public id?: number;
  
    @Column()
    public name: string;
  
  }
  