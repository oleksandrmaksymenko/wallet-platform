import { Injectable, Inject } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { randomUUID } from 'node:crypto';
import { CreateCompanyInput } from "@wallet-platform/contracts";
import { COMPANIES_REPOSITORY, CompaniesRepository, Company } from "./domain";

@Injectable()
export class CompaniesService {
  constructor(
    @Inject(COMPANIES_REPOSITORY) private readonly companies: CompaniesRepository,
  ) {}

  async create(input: CreateCompanyInput): Promise<Company> {
    const company: Company = {
      id: randomUUID(),
      name: input.name.trim(),
      createdAt: new Date()
    }
    await this.companies.insert(company);
    return company;
  }

  async getOrThrow(id: string): Promise<Company> {
    const company = await this.companies.findById(id);
    if (!company) {
      throw new RpcException({ status: 400, message: `Company ${id} not found` });
    }

    return company;
  }
}
