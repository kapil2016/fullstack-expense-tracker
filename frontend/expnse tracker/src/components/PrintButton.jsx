import React, { useRef } from 'react';

const PrintButton = ({ contentToPrint }) => {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const contentToPrintClone = contentToPrint.cloneNode(true);

    printWindow.document.body.appendChild(contentToPrintClone);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div>
      <button onClick={handlePrint}>Print</button>
      <div ref={printRef} style={{ display: 'none' }}>
        {contentToPrint}
      </div>
    </div>
  );
};

export default PrintButton;
