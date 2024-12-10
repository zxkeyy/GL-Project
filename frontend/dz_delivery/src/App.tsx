import { Container } from "@mui/material";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { BarChart, LineChart } from "./components/charts";

function App() {
  return (
    <Container>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                Current Stock Volume
              </h3>
              <p className="text-3xl font-bold">15,234</p>
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                Incoming Packages (Today)
              </h3>
              <p className="text-3xl font-bold">1,245</p>
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                Outgoing Packages (Today)
              </h3>
              <p className="text-3xl font-bold">987</p>
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                Forecasted Stock (Next Week)
              </h3>
              <p className="text-3xl font-bold">18,500</p>
            </div>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Package Trends</h3>
              <BarChart />
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Stock Forecast</h3>
              <LineChart />
            </div>
          </Card>
        </div>
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Alerts</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-between bg-yellow-100 p-3 rounded">
                <span>High demand expected next week</span>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </li>
              <li className="flex items-center justify-between bg-red-100 p-3 rounded">
                <span>Capacity overflow predicted in 2 weeks</span>
                <Button variant="outline" size="sm">
                  Take Action
                </Button>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </Container>
  );
}

export default App;
