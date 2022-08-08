import { inject, injectable } from "tsyringe";

import Student from "../infra/typeorm/entities/Student";
import IStudentRepository from "../repositories/IStudentRepository";

import AppError from "../../../shared/errors/AppError";

interface IRequest {
  id: number;
}

interface IResponse {
  student: Student
}

@injectable()
export default class ShowStudentByIdService {
  constructor(
    @inject('StudentRepository') private studentRepository: IStudentRepository
  ) {}

  async execute({
    id,
  }: IRequest): Promise<IResponse> {
    const findStudent = await this.studentRepository.findById(id)
    if (!findStudent) {
      throw new AppError('Aluno não encontrado')
    }

    return {
      student: findStudent
    }
  }
}
