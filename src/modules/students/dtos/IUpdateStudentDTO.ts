import Student from '../infra/typeorm/entities/Student'

export class IUpdateStudentDTO extends Student {
  id: number
  name: string
  email: string
}
