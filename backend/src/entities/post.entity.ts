import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm"

import {User} from "./user.entity";
import {Hobby} from "./hobby.entity"

@Entity("posts")
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, {nullable: false, onDelete: "CASCADE"})
    @JoinColumn({ name : "user_id"})
    user!: User;

    @ManyToOne(() => User, {nullable: false, onDelete: "CASCADE"})
    @JoinColumn({ name: "hobby_id" })
    hobby!: Hobby;  

    @Column()
    title!: string;

    @Column({ type: "text" })
    content!: string;

    @Column({
    name: "ai_summary",
    type: "text",
    nullable: true,
    })
    aiSummary!: string | null;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
}
