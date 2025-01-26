// import React from "react";
// import { render, screen } from "@testing-library/react";
// import Footer from "../Footer";

// describe("Footer Component", () => {
//     beforeEach(() => {
//         render(<Footer />);
//     });

//     test("renders About Blitz section", () => {
//         expect(screen.getByText("About Blitz")).toBeInTheDocument();
//         expect(
//             screen.getByText(
//                 "Fast, reliable, and secure delivery services for all your needs."
//             )
//         ).toBeInTheDocument();
//     });

//     test("renders Quick Links", () => {
//         expect(screen.getByText("Quick Links")).toBeInTheDocument();
//         expect(screen.getByText("Home")).toBeInTheDocument();
//         expect(screen.getByText("Services")).toBeInTheDocument();
//         expect(screen.getByText("Track Package")).toBeInTheDocument();
//         expect(screen.getByText("Become a Driver")).toBeInTheDocument();
//     });

//     test("renders Contact Us information", () => {
//         expect(screen.getByText("Contact Us")).toBeInTheDocument();
//         expect(screen.getByText(/1234 Delivery Street/i)).toBeInTheDocument();
//         expect(
//             screen.getByText(/Speedyville, Fast 56789/i)
//         ).toBeInTheDocument();
//         expect(screen.getByText(/info@blitz\.com/i)).toBeInTheDocument();
//         expect(screen.getByText(/\(555\) 123-4567/i)).toBeInTheDocument();
//     });

//     test("renders Follow Us links", () => {
//         expect(screen.getByText("Follow Us")).toBeInTheDocument();
//         expect(screen.getByText("Facebook")).toBeInTheDocument();
//         expect(screen.getByText("Twitter")).toBeInTheDocument();
//         expect(screen.getByText("Instagram")).toBeInTheDocument();
//         expect(screen.getByText("LinkedIn")).toBeInTheDocument();
//     });

//     test("renders current year in copyright", () => {
//         const currentYear = new Date().getFullYear();
//         expect(
//             screen.getByText(
//                 `© ${currentYear} Blitz Delivery. All rights reserved.`
//             )
//         ).toBeInTheDocument();
//     });
// });
