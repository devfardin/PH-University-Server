import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};
// get All Academic Faculty form Database
const getALLAcademicFacultyFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
// get single academic faculty form database
const getSingleAcademicFacultyFromDB = async (facultyId: string) => {
  const result = await AcademicFaculty.findById(facultyId);
  return result;
};
// update academic faculty into database
const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
// Delete academic faculty in database
const deleteAcademicFacultyIntoDB = async (facultyId: string) => {
  const result = await AcademicFaculty.deleteOne({ _id: facultyId });
  return result;
};

export const academicFacultyServices = {
  createAcademicFacultyIntoDB,
  getALLAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
  deleteAcademicFacultyIntoDB,
};
