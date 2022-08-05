import FakeStudentRepository from "../repositories/fakes/FakeStudentRepository";
import DeleteStudentService from "./DeleteStudentService";

import AppError from "../../../shared/errors/AppError";

describe('DeleteStudent', () => {
  let fakeStudentRepository: FakeStudentRepository;
  let deleteStudent: DeleteStudentService;

  beforeEach(async () => {
    fakeStudentRepository = new FakeStudentRepository()

    deleteStudent = new DeleteStudentService(fakeStudentRepository)
  })

  it('should be able to throw error if the tried to delete student not exists', async () => {
    await expect(
      deleteStudent.execute({
        id: 1
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to delete a student', async () => {
    const student = await fakeStudentRepository.create({
      cpf: 123456789,
      email: 'john@doe.com',
      name: 'John Doe',
      ra: 123456
    })

    const { student: deletedStudent } = await deleteStudent.execute({
      id: student.id,
    })

    expect(student.id).toEqual(deletedStudent.id)

    const findDeletedStudent = await fakeStudentRepository.findById(student.id)
    expect(findDeletedStudent).toBeUndefined()
  })
});
