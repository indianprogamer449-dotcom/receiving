import React, { useState } from 'react';
import { StudentRecord, Gender } from '../types';
import { User, Users, BookOpen, Hash, IndianRupee, Calendar, CreditCard } from 'lucide-react';

interface StudentFormProps {
  onSave: (record: StudentRecord) => void;
}

export default function StudentForm({ onSave }: StudentFormProps) {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    className: '',
    gender: 'SHE' as Gender,
    admissionNo: '',
    amount: '',
    paymentMethod: 'CARD',
    date: new Date().toLocaleDateString('en-GB').split('/').join('-') // dd-mm-yyyy format
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.fatherName || !formData.admissionNo || !formData.amount) {
      alert('Please fill in all required fields');
      return;
    }

    const newRecord: StudentRecord = {
      id: crypto.randomUUID(),
      studentName: formData.studentName,
      fatherName: formData.fatherName,
      className: formData.className,
      gender: formData.gender,
      admissionNo: formData.admissionNo,
      amount: parseFloat(formData.amount),
      paymentMethod: formData.paymentMethod,
      date: formData.date,
      createdAt: Date.now()
    };

    onSave(newRecord);
    
    // Reset form
    setFormData({
      studentName: '',
      fatherName: '',
      className: '',
      gender: 'SHE',
      admissionNo: '',
      amount: '',
      paymentMethod: 'CARD',
      date: new Date().toLocaleDateString('en-GB').split('/').join('-')
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
      
      <h2 className="text-2xl font-sans font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Users className="w-6 h-6 text-blue-600" />
        New Admission
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Student Name</label>
          <div className="relative group">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="e.g. Anwesha Dogra"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 focus:bg-white focus:border-blue-500 transition-all outline-none"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Father's Name</label>
          <div className="relative group">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              placeholder="e.g. Arun Dogra"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 focus:bg-white focus:border-blue-500 transition-all outline-none"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Class</label>
          <div className="relative group">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              name="className"
              value={formData.className}
              onChange={handleChange}
              placeholder="e.g. 11th"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 focus:bg-white focus:border-blue-500 transition-all outline-none"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">He / She</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFormData(p => ({ ...p, gender: 'SHE' }))}
              className={`flex-1 py-3 rounded-xl border transition-all font-medium ${
                formData.gender === 'SHE'
                  ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                  : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-gray-100'
              }`}
            >
              SHE
            </button>
            <button
              type="button"
              onClick={() => setFormData(p => ({ ...p, gender: 'HE' }))}
              className={`flex-1 py-3 rounded-xl border transition-all font-medium ${
                formData.gender === 'HE'
                  ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                  : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-gray-100'
              }`}
            >
              HE
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Admission No</label>
          <div className="relative group">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              name="admissionNo"
              value={formData.admissionNo}
              onChange={handleChange}
              placeholder="e.g. 268336502"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 focus:bg-white focus:border-blue-500 transition-all outline-none"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Amount (Rs.)</label>
          <div className="relative group">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="e.g. 35167"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 focus:bg-white focus:border-blue-500 transition-all outline-none"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Payment Method</label>
          <div className="relative group">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 focus:bg-white focus:border-blue-500 transition-all outline-none appearance-none"
            >
              <option value="CARD">CARD</option>
              <option value="CASH">CASH</option>
              <option value="UPI">UPI / ONLINE</option>
              <option value="CHEQUE">CHEQUE</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Date</label>
          <div className="relative group">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="dd-mm-yyyy"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 focus:bg-white focus:border-blue-500 transition-all outline-none"
              required
            />
          </div>
        </div>

        <div className="md:col-span-2 pt-4">
          <button
            type="submit"
            className="w-full py-4 bg-gray-900 text-white rounded-xl font-sans font-bold tracking-wide hover:bg-black transition-all shadow-lg active:scale-[0.98]"
          >
            SAVE RECORD & GENERATE RECEIPT
          </button>
        </div>
      </form>
    </div>
  );
}
