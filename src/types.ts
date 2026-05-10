export type Gender = 'HE' | 'SHE';

export interface StudentRecord {
  id: string;
  studentName: string;
  fatherName: string;
  className: string;
  gender: Gender;
  admissionNo: string;
  amount: number;
  paymentMethod: string;
  date: string;
  createdAt: number;
}
