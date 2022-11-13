import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 64 })
    title: string;

    @Column({ length: 4096 })
    content: string;
}
