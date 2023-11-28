"use client";

import { Button } from "@mantine/core";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useState, useEffect } from "react";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function PdfButton({ invoice, s, d }) {
  const [imageDataUrl, setImageDataUrl] = useState(null);

  function transformDataToTableFormat(invoice) {
    const {
      progressInformation,
      docId,
      pickupDetails,
      dropDetails,
      serviceInformation,
      totalPrice,
    } = invoice;

    const tableData = [
      [
        serviceInformation?.date || d || "N/A", // Date
        docId || "N/A", // Invoice ID
        dropDetails?.dropReference1 || "N/A", // Reference
        pickupDetails?.selectedOriginDetails?.address ||
          pickupDetails?.pickupFrequentAddress?.address ||
          pickupDetails?.label ||
          "N/A", // From Location
        dropDetails?.selectedDestinationDetails?.address ||
          dropDetails?.dropFrequentAddress?.address ||
          dropDetails?.label ||
          "N/A", // To Location
        serviceInformation?.service || s || "N/A", // Service
        `$${totalPrice || 0}`, // Total Price
        "$10", // Additional cost placeholder (adjust as needed)
        `$${totalPrice !== undefined ? totalPrice + 10 : 10}`, // Total with additional cost
      ],
    ];

    return tableData;
  }

  // Call the function with the provided invoice data
  const tableData = transformDataToTableFormat(invoice);

  // Log the result
  console.log(tableData);

  useEffect(() => {
    // Fetch the image from the URL and convert it to a data URL
    const fetchAndConvertImage = async () => {
      console.log(invoice, "hi");
      try {
        const response = await fetch(
          "https://images.unsplash.com/photo-1682685797208-c741d58c2eff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
    <Button variant="filled" color="indigo" onClick={createPdf}>
      PDF
    </Button>
  );
}
