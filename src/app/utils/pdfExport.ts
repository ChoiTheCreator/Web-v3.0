import jsPDF from "jspdf";

export interface PDFQuestion {
  practiceNumber: number;
  practiceType: "OX" | "SHORT";
  content: string;
  result: string;
  solution: string;
}

export async function exportQuestionsToPDF(
  questions: PDFQuestion[],
  fileName = "selected-questions.pdf"
) {
  const fontUrl = "/fonts/NotoSansKR-VariableFont_wght.ttf";
  const response = await fetch(fontUrl);
  const buffer = await response.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const notoSansKRBase64 = btoa(binary);

  const doc = new jsPDF();
  doc.addFileToVFS("NotoSansKR-VariableFont_wght.ttf", notoSansKRBase64);
  doc.addFont("NotoSansKR-VariableFont_wght.ttf", "NotoSansKR", "normal");
  doc.setFont("NotoSansKR");
  doc.setFontSize(10);

  let y = 20;
  const lineHeight = 6;
  questions.forEach((q, idx) => {
    doc.text(
      `문제 ${q.practiceNumber} [${
        q.practiceType === "OX" ? "O/X" : "단답형"
      }]`,
      10,
      y
    );
    y += lineHeight;
    doc.text(`문제: ${q.content}`, 10, y);
    y += lineHeight;
    doc.text(`답: ${q.result}`, 10, y);
    y += lineHeight;
    if (q.solution) {
      doc.text("해설:", 10, y);
      y += lineHeight;
      const wrappedSolutionLines = doc.splitTextToSize(q.solution, 170);
      wrappedSolutionLines.forEach((line: string) => {
        doc.text(line, 16, y);
        y += lineHeight;
      });
    }
    y += 2;
    if (y > 270 && idx !== questions.length - 1) {
      doc.addPage();
      doc.setFont("NotoSansKR");
      doc.setFontSize(10);
      y = 20;
    }
  });
  doc.save(fileName);
}
