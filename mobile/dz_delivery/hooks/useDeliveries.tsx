import apiClient from "@/services/apiClient";
import { useEffect, useState } from "react";

export interface Address {
  unit: string;
  building_type: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  longitude: number;
  latitude: number;
}

export interface Delivery {
  id: number;
  package: {
    id: number;
    recipient_name: string;
    recipient_phone: string;
    weight: number;
    dimensions: {
      width: number;
      height: number;
      length: number;
    };
    is_fragile: boolean;
    requires_signature: boolean;
    notes: string;
  };
  driver: number;
  base_fee: number;
  distance_fee: number;
  additional_fees: any;
  total_amount: number;
  pickup_address: Address;
  dropoff_address: Address;
  route_info: any;
  distance: number;
  service_area: number;
}

const useDeliveries = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(false);

  const acceptDelivery = async (deliveryId: number) => {
    setLoading(true);
    try {
      const response = await apiClient.post(
        `/delivery/deliveries/${deliveryId}/accept/`
      );
      const data = response.data;
    } catch (error) {
      console.error("Accept delivery error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeliveries = async () => {
    setLoading(true);
    // Fetch the deliveries
    try {
      const response = await apiClient.get("/delivery/deliveries/");
      const data = response.data;
      setDeliveries(data);
    } catch (error) {
      console.error("Fetch deliveries error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);
  return { deliveries, loading, acceptDelivery };
};
export default useDeliveries;
