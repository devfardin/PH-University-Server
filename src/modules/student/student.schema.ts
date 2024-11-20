import { Schema, model } from 'mongoose';
import { Guardian, LocalGuardian, Student, Student, UserName } from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required:true },
});

const guardianSchema = new Schema<Guardian>({
    fatherName:{type:String, required:true},
    fatherOccupation:{type:String},
    fatherContact:{type:String},
    motherName:{type:String, required:true},
    motherOccupation:{type:String},
    motherContact:{type:String}
})

const localGuardianScheme = new Schema<LocalGuardian>({
    name:{type:String},
    occupation:{type:String},
    contact:{type:String},
    email:{type:String},
    address:{type:String}
})

const studentSchema = new Schema<Student>({
  id: { type: String, required: true },
  name: userNameSchema,
  phoneNumber: {type:String, required:true},
  email:{type:String, required:true},
  address:{type:String},
  gender:['male','female','others'],
  guardian:guardianSchema,
  localGuardian:localGuardianScheme,
  bloodGroup: ['A+','A-','B+','B-','AB+', 'AB-','O+','O-',],
  presentAddress:{type:String},
  permanentAddress:{type:String},
  profile:{type:String}
});

const Student = model<Student>('Student', studentSchema)