"use client";
import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import headerImg from "../public/pdf_header.jpg";
import footerImg from "../public/pdf_footer.jpg";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfButton = ({ invoice, s, d }) => {
  const [headerImage, setHeaderImage] = useState("");
  const [footerImage, setFooterImage] = useState("");

  useEffect(() => {
    const getImageDataUrl = async (imageSource, setImage) => {
      try {
        const response = await fetch(imageSource);
        const blob = await response.blob();

        const imageDataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });

        setImage(imageDataUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    getImageDataUrl(headerImg.src, setHeaderImage);
    getImageDataUrl(footerImg.src, setFooterImage);
  }, []);

  const transformDataToTableFormat = (invoice) => {
    const {
      progressInformation,
      docId,
      pickupDetails,
      dropDetails,
      serviceInformation,
      totalPrice,
    } = invoice;

    const truncateString = (inputString) => (inputString.length > 10 ? inputString.slice(0, 10) + '...' : inputString);

    const truncateAddress = (address) => truncateString(address);

    return [
      [
        serviceInformation?.date || "N/A",
        docId || "N/A",
        dropDetails?.dropReference1 || "N/A",
        truncateAddress(pickupDetails?.selectedOriginDetails?.address ||
          pickupDetails?.pickupFrequentAddress?.address ||
          pickupDetails?.label ||
          "N/A"),
        truncateAddress(dropDetails?.selectedDestinationDetails?.address ||
          dropDetails?.dropFrequentAddress?.address ||
          dropDetails?.label ||
          "N/A"),
        serviceInformation?.service || "N/A",
        `$${totalPrice || 0}`,
        "$0",
        `$${totalPrice !== undefined ? totalPrice : 0}`,
      ],
    ];
  };

  const tableData = transformDataToTableFormat(invoice);

  const pdfContent = {
    content: [
      // Header
      { image: headerImage, width: 500, margin: [0, 0, 0, 20] },

      // Content
      {
        table: {
          headerRows: 1,
          widths: Array(9).fill("auto"),
          body: [
            ["DATE", "JOB NO", "REF 1", "FROM", "TO", "SERV", "COST", "GST", "TOTAL"],
            ...tableData.map((row) =>
              row.map((cell) => ({ text: cell, style: "tableCell" }))
            ),
          ],
        },
        layout: "headerLineOnly",
      },

      // Footer

      {
        text: "Terms strictly apply.",
        style: "sectionHeader",
        margin: [0, 10, 0, 0],
        absolutePosition: { x: 60, y: 600 },
      },
      {
        text:
          "All banandions by Jet Counters (Sydney) Phy List ander their and hasagents subject to our standard terms & conditionsof correct insurance pability notbeen arranged or included unless specially requested beforehand and the appropriate premium",
        margin: [0, 10, 0, 0],
        absolutePosition: { x: 60, y: 620 },
        style: "infoText",

      },


      // Direct Transport Solutions
      {
        text: "Direct Transport Solutions Pty Ltd ",
        style: "sectionHeader",
        margin: [0, 10, 0, 0],
        width: "40vw",
        absolutePosition: { x: 60, y: 650 },
      },
      {
        text: [
          "ABN 87 658 348 808",
          "| 1353 The Horsley Dr Wetherill Park NSW 2164 ",
          "| Phone: (02) 9188 0894",
          "| Email: bookings@directtransport.com.au",
        ],
        style: "infoText",
        margin: [60, 10, 0, 0],
        absolutePosition: { x: 60, y: 670 },
      },

      // Remittance Advice
      {
        text: "REMITTANCE ADVICE",
        style: "sectionHeader",
        margin: [50, 10, 0, 0],
        absolutePosition: { x: 60, y: 700 },
      },
      {
        text: "Please make your payment to >>>",
        margin: [0, 10, 0, 0],
        absolutePosition: { x: 60, y: 720 },
        style: "smallText",
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
        margin: [0, 10, 0, 0],
        absolutePosition: { x: 60, y: 740 },
      },
    ],
    styles: {
      tableCell: {
        fontSize: 10,
      },
      smallText: {
        fontSize: 8,
      },
      sectionHeader: {
        bold: true,
        fontSize: 14,
      },
      infoS: {
        fontSize: 8,
        bold: true,
      },
      infoText: {
        fontSize: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
      },
    },
  };


  const createPdf = () => {
    const pdfGenerator = pdfMake.createPdf(pdfContent);
    pdfGenerator.download();
  };

  return (
    <Button variant="filled" color="#F14902" onClick={createPdf}>
      PDF
    </Button>
  );
};

export default PdfButton;
