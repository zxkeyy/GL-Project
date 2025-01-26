import useAuthStore from "@/store/authStore";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Platform } from "react-native";

// Types for file handling
interface FileData {
  uri: string;
  name?: string;
  type?: string;
  size?: number;
}

export class ApiError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = "ApiError";
  }
}

// Define our extended client type
interface ExtendedApiClient extends AxiosInstance {
  uploadFile: <T>(
    endpoint: string,
    file: FileData,
    additionalFields?: Record<string, string | number | boolean>,
    options?: {
      fileFieldName?: string;
      defaultFileName?: string;
      defaultMimeType?: string;
    }
  ) => Promise<T>;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Create the base API client
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "content-type": "application/json",
  },
});

// Prepare file for upload
const prepareFileUpload = async (
  file: FileData,
  options?: {
    defaultFileName?: string;
    defaultMimeType?: string;
  }
): Promise<File | Blob> => {
  if (file.uri.startsWith("data:")) {
    const base64WithoutPrefix = file.uri.replace(/^data:.*?;base64,/, "");
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

    return new Blob(byteArrays, {
      type: file.type || options?.defaultMimeType || "application/octet-stream",
    });
  }

  const fileName = file.name || options?.defaultFileName || "file.tmp";
  const fileType =
    file.type || options?.defaultMimeType || "application/octet-stream";

  return {
    uri: Platform.OS === "ios" ? file.uri.replace("file://", "") : file.uri,
    type: fileType,
    name: fileName,
  } as any;
};

// Add request interceptor for authentication
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `JWT ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Create the extended API client
const apiClient: ExtendedApiClient = axiosInstance as ExtendedApiClient;

// Add the upload file method
apiClient.uploadFile = async <T>(
  endpoint: string,
  file: FileData,
  additionalFields?: Record<string, string | number | boolean>,
  options?: {
    fileFieldName?: string;
    defaultFileName?: string;
    defaultMimeType?: string;
  }
): Promise<T> => {
  try {
    const preparedFile = await prepareFileUpload(file, options);
    const formData = new FormData();

    // Add the file
    formData.append(options?.fileFieldName || "file", preparedFile, file.name);

    // Add additional fields
    if (additionalFields) {
      Object.entries(additionalFields).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    const config: AxiosRequestConfig = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      transformRequest: [(data) => data],
    };

    const response = await axiosInstance.post<T>(endpoint, formData, config);
    return response.data;
  } catch (error: any) {
    throw new ApiError(
      error.response?.data?.detail ||
        error.response?.data?.file?.[0] ||
        error.message ||
        "Upload failed",
      "UPLOAD_FAILED"
    );
  }
};

export default apiClient;
