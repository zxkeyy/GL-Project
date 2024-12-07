import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import RootLayout from "../app/_layout";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "@/hooks/useColorScheme";

jest.mock("expo-font", () => ({
  useFonts: () => [true],
}));

jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

jest.mock("@/hooks/useColorScheme", () => ({
  useColorScheme: jest.fn(),
}));

describe("RootLayout", () => {
  it("renders correctly when fonts are loaded", async () => {
    (useColorScheme as jest.Mock).mockReturnValue("light");

    const { getByText } = render(<RootLayout />);

    await waitFor(() => {
      expect(SplashScreen.hideAsync).toHaveBeenCalled();
    });

    expect(getByText("(tabs)")).toBeTruthy();
  });

  it("applies dark theme when color scheme is dark", async () => {
    (useColorScheme as jest.Mock).mockReturnValue("dark");

    const { getByText } = render(<RootLayout />);

    await waitFor(() => {
      expect(SplashScreen.hideAsync).toHaveBeenCalled();
    });

    expect(getByText("(tabs)")).toBeTruthy();
  });

  it("does not render when fonts are not loaded", () => {
    jest.mock("expo-font", () => ({
      useFonts: () => [false],
    }));

    const { queryByText } = render(<RootLayout />);

    expect(queryByText("(tabs)")).toBeNull();
  });
});
