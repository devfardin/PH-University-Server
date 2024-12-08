import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};
const getAllAcademicDepartment = async () => {
  const result = AcademicDepartmentModel.find();
  return result;
};
const getSingeAcademicDepartment = async (id: string) => {
  const result = AcademicDepartmentModel.findById(id);
  return result;
};
const updateAcademcDepartment = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartmentModel.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
  return result;
};

export const AcademicDepartmentSerives = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartment,
  getSingeAcademicDepartment,
  updateAcademcDepartment,
};
