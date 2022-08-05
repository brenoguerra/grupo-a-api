import FakeStudentRepository from "../repositories/fakes/FakeStudentRepository";
import CreateStudentService from "./CreateStudentService";

import AppError from "../../../shared/errors/AppError";

describe('CreateStudent', () => {
  let fakeStudentRepository: FakeStudentRepository;
  let createStudent: CreateStudentService;

  beforeEach(async () => {
    fakeStudentRepository = new FakeStudentRepository()

    createStudent = new CreateStudentService(fakeStudentRepository)
  })

  it('should be able to throw error if sent ra is already in use', async () => {
    await fakeStudentRepository.create({
      cpf: 123456789,
      email: 'john@doe.com',
      name: 'John Doe',
      ra: 123456
    })

    await expect(
      createStudent.execute({
        cpf: '123456789',
        email: 'john@doe.com',
        name: 'John Doe',
        ra: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to create a student', async () => {
    const { student } = await createStudent.execute({
      cpf: '123456789',
      email: 'john@doe.com',
      name: 'John Doe',
      ra: '123456'
    })

    expect(student).toHaveProperty('id')
  })
});
