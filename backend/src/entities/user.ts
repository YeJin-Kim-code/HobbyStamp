import{
    Entity,
    primaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm"

@Entity("users")
export class User {
    @primaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    email!: string;

    @Column()
    password!: string;

    @Column()
    nickname!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}