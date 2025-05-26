import apiClient from '@/app/utils/api';

export const getPractice = async (noteId: number): Promise<any> => {
  try {
    const response = await apiClient.get(
      `/api/v1/professor/practice/${noteId}`
    );
    return response.data;
  } catch (e) {
    console.log('getPractice 함수단에서 에러 발생', e);
    throw e;
  }
};
