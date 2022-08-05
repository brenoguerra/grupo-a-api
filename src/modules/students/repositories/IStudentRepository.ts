import Student from "../infra/typeorm/entities/Student";
import { ICreateStudentDTO } from "../dtos/ICreateStudentDTO";
import { IUpdateStudentDTO } from "../dtos/IUpdateStudentDTO";

export default interface IStudentRepository {
  create(data: ICreateStudentDTO): Promise<Student>
  save(data: IUpdateStudentDTO): Promise<Student>
  delete(id: number): Promise<void>
  findById(id: number): Promise<Student | undefined>
  findByRA(ra: number): Promise<Student | undefined>
  list(page: number, limit: number): Promise<{ total: number, students: Student[] }>
}
