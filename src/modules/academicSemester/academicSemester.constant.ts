import {
  TAcademicSemesterNameCodeMapper,
  TAcademicSemsterCode,
  TAcademicSemsterName,
  TMonths,
} from './academicSemester.interface';

export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const AcademicSemsterName: TAcademicSemsterName[] = [
  'Autumn',
  'Summar',
  'fall',
];
export const AcademicSemseterCode: TAcademicSemsterCode[] = ['01', '02', '03'];

export const AcademicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Autumn: '01',
  Summar: '02',
  Fall: '03',
};
