type TMonthName =
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
export interface TAcademicSemseter {
  name: 'Autumn' | 'Summar' | 'fall';
  code: '01' | '02' | '03';
  year: Date;
  startMonth: TMonthName;
  endMonth: TMonthName;
}
