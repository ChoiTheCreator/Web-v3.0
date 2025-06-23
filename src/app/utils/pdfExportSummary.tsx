import React from "react";
import { Document, Page, Text, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "SpoqaHanSans",
  src: "https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf",
});

export const summaryPdfStyles = StyleSheet.create({
  page: {
    fontFamily: "SpoqaHanSans",
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  content: {
    fontSize: 12,
    lineHeight: 1.5,
  },
});

export const SummaryPDFDocument = ({ summary }: { summary: string }) => (
  <Document>
    <Page size="A4" style={summaryPdfStyles.page}>
      <Text style={summaryPdfStyles.title}>Summary Document</Text>
      <Text style={summaryPdfStyles.content}>{summary}</Text>
    </Page>
  </Document>
);
