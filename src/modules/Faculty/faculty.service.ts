import QueryBuilder from '../../app/builder/QueryBuilder';
import { FacultySearchableFields } from './faculty.constant';
import { FacultyModel } from './faculty.model';

const allFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    FacultyModel.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await facultyQuery.modelQuery;
  return result;
};
export const facultyService = {
  allFacultiesFromDB,
};
