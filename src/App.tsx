import { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import ReceiptView from './components/ReceiptView';
import { StudentRecord } from './types';
import { GraduationCap } from 'lucide-react';

export default function App() {
  const [records, setRecords] = useState<StudentRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<StudentRecord | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Load records from localStorage on initial render
  useEffect(() => {
    const saved = localStorage.getItem('student_records');
    if (saved) {
      try {
        setRecords(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse records', e);
      }
    }
    setIsReady(true);
  }, []);

  // Save records to localStorage whenever they change
  useEffect(() => {
    if (isReady) {
      localStorage.setItem('student_records', JSON.stringify(records));
    }
  }, [records, isReady]);

  const handleSaveRecord = (record: StudentRecord) => {
    setRecords(prev => [...prev, record]);
    setSelectedRecord(record); // Auto-show receipt after save
  };

  const handleDeleteRecord = (id: string) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setRecords(prev => prev.filter(r => r.id !== id));
    }
  };

  const handlePrint = (record: StudentRecord) => {
    setSelectedRecord(record);
  };

  if (!isReady) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center shadow-xl shadow-gray-200">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Institute Manager</h1>
              <p className="text-gray-500 font-medium tracking-wide text-sm flex items-center gap-1.5 uppercase opacity-80">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                Admission & Fee Records
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex flex-col items-end">
            <span className="text-2xl font-bold text-gray-900">₹{records.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Fees Collected</span>
          </div>
        </header>

        {/* Dashboard Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 2xl:col-span-4 sticky top-8">
            <StudentForm onSave={handleSaveRecord} />
            
            <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-xl shadow-blue-100 overflow-hidden relative group">
              <div className="relative z-10">
                <p className="text-xs font-bold opacity-70 uppercase tracking-widest mb-1">Active Institute</p>
                <h3 className="text-xl font-bold mb-4">Sri Chaitanya Institute</h3>
                <div className="flex items-center justify-between">
                  <div className="text-xs space-y-1 opacity-80">
                    <p>Sec-34-A, SCO: 369-370</p>
                    <p>Chandigarh</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{records.length}</p>
                    <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Stud. Enrolled</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500" />
            </div>
          </div>

          <div className="lg:col-span-7 2xl:col-span-8">
            <StudentList 
              records={records} 
              onPrint={handlePrint} 
              onDelete={handleDeleteRecord} 
            />
          </div>
        </main>

        <footer className="pt-12 pb-8 border-t border-gray-100 flex justify-between items-center text-xs font-medium text-gray-400 uppercase tracking-widest">
          <p>© 2026 Institute Records System</p>
          <p>Export Data (CSV)</p>
        </footer>
      </div>

      {/* Modal View for Receipt */}
      {selectedRecord && (
        <ReceiptView 
          record={selectedRecord} 
          onClose={() => setSelectedRecord(null)} 
        />
      )}
    </div>
  );
}
