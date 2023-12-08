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

    return [
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
  };

  const tableData = transformDataToTableFormat(invoice);

  const pdfContent = {
    content: [
      { image: headerImage, width: 500, margin: [0, 0, 0, 20] },
      {
        table: {
          headerRows: 1,
          widths: Array(9).fill("auto"),
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
            ...tableData.map((row) =>
              row.map((cell) => ({ text: cell, style: "tableCell" }))
            ),
          ],
        },
        layout: "headerLineOnly",
      },
      {
        image: footerImage,
        width: 500,
        absolutePosition: { x: 50, y: 560 },
        margin: [0, 10, 0, 0],
      },
      {
        text: "REMITTANCE ADVICE",
        style: "sectionHeader",
        margin: [0, 10, 0, 0],
        absolutePosition: { x: 60, y: 670 },
      },
      {
        text: "Please make your payment to >>>",
        margin: [0, 10, 0, 0],
        absolutePosition: { x: 60, y: 690 },
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
        absolutePosition: { x: 60, y: 700 },
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
        fontSize: 8, // Adjusted to 8 points
        bold: true,
      },
      infoText: {
        fontSize: 8, // Adjusted to 8 points
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
