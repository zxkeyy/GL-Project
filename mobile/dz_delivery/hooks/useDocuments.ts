import apiClient from "@/services/apiClient";
import { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { Platform } from "react-native";
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

// Define types for the document response
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

// Define allowed mime types
type AllowedMimeType = "application/pdf" | "image/jpeg" | "image/png";

// Define error types
interface ApiError {
  detail?: string;
  [key: string]: any;
}

const base64ToBlob = async (
  base64Data: string,
  fileName: string,
  type: string
): Promise<Blob> => {
  // Remove the data URL prefix if it exists
  const base64WithoutPrefix = base64Data.replace(
    /^data:image\/\w+;base64,/,
    ""
  );

  // Convert base64 to binary
  const byteCharacters = atob(base64WithoutPrefix);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type });
};

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
    const formData = new FormData();
    formData.append("document_type", documentType.toString());

    // Handle file based on uri format
    if (file.uri.startsWith("data:")) {
      // Handle base64 data
      const blob = await base64ToBlob(
        file.uri,
        file.name || "image.png",
        file.mimeType || "image/png"
      );

      formData.append("file", blob, file.name || "image.png");
    } else {
      // Handle regular file uri
      const fileUri =
        Platform.OS === "ios" ? file.uri.replace("file://", "") : file.uri;
      formData.append("file", {
        uri: fileUri,
        type: file.mimeType,
        name: file.name,
      } as any);
    }

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      transformRequest: [(data: any) => data],
    };

    const response = await apiClient.post<DocumentResponse>(
      "/auth/documents/",
      formData,
      config
    );

    return response.data;
  } catch (error: any) {
    console.error("Upload error:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
      const errorMessage =
        error.response.data.file?.[0] ||
        error.response.data.detail ||
        "Upload failed";
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "An unknown error occurred");
    }
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

  const uploadDocument = async (documentTypeId: number, file: any) => {};

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<DocumentStatus[]>(
          "/auth/documents/driver_required_documents/"
        );
        console.log(response.data);
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
