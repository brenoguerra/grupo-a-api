import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateStudentService from "../../../services/CreateStudentService";
import DeleteStudentService from "../../../services/DeleteStudentService";
import ListStudentService from "../../../services/ListStudentService";
import UpdateStudentService from "../../../services/UpdateStudentService";
import ShowStudentByIdService from "../../../services/ShowStudentByIdService";

export default class StudentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf, email, name, ra } = request.body;

    const createStudent = container.resolve(CreateStudentService)

    const student = await createStudent.execute({
      cpf,
      email,
      name,
      ra,
    })

    return response.json(student)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteStudent = container.resolve(DeleteStudentService)

    const student = await deleteStudent.execute({ id: Number(id) })

    return response.json(student)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showStudent = container.resolve(ShowStudentByIdService)

    const student = await showStudent.execute({ id: Number(id) })

    return response.json(student)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page, limit } = request.query

    const listStudents = container.resolve(ListStudentService)

    const students = await listStudents.execute({
      page: Number(page) || 1,
      limit: Number(limit) || 20
    })


    return response.json(students)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;

    const updateStudent = container.resolve(UpdateStudentService)

    const student = await updateStudent.execute({
      id: Number(id),
      email,
      name
    })

    return response.json(student)
  }
}
