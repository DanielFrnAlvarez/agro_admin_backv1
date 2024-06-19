import { CustomersService } from 'src/modules/customers/customers.service';
import { throwHttpException } from '../utils/exceptions/http-exception.utils';

export async function validateCustomerExistence(customersService: CustomersService, customerId: string) {
  const customer = await customersService.getCustomerById(customerId);
  if (!customer) {
    throwHttpException('Customer not found');
  }
  return customer;
}
