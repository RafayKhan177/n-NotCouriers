// import { generate } from "@pdfme/generator";

// const generateAndOpenPDF = async (template, data) => {
//   console.log(data);
//   try {
//     const pdf = await generate({
//       content: (
//         <div>
//           <img
//             src={data.image}
//             alt="Landscape"
//             style={{ width: "100%", height: "auto" }}
//           />
//           <div style={{ marginTop: "20px" }}>
//             <p>Date: {data.date}</p>
//             <p>Job No: {data.jobNo}</p>
//             <p>Ref 1: {data.ref1}</p>
//             <p>Ref 2: {data.ref2}</p>
//             <p>From: {data.from}</p>
//             <p>To: {data.to}</p>
//             <p>Service: {data.service}</p>
//             <p>Cost: {data.cost}</p>
//             <p>GST: {data.gst}</p>
//             <p>Total: {data.total}</p>
//           </div>
//         </div>
//       ),
//       // Additional PDF generation parameters if needed
//     });

//     // Open the generated PDF in a new window or tab
//     const blob = new Blob([pdf], { type: "application/pdf" });
//     const url = URL.createObjectURL(blob);
//     window.open(url, "_blank");
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//   }
// };

// export default generateAndOpenPDF;
