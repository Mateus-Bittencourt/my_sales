import { Customer } from '@modules/customers/database/entities/Customer'
import { OrderProduct } from '@modules/orders/database/entities/OrderProduct'
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    cascade: true,
    eager: true,
  })
  order_product: OrderProduct[]

  @CreateDateColumn()
  created_at: Date

  @CreateDateColumn()
  updated_at: Date
}
