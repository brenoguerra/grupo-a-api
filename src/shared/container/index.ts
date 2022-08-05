import { container, delay } from "tsyringe";

import IStudentRepository from "../../modules/students/repositories/IStudentRepository";
import StudentRepository from "../../modules/students/infra/typeorm/repositories/StudentRepository";

container.registerSingleton<IStudentRepository>('StudentRepository', delay(() => StudentRepository))
