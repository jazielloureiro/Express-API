import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import User from './user';

@Entity()
export default class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 256 })
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne((type) => User, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne((type) => Post, { onDelete: 'CASCADE' })
    parentPost: Post;
}
