import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ProgramType {
  id: number;
  typeName: string;
  typeNameFr: string;
}

export interface ProgramResponse {
  id: number;
  programName: string;
  programDescription: string;
  programTypeId: number;
  programTypeName: string;
  programTypeNameFr: string;
  status: string;
  reviewerComments: string | null;
  submittedAt: string;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface ProgramSubmitRequest {
  programName: string;
  programDescription: string;
  programTypeId: number;
  createdBy: string;
}

export const programService = {
  async getProgramTypes(): Promise<ProgramType[]> {
    const response = await api.get<ProgramType[]>('/program-types');
    return response.data;
  },

  async submitProgram(request: ProgramSubmitRequest): Promise<ProgramResponse> {
    const response = await api.post<ProgramResponse>('/programs', request);
    return response.data;
  },

  async getAllPrograms(): Promise<ProgramResponse[]> {
    const response = await api.get<ProgramResponse[]>('/programs');
    return response.data;
  },

  async getProgramById(id: number): Promise<ProgramResponse> {
    const response = await api.get<ProgramResponse>(`/programs/${id}`);
    return response.data;
  },
};

export default api;
