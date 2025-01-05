import apiClient from "@/services/apiClient";
import { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { useAuth } from "./useAuth";
export interface DocumentType {
  id: number;
  name: string;
  code: string;
  description: string;
  is_client_required: boolean;
  is_driver_required: boolean;
}
export interface DocumentStatus {
  document_type: DocumentType;
  status: string;
  uploaded: boolean;
}
interface DocumentResponse {
  id: number;
  document_type: number;
  document_type_details: {
    id: number;
    name: string;
    code: string;
    description: string;
    is_client_required: boolean;
    is_driver_required: boolean;
  };
  file: string;
  status: "pending" | "approved" | "rejected";
  reviewer_notes?: string;
  created_at: string;
}

export const uploadDocument = async (
  documentType: string
): Promise<DocumentResponse> => {
  try {
    // Pick the document
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/jpeg", "image/png"],
      copyToCacheDirectory: true,
    });
    if (result.canceled) {
      throw new Error("Document picking was canceled");
    }
    const file = result.assets[0];

    return await apiClient.uploadFile<DocumentResponse>(
      "/auth/documents/",
      file,
      { document_type: documentType }
    );
  } catch (error: any) {
    console.error("Upload error:", error);
    throw error instanceof Error ? error : new Error("Upload failed");
  }
};
export const useDocumentUpload = () => {
  const upload = async (documentType: string) => {
    try {
      const response = await uploadDocument(documentType);
      return {
        success: true,
        data: response,
        error: null,
      } as const;
    } catch (error) {
      return {
        success: false,
        data: null,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      } as const;
    }
  };
  return { upload };
};
const useDocuments = () => {
  const [documents, setDocuments] = useState<DocumentStatus[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { accessToken } = useAuth();
  const uploadDocument = async (documentTypeId: number, file: any) => {
    // This can be implemented if needed using the new apiClient.uploadFile
  };
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<DocumentStatus[]>(
          "/auth/documents/driver_required_documents/"
        );
        setDocuments(response.data);
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);
  return { documents, loading, uploadDocument };
};
export default useDocuments;
