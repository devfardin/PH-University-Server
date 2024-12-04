export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type TAcademicSemsterName = 'Autumn' | 'Summar' | 'fall';
export type TAcademicSemsterCode = '01' | '02' | '03';
export interface TAcademicSemseter {
  name: TAcademicSemsterName;
  code: TAcademicSemsterCode;
  year: Date;
  startMonth: TMonths;
  endMonth: TMonths;
}
