import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Make sure to set the workerSrc URL before using react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Resume = ({ pdfUrl }) => {
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
        setNumPages(nextNumPages);
    }

    return (
        <div className="pdf-container">
            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from({ length: numPages }, (_, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        width={300} // Set the width of the page (adjust as needed)
                    />
                ))}
            </Document>
            <p>Page {numPages} of {numPages}</p>
        </div>
    );
};

export default Resume;
