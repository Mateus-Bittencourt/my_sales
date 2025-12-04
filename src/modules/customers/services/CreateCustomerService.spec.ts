import FakeCustomersRepository from '../domain/repositories/fakers/FakeCustomersRepository'
import CreateCustomerService from './CreateCustomerService'
import AppError from '@shared/erros/AppError'
import { customerMock } from '../domain/factories/customer.factory'

let fakeCustomersRepository: FakeCustomersRepository
let createCustomer: CreateCustomerService

describe('CreateCustomerService', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository()
    createCustomer = new CreateCustomerService(fakeCustomersRepository)
  })

  it('should create a new customer', async () => {
    const customer = await createCustomer.execute(customerMock)

    expect(customer).toHaveProperty('id')
    expect(customer.name).toBe('John Doe')
    expect(customer.email).toBe('john.doe@example.com')
  })

  it('should not create a customer with an existing email', async () => {
    await createCustomer.execute(customerMock)

    await expect(createCustomer.execute(customerMock)).rejects.toBeInstanceOf(
      AppError
    )
  })
})
