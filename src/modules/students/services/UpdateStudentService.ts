import { inject, injectable } from "tsyringe";

import Student from "../infra/typeorm/entities/Student";
import IStudentRepository from "../repositories/IStudentRepository";

import AppError from "../../../shared/errors/AppError";

interface IRequest {
  id: number;
  name: string;
  email: string;
}

interface IResponse {
  student: Student
}

@injectable()
export default class UpdateStudentService {
  constructor(
    @inject('StudentRepository') private studentRepository: IStudentRepository
  ) {}

  async execute({
    id,
    name,
    email,
  }: IRequest): Promise<IResponse> {
    const findStudent = await this.studentRepository.findById(id)
    if (!findStudent) {
      throw new AppError('Aluno não encontrado')
    }

    const student = await this.studentRepository.save({
      ...findStudent,
      cpf: findStudent.cpf,
      ra: findStudent.ra,
      name,
      email,
    })

    return {
      student
    }
  }
}
