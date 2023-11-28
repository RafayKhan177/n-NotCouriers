"use client";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useState, useEffect } from "react";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function page() {
  const [url, setUrl] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState(null);

  useEffect(() => {
    // Fetch the image from the URL and convert it to a data URL
    const fetchAndConvertImage = async () => {
      try {
        const response = await fetch(
          "https://firebasestorage.googleapis.com/v0/b/couriers-946ec.appspot.com/o/headerPDF.jpg?alt=media&token=c9eb818f-6232-4768-8a4c-a34261486792"
        );
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageDataUrl(reader.result);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error fetching or converting image:", error);
      }
    };

    fetchAndConvertImage();
  }, []); // Run only once when the component mounts

  // Fake data for the table
  const tableData = [
    [
      "2023-11-28",
      "12345",
      "Ref123",
      "From Location",
      "To Location",
      "Service A",
      "$100",
      "$10",
      "$110",
    ],
    // Add more rows as needed
  ];

  var dd = {
    content: [
      { image: imageDataUrl, width: 150 }, // Use the data URL here
      " ", // Add some space between the image and the table
      {
        table: {
          headerRows: 1,
          widths: [
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
          ],
          body: [
            [
              "DATE",
              "JOB NO",
              "REF 1",
              "FROM",
              "TO",
              "SERV",
              "COST",
              "GST",
              "TOTAL",
            ],
            ...tableData, // Add the fake data rows
          ],
        },
      },
    ],
  };

  const createPdf = () => {
    const pdfGenerator = pdfMake.createPdf(dd);
    pdfGenerator.download();
  };

  return (
    <div>
      <button onClick={createPdf}>pdf</button>
      {url && <div>{url}</div>}
    </div>
  );
}
