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
      { image: headerImg, width: 500 }, // Adjust the width as needed
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
            ...tableData,
          ],
        },
      },
      { image: footerImg, width: 500 }, // Adjust the width as needed
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
