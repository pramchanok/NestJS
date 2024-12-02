import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Customer } from "./entities/customer.entity";

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel(Customer)
        private readonly customerModel: typeof Customer,
    ) {}
    async create(createCustomerDto: CreateCustomerDto) {
        return await this.customerModel.create(
            createCustomerDto as Partial<Customer>,
        );
    }

    async findAll(): Promise<Customer[]> {
        try {
            const customers = await this.customerModel.findAll({
                order: [["id", "DESC"]],
            });
            if (!customers) {
                throw new NotFoundException("Customer not found");
            }
            return customers;
        } catch {
            throw new NotFoundException("Customer not found");
        }
    }

    async findOne(id: number): Promise<Customer> {
        try {
            const customer = await this.customerModel.findByPk(id);
            if (!customer) {
                throw new NotFoundException("Customer not found");
            }
            return customer;
        } catch {
            throw new NotFoundException("Customer not found");
        }
    }

    async update(id: number, updateCustomerDto: UpdateCustomerDto) {
        try {
            const [affectedRows] = await this.customerModel.update(
                updateCustomerDto,
                {
                    where: { id },
                },
            );
            if (affectedRows === 0) {
                throw new NotFoundException("Customer not found");
            }
            const updatedCustomer = await this.customerModel.findByPk(id);
            return updatedCustomer;
        } catch {
            throw new NotFoundException("Customer not found");
        }
    }

    async remove(id: number) {
        try {
            // Destroy returns the number of rows affected
            const deletedCount = await this.customerModel.destroy({
                where: { id },
            });

            if (deletedCount === 0) {
                throw new NotFoundException("Customer not found");
            }

            return { message: `Customer with id ${id} successfully deleted` };
        } catch (error) {
            throw new NotFoundException(error.message || "Customer not found");
        }
    }
}
