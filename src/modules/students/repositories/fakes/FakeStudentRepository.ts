import Student from "../../infra/typeorm/entities/Student";

import IStudentRepository from "../IStudentRepository";
import { ICreateStudentDTO } from "../../dtos/ICreateStudentDTO";
import { IUpdateStudentDTO } from "../../dtos/IUpdateStudentDTO";

export default class FakeStudentRepository implements IStudentRepository {
  private students: Student[] = [];

  public async create(data: ICreateStudentDTO): Promise<Student> {
    const student = new Student()

    Object.assign(student, {
      id: this.students.length + 1,
      name: data.name,
      email: data.email,
      ra: data.ra,
      cpf: data.cpf
    })

    this.students.push(student)

    return student
  }

  public async delete(id: number): Promise<void> {
    this.students = this.students.filter(student => student.id !== id)
  }

  public async save(data: IUpdateStudentDTO): Promise<Student> {
    const findIndex = this.students.findIndex(student => student.id === data.id)
    this.students[findIndex] = data;

    return data
  }

  public async findById(id: number): Promise<Student | undefined> {
    return this.students.find(student => student.id === id)
  }

  public async findByRA(ra: number): Promise<Student | undefined> {
    return this.students.find(student => student.ra === ra)
  }

  public async list(page: number, limit: number): Promise<{ total: number; students: Student[]; }> {
    const total = this.students.length
    const student = this.students.slice((page - 1) * limit, page * limit)

    return {
      total: Math.ceil(total / limit) || 1,
      students: student
    }
  }
}
