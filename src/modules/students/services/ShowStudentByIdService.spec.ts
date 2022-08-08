import FakeStudentRepository from "../repositories/fakes/FakeStudentRepository";
import ShowStudentByIdService from "./ShowStudentByIdService";

import AppError from "../../../shared/errors/AppError";

describe('ShowStudentById', () => {
  let fakeStudentRepository: FakeStudentRepository;
  let showStudentById: ShowStudentByIdService;

  beforeEach(async () => {
    fakeStudentRepository = new FakeStudentRepository()

    showStudentById = new ShowStudentByIdService(fakeStudentRepository)
  })

  it('should be able to throw error if the tried to show student not exists', async () => {
    await expect(
      showStudentById.execute({
        id: 1
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to show a student by id', async () => {
    const student = await fakeStudentRepository.create({
      cpf: '123456789',
      email: 'john@doe.com',
      name: 'John Doe',
      ra: '123456'
    })

    const { student: showedStudent } = await showStudentById.execute({
      id: student.id,
    })

    expect(student.id).toEqual(showedStudent.id)
  })
});
