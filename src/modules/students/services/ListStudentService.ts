import { inject, injectable } from "tsyringe";

import Student from "../infra/typeorm/entities/Student";
import IStudentRepository from "../repositories/IStudentRepository";

interface IRequest {
  page: number;
  limit: number;
}

interface IResponse {
  total: number
  students: Student[]
}

@injectable()
export default class ListStudentService {
  constructor(
    @inject('StudentRepository') private studentRepository: IStudentRepository
  ) {}

  async execute({
    page,
    limit,
  }: IRequest): Promise<IResponse> {
    const paginateStudents = await this.studentRepository.list(page, limit)

    return paginateStudents
  }
}
