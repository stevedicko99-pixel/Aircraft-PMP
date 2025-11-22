import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ReportGenerator: React.FC = () => {

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("Maintenance Report", 14, 20);
    autoTable(doc, {
      head: [['Aircraft', 'Component', 'Status', 'Date']],
      body: [
        ['A320', 'Engine', 'Operational', '2024-05-01'],
        ['B737', 'Wing', 'Needs Maintenance', '2024-04-28'],
      ],
    });

    doc.save('maintenance_report.pdf');
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Report Generator</h3>
      <button
        onClick={generatePDF}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Generate PDF Report
      </button>
    </div>
  );
};

export default ReportGenerator;
