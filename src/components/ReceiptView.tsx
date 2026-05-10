import { StudentRecord } from './types';
import { Printer, X } from 'lucide-react';

interface ReceiptViewProps {
  record: StudentRecord;
  onClose: () => void;
}

export default function ReceiptView({ record, onClose }: ReceiptViewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 print:p-0 print:bg-white print:relative">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col print:shadow-none print:w-full print:max-w-none print:rounded-none">
        {/* Header - Hidden on print */}
        <div className="px-6 py-4 border-bottom border-gray-100 flex items-center justify-between print:hidden">
          <h2 className="font-sans font-semibold text-gray-800">Preview Certificate</h2>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Content */}
        <div id="certificate-content" className="p-12 md:p-16 text-gray-800 font-serif leading-relaxed print:p-8 print:text-black">
          <div className="text-right mb-12">
            <p className="text-lg">Date:- {record.date}</p>
          </div>

          <div className="text-center mb-16 underline decoration-1 underline-offset-8">
            <h1 className="text-3xl font-bold tracking-wide">To Whom So Ever It May Concern</h1>
          </div>

          <div className="text-xl space-y-6 text-justify">
            <p>
              This is to certify that <span className="font-bold uppercase">{record.studentName}</span> {record.gender === 'SHE' ? 'D/O' : 'S/O'} <span className="font-bold uppercase">{record.fatherName}</span> has taken admission in <span className="font-bold">{record.className}</span> Classes with Sri Chaitanya, Chandigarh, Sec-34-A, SCO:369-370. <span className="font-bold">{record.gender}</span> was enrolled with Admission No:- <span className="font-bold">{record.admissionNo}</span>. We received amount Rs.<span className="font-bold">{record.amount}/-</span> {record.paymentMethod} on Date:- {record.date}.
            </p>
          </div>

          <div className="mt-24 flex flex-col items-start gap-1">
            <p className="text-lg">Designation</p>
            <div className="w-32 h-12 flex items-end justify-start border-b border-gray-400 mb-2">
              {/* Signature space */}
            </div>
            <p className="font-bold text-lg">Accountant</p>
            <p className="text-lg">Sri Chaitanya Institute</p>
            <p className="text-lg">Chandigarh</p>
          </div>
        </div>
      </div>
      
      {/* Print styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #certificate-content, #certificate-content * {
            visibility: visible;
          }
          #certificate-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          @page {
            size: auto;
            margin: 20mm;
          }
        }
      `}</style>
    </div>
  );
}
