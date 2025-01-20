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
  'Summer',
  'Fall',
];
export const AcademicSemseterCode: TAcademicSemsterCode[] = ['01', '02', '03'];

export const AcademicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemesterSearchAbleFields = [
  'name',
  'year',
  'startMonth',
  'endMonth',
];
