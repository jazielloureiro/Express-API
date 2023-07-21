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

    @ManyToOne((type) => User)
    user: User;

    @ManyToOne((type) => Post)
    parentPost: Post;
}
