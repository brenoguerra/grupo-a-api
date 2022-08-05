import FakeStudentRepository from "../repositories/fakes/FakeStudentRepository";
import ListStudentService from "./ListStudentService";

describe('ListStudent', () => {
  let fakeStudentRepository: FakeStudentRepository;
  let listStudent: ListStudentService;

  beforeEach(async () => {
    fakeStudentRepository = new FakeStudentRepository()
    listStudent = new ListStudentService(fakeStudentRepository)

    for (let i = 0; i < 25; i++) {
      await fakeStudentRepository.create({
        cpf: Math.random() * (100 - 10) + 10,
        email: `email${i}@mail.com`,
        name: `User ${i}`,
        ra: Math.random() * (100 - 10) + 10,
      })
    }
  })

  it('should be able to show paginated students', async () => {
    const students = await listStudent.execute({
      limit: 15,
      page: 1
    })

    expect(students.students).toHaveLength(15)
    expect(students.total).toBe(2)
  })

  it('should be able to show paginated students at second page', async () => {
    const students = await listStudent.execute({
      limit: 15,
      page: 2
    })

    expect(students.students).toHaveLength(10)
    expect(students.total).toBe(2)
  })

  it('should be able to show all students in one page', async () => {
    const students = await listStudent.execute({
      limit: 30,
      page: 1
    })

    expect(students.students).toHaveLength(25)
    expect(students.total).toBe(1)
  })
});
