import AppError from '../../app/errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistrantion } from './semesterRegistration.interface';
import httpStatus from 'http-status';
import { SemesterRegistrationModel } from './semesterRegistration.model';
import QueryBuilder from '../../app/builder/QueryBuilder';
const createSemesterRegistratiiononIntoDB = async (
  payload: TSemesterRegistrantion,
) => {
  const academicSemester = payload?.academicSemester;

  // check if there any gegistered semester that is alrady 'UPCOMING' | 'ONGOING'
  const isThereAnyUpcomingOngoingSemester =
    await SemesterRegistrationModel.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });
  if (isThereAnyUpcomingOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOngoingSemester?.status} Register Semester`,
    );
  }

  // check if the semester is not esist
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Semester not Found');
  }

  // check already academic semester exist
  const isSemesterRegistrationExists = await SemesterRegistrationModel.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(httpStatus.CONFLICT, 'This Semester is Already  Exists');
  }
  const result = await SemesterRegistrationModel.create(payload);
  return result;
};
// get all semester registration
const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistrationModel.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};
// get  single semester registration from db
const getSingleRegiistrationFromDB = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id);
  return result;
};
const updateSemesterRegistration = async (
  id: string,
  payload: Partial<TSemesterRegistrantion>,
) => {
  // check is the semester is exist
  const isSemesterRegistrationExists =
    await SemesterRegistrationModel.findById(id);
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Invalid Semester Registration id',
    );
  }
  // If the request semester  registraction is EncodedAudioChunk, will will not update anything
  const currentSemesterStatus = isSemesterRegistrationExists.status;
  
  if (currentSemesterStatus === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ENDED`,
    );
  }
  if(currentSemesterStatus === )

};

export const semesterRegistrationService = {
  createSemesterRegistratiiononIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleRegiistrationFromDB,
  updateSemesterRegistration,
};
