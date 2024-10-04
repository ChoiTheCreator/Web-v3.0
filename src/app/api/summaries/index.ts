import axios from "axios";

interface PostSummaryProps {
  file: File; // 전송할 파일
  request: { keywords: string; requirement: string }; // 외부에서 전달받을 JSON 데이터
}

// 파일과 JSON 데이터를 함께 서버로 전송하는 함수
export const postSummary = async ({ file, request }: PostSummaryProps) => {
  // FormData 객체 생성
  const formData = new FormData();

  // 파일을 FormData에 추가
  formData.append("file", file);

  // JSON 데이터를 문자열로 변환 후 FormData에 추가
  formData.append(
    "request",
    new Blob([JSON.stringify(request)], {
      type: "application/json", // Blob을 올바른 MIME 타입으로 생성
    })
  );

  try {
    // 서버로 POST 요청 보내기
    const response = await axios.post(
      "http://43.201.165.4:8080/api/v1/professor/summary/get-summary",
      formData
    );

    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};
