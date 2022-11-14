import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 32 })
    username: string;

    @Column({ length: 128 })
    password: string;

    @Column()
    isAdmin: boolean;
}
