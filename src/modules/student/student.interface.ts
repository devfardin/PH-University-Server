import { Schema, model, connect } from 'mongoose';

export interface UserName {
    firstName: string;
    middleName: string;
    lastName:string;
}
export interface Guardian{
    fatherName: string;
    fatherOccupation:string;
    fatherContact:string;
    motherName: string;
    motherOccupation:string;
    motherContact:string
}
export interface LocalGuardian{
    name:string;
    occupation: string;
    contact:string;
    email:string;
    address:string
}

export interface Student {
    id:string;
    name:UserName;
    phoneNumber: string;
    email: string;
    address:string;
    gender: "male" | "female" | "others";
    guardian:Guardian;
    localGuardian:LocalGuardian;
    bloodGroup:'A+'|'A-'|'B+'|'B-'|'AB+'| 'AB-'| 'O+'| 'O-';
    presentAddress: string;
    permanentAddress:string;
    profile:string
}