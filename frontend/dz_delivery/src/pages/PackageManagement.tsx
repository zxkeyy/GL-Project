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

interface packageType {
  id: string;
  weight: number;
  destination: string;
  priority: string;
}

export default function PackageManagement() {
  const [scannedPackage, setScannedPackage] = useState<packageType | null>(
    null
  );
  const [packages, setPackages] = useState<packageType[]>([]);

  const handleScan = () => {
    // Simulate scanning a package
    const newPackage: packageType | null = {
      id: Math.random().toString(36).substr(2, 9),
      weight: Math.floor(Math.random() * 50) + 1,
      destination: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"][
        Math.floor(Math.random() * 5)
      ],
      priority: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
    };
    setScannedPackage(newPackage);
    setPackages([newPackage, ...packages]);
  };

  const handleManualEntry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPackage: packageType = {
      id: Math.random().toString(36).substr(2, 9),
      weight: Number(formData.get("weight")) || 0,
      destination: formData.get("destination") as string || "",
      priority: formData.get("priority") as string || "",
    };
    setPackages([newPackage, ...packages]);
    e.currentTarget.reset();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Package Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Package Scanning</h3>
            <Button onClick={handleScan}>Scan Package</Button>
            {scannedPackage && (
              <div className="mt-4">
                <h4 className="font-semibold">Scanned Package Details:</h4>
                <p>ID: {scannedPackage.id}</p>
                <p>Weight: {scannedPackage.weight} kg</p>
                <p>Destination: {scannedPackage.destination}</p>
                <p>Priority: {scannedPackage.priority}</p>
              </div>
            )}
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Manual Package Entry</h3>
            <form onSubmit={handleManualEntry} className="space-y-4">
              <Input
                name="weight"
                type="number"
                placeholder="Weight (kg)"
                required
              />
              <Input
                name="destination"
                type="text"
                placeholder="Destination"
                required
              />
              <select
                name="priority"
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <Button type="submit">Add Package</Button>
            </form>
          </div>
        </Card>
      </div>
      <Card>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Package Inventory</h3>
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
              {packages.map((pkg) => (
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
