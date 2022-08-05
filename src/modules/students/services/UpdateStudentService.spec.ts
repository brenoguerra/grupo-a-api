import FakeStudentRepository from "../repositories/fakes/FakeStudentRepository";
import UpdateStudentService from "./UpdateStudentService";

import AppError from "../../../shared/errors/AppError";

describe('UpdateStudent', () => {
  let fakeStudentRepository: FakeStudentRepository;
  let updateStudent: UpdateStudentService;

  beforeEach(async () => {
    fakeStudentRepository = new FakeStudentRepository()

    updateStudent = new UpdateStudentService(fakeStudentRepository)
  })

  it('should be able to throw error if the tried to update student not exists', async () => {
    await expect(
      updateStudent.execute({
        id: 1,
        email: 'john@doe.com',
        name: 'John Doe',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update a student', async () => {
    const originalStudent = await fakeStudentRepository.create({
      cpf: 123456789,
      email: 'john@doe.com',
      name: 'John Doe',
      ra: 123456
    })

    const { student: updatedStudent } = await updateStudent.execute({
      id: originalStudent.id,
      email: 'johndoe@mail.com',
      name: 'John Doe Jr',
    })

    expect(originalStudent.id).toEqual(updatedStudent.id)
    expect(originalStudent.name).not.toEqual(updatedStudent.name)
    expect(originalStudent.email).not.toEqual(updatedStudent.email)
    expect(originalStudent.cpf).not.toEqual(updatedStudent.cpf)
    expect(originalStudent.ra).toEqual(updatedStudent.ra)
  })
});
