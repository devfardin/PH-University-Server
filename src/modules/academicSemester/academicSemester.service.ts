import QueryBuilder from '../../app/builder/QueryBuilder';
import {
  AcademicSemesterNameCodeMapper,
  academicSemesterSearchAbleFields,
} from './academicSemester.constant';
import { TAcademicSemseter } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemseter) => {
  // Checking for Academic semester code and name
  if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};
// get All Semester from Database
const getAllAcademicSemesterFromDB = async (query: Record<string, unknown>) => {
  const academicSemesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .search(academicSemesterSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await academicSemesterQuery.modelQuery;
  return result;
};

// Get Single Academic Semester form Database
const getSingleSemeserFromDB = async (Id: string) => {
  const result = AcademicSemester.findById(Id);
  return result;
};
// upate single academic semester from Database
const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemseter>,
) => {
  if (
    payload.name &&
    payload.code &&
    AcademicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester code');
  }
  const result = await AcademicSemester.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleSemeserFromDB,
  updateAcademicSemesterIntoDB,
};
