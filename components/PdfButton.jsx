"use client";

import { Button } from "@mantine/core";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useState, useEffect } from "react";
import header from "../public/pdf_header.jpg";
import footer from "../public/pdf_footer.jpg";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function PdfButton({ invoice, s, d }) {
  const [headerImg, setHeaderImg] = useState("");
  const [footerImg, setFooterImg] = useState("");

  useEffect(() => {
    const get = async (imageSource, setImage) => {
      const imgDataUrl = await fetch(imageSource)
        .then((response) => response.blob())
        .then(
          (blob) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            })
        );

      const imgData = imgDataUrl;
      setImage(imgData);
    };

    get(header.src, setHeaderImg);
    get(footer.src, setFooterImg);
  }, []);

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
        serviceInformation?.date || d || "N/A",
        docId || "N/A",
        dropDetails?.dropReference1 || "N/A",
        pickupDetails?.selectedOriginDetails?.address ||
          pickupDetails?.pickupFrequentAddress?.address ||
          pickupDetails?.label ||
          "N/A",
        dropDetails?.selectedDestinationDetails?.address ||
          dropDetails?.dropFrequentAddress?.address ||
          dropDetails?.label ||
          "N/A",
        serviceInformation?.service || s || "N/A",
        `$${totalPrice || 0}`,
        "$10",
        `$${totalPrice !== undefined ? totalPrice + 10 : 10}`,
      ],
    ];

    return tableData;
  }

  const tableData = transformDataToTableFormat(invoice);
  var dd = {
    content: [
      { image: headerImg, width: 500, margin: [0, 0, 0, 20] },
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
              { text: "DATE", style: "tableHeader" },
              { text: "JOB NO", style: "tableHeader" },
              { text: "REF 1", style: "tableHeader" },
              { text: "FROM", style: "tableHeader" },
              { text: "TO", style: "tableHeader" },
              { text: "SERV", style: "tableHeader" },
              { text: "COST", style: "tableHeader" },
              { text: "GST", style: "tableHeader" },
              { text: "TOTAL", style: "tableHeader" },
            ],
            ...tableData.map((row) =>
              row.map((cell) => ({ text: cell, style: "tableCell" }))
            ),
          ],
        },
        layout: "headerLineOnly",
      },
     
      {
        text: "REMITTANCE ADVICE",
        style: "sectionHeader",
        margin: [0, 200, 0, 5],
      },
      {
        text: "Please make your payment to >>>",
        margin: [0, 0, 0, 10],
      },
      {
        text: [
          { text: "Account No: ", style: "infoS" },
          { text: invoice.userName, style: "infoText" },
          { text: " | Total this invoice: ", style: "infoS" },
          { text: `$${invoice.totalPrice}`, style: "infoText" },
          { text: " | Job Number: ", style: "infoS" },
          { text: invoice.docId, style: "infoText" },
        ],
      },
      {
        image: footerImg,
        width: 500,
        absolutePosition: { x: 50, y: 700 },
        margin: [0, 20, 0, 0],
      },
    ],
    styles: {
      tableHeader: {
        bold: true,
        fontSize: 12,
      },
      tableCell: {
        fontSize: 10,
      },
      sectionHeader: {
        bold: true,
        fontSize: 14,
      },
      infoS: {
        fontSize: 8, // Adjusted to 8 points
        bold: true,
      },
      infoText: {
        fontSize: 8, // Adjusted to 8 points
      },
    },
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
