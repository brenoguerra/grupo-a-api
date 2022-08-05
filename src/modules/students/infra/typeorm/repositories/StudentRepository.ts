import Student from '../entities/Student';

import IStudentRepository from 'modules/students/repositories/IStudentRepository';
import { ICreateStudentDTO } from 'modules/students/dtos/ICreateStudentDTO';
import { IUpdateStudentDTO } from 'modules/students/dtos/IUpdateStudentDTO';

import { getRepository, Repository } from 'typeorm';

export default class StudentRepository implements IStudentRepository {
  private ormRepository: Repository<Student>;

  constructor() {
    this.ormRepository = getRepository(Student)
  }

  public async create(data: ICreateStudentDTO): Promise<Student> {
    const student = await this.ormRepository.create(data);
    await this.ormRepository.save(student)

    return student;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete({ id })
    return;
  }

  public async save(data: IUpdateStudentDTO): Promise<Student> {
    return this.ormRepository.save(data)
  }

  public async findById(id: number): Promise<Student | undefined> {
    const student = await this.ormRepository.findOne({
      where: {
        id,
      }
    })

    return student || undefined
  }

  public async findByRA(ra: number): Promise<Student | undefined> {
    const student = await this.ormRepository.findOne({
      where: {
        ra,
      }
    })

    return student || undefined
  }

  public async list(page: number, limit: number): Promise<{ total: number; students: Student[]; }> {
    const [student, total] = await this.ormRepository.findAndCount({
      where: {},
      take: limit,
      skip: (page - 1) * limit
    })

    return {
      total: Math.ceil(total / limit) || 1,
      students: student
    }
  }
}
