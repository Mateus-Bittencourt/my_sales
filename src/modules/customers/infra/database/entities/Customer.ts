import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ICustomer } from '../../../domain/models/ICustomer'

@Entity('customers')
export class Customer implements ICustomer {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text' })
  email: string

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date
}
