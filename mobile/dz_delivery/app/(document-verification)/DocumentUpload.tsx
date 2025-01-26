import { ThemedText } from "@/components/ThemedText";
import useDocuments, {
  DocumentStatus,
  useDocumentUpload,
} from "@/hooks/useDocuments";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";

interface FileInfo {
  name: string;
  size: number | undefined;
  uri: string;
  mimeType: string | undefined;
}

interface Props {
  document: DocumentStatus;
}

export default function DocumentUpload({ document }: Props) {
  const { upload } = useDocumentUpload();

  const handleUpload = async () => {
    const result = await upload(document.document_type.id.toString());

    if (result.success) {
      alert("Document uploaded successfully");
    } else {
      alert("Failed to upload document");
    }
  };

  return (
    <View
      style={{
        padding: 10,
        flexDirection: "column",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <ThemedText style={{ fontWeight: "bold" }}>
          {document.document_type.name}
        </ThemedText>
        <ThemedText>
          {document.status ? document.status : "not submitted"}
        </ThemedText>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <ThemedText>{document.document_type.description}</ThemedText>
      </View>
      {!document.uploaded ||
        (document.status == "rejected" && (
          <TouchableOpacity
            style={{
              backgroundColor: "#4CAF50",
              height: 48,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleUpload}
          >
            <ThemedText
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Submit
            </ThemedText>
          </TouchableOpacity>
        ))}
    </View>
  );
}
