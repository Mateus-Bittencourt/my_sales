import { OrderProduct } from '@modules/orders/database/entities/OrderProduct'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  order_product: OrderProduct[]

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'decimal' })
  price: number

  @Column({ type: 'int' })
  quantity: number

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date
}
