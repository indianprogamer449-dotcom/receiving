import { useState } from 'react';
import { StudentRecord } from '../types';
import { Search, Printer, Trash2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StudentListProps {
  records: StudentRecord[];
  onPrint: (record: StudentRecord) => void;
  onDelete: (id: string) => void;
}

export default function StudentList({ records, onPrint, onDelete }: StudentListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = records.filter(record => 
    record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.fatherName.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-sans font-bold text-gray-900">Registered Students</h2>
          <p className="text-sm text-gray-500">{records.length} total records</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, adm no, or father name..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-400 uppercase text-[10px] font-bold tracking-widest">
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Father Name</th>
              <th className="px-6 py-4">Class</th>
              <th className="px-6 py-4">Adm No</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <AnimatePresence mode="popLayout">
              {filteredRecords.map((record) => (
                <motion.tr
                  key={record.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-gray-900">{record.studentName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{record.fatherName}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold text-gray-600">
                      {record.className}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{record.admissionNo}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">₹{record.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{record.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onPrint(record)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Print Receipt"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(record.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
            {filteredRecords.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                  No records found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
