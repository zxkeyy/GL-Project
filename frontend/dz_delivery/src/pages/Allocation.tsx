"use client";

import { useState } from "react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const dummyPackages = [
  { id: "P001", weight: 10, destination: "New York", priority: "High" },
  { id: "P002", weight: 15, destination: "Los Angeles", priority: "Medium" },
  { id: "P003", weight: 5, destination: "Chicago", priority: "Low" },
  { id: "P004", weight: 20, destination: "Houston", priority: "High" },
  { id: "P005", weight: 8, destination: "Phoenix", priority: "Medium" },
];

export default function Allocation() {
  const [filteredPackages, setFilteredPackages] = useState(dummyPackages);
  const [filters, setFilters] = useState({
    destination: "",
    priority: "",
    maxWeight: "",
  });

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const filtered = dummyPackages.filter((pkg) => {
      return (
        (filters.destination === "" ||
          pkg.destination
            .toLowerCase()
            .includes(filters.destination.toLowerCase())) &&
        (filters.priority === "" || pkg.priority === filters.priority) &&
        (filters.maxWeight === "" || pkg.weight <= parseInt(filters.maxWeight))
      );
    });
    setFilteredPackages(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Package Allocation</h2>
      <Card className="mb-8">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Filtering Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Input
              name="destination"
              placeholder="Destination"
              value={filters.destination}
              onChange={handleFilterChange}
            />
            <select
              name="priority"
              className="w-full p-2 border rounded"
              value={filters.priority}
              onChange={handleFilterChange}
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <Input
              name="maxWeight"
              type="number"
              placeholder="Max Weight (kg)"
              value={filters.maxWeight}
              onChange={handleFilterChange}
            />
          </div>
          <Button onClick={applyFilters}>Apply Filters</Button>
        </div>
      </Card>
      <Card>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Filtered Packages</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Weight (kg)</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPackages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell>{pkg.id}</TableCell>
                  <TableCell>{pkg.weight}</TableCell>
                  <TableCell>{pkg.destination}</TableCell>
                  <TableCell>{pkg.priority}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
