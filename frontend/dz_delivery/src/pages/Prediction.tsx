"use client";

import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { LineChart } from "../components/charts";

export default function StockPrediction() {
  const [forecast, setForecast] = useState([15000, 16500, 18000, 17500]);
  const [scenario, setScenario] = useState("");

  const updateForecast = () => {
    // Simulate updating the forecast based on the scenario
    const newForecast = forecast.map((value) => {
      const change = Math.floor(Math.random() * 2000) - 1000; // Random change between -1000 and 1000
      return Math.max(0, value + change); // Ensure the value doesn't go below 0
    });
    setForecast(newForecast);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Stock Prediction</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">
              Forecasted Stock Volume
            </h3>
            <LineChart
              data={{
                labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                datasets: [
                  {
                    label: "Forecasted Stock",
                    data: forecast,
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1,
                  },
                ],
              }}
            />
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Scenario Simulation</h3>
            <Input
              placeholder="Enter scenario (e.g., 'Holiday season')"
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              className="mb-4"
            />
            <Button onClick={updateForecast}>Update Forecast</Button>
          </div>
        </Card>
      </div>
      <Card>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Alerts and Suggestions</h3>
          <ul className="space-y-2">
            {forecast[3] > 20000 && (
              <li className="bg-yellow-100 p-3 rounded">
                <strong>Alert:</strong> Predicted stock exceeds hub capacity in
                Week 4.
                <br />
                <strong>Suggestion:</strong> Consider renting additional storage
                space.
              </li>
            )}
            {forecast[1] - forecast[0] > 2000 && (
              <li className="bg-blue-100 p-3 rounded">
                <strong>Info:</strong> Significant stock increase expected in
                Week 2.
                <br />
                <strong>Suggestion:</strong> Prepare additional staff for
                increased workload.
              </li>
            )}
          </ul>
        </div>
      </Card>
    </div>
  );
}
