import { generatePdf } from "@pdfme/generator";

const YourComponent = () => {
  // Your component logic

  const generatePDF = async () => {
    try {
      // Use the generatePdf function from the library
      const pdf = await generatePdf(/* Your PDF generation parameters */);
      // Handle the generated PDF
      console.log(pdf);
    } catch (error) {
      // Handle errors during PDF generation
      console.error("Error generating PDF:", error);
    }
  };

  // Your component JSX

  return (
    <div>
      {/* Your component content */}
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default YourComponent;
