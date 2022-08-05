import { Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity('students')
export default class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  email: string

  @Column({ unique: true, nullable: false })
  ra: number

  @Column({ nullable: false })
  cpf: number

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
