import { inject, injectable } from "tsyringe";

import Student from "../infra/typeorm/entities/Student";
import IStudentRepository from "../repositories/IStudentRepository";

import AppError from "../../../shared/errors/AppError";

interface IRequest {
  name: string;
  email: string;
  ra: string;
  cpf: string;
}

interface IResponse {
  student: Student
}

@injectable()
export default class CreateStudentService {
  constructor(
    @inject('StudentRepository') private studentRepository: IStudentRepository
  ) {}

  async execute({
    name,
    email,
    ra,
    cpf,
  }: IRequest): Promise<IResponse> {
    const alreadyInUseRA = await this.studentRepository.findByRA(ra)
    if (alreadyInUseRA) throw new AppError('Esse R.A. já está em uso')

    const student = await this.studentRepository.create({
      name,
      email,
      ra,
      cpf
    })

    return {
      student
    }
  }
}
