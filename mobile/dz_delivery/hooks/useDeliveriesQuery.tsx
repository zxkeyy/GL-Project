import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/services/apiClient";
import { useAuth } from "./useAuth";

export interface Address {
  unit: string | null;
  building_type: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  longitude: number | null;
  latitude: number | null;
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
  status: string;
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
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Define query keys
  const QUERY_KEYS = {
    deliveries: "deliveries",
    currentDeliveries: "currentDeliveries",
    availableDeliveries: "availableDeliveries",
    completedDeliveries: "completedDeliveries",
  };

  // Queries
  const { data: deliveries = [], isLoading: isDeliveriesLoading } = useQuery({
    queryKey: [QUERY_KEYS.deliveries],
    queryFn: async () => {
      const response = await apiClient.get("/delivery/deliveries/");
      return response.data;
    },
  });

  const {
    data: currentDeliveries = [],
    isLoading: isCurrentDeliveriesLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.currentDeliveries],
    queryFn: async () => {
      if (!user) return [];
      const response = await apiClient.get(
        `/delivery/drivers/${user.id}/current_deliveries/`
      );
      return response.data;
    },
    enabled: !!user,
  });

  const {
    data: availableDeliveries = [],
    isLoading: isAvailableDeliveriesLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.availableDeliveries],
    queryFn: async () => {
      if (!user) return [];
      const response = await apiClient.get(
        "/delivery/deliveries/available_deliveries/"
      );
      return response.data;
    },
    enabled: !!user,
  });
  const {
    data: completedDeliveries = [],
    isLoading: isCompletedDeliveriesLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.completedDeliveries],
    queryFn: async () => {
      if (!user) return [];
      const response = await apiClient.get(
        `/delivery/deliveries/delivery_history/`
      );
      return response.data;
    },
    enabled: !!user,
  });

  // Mutations
  const acceptDeliveryMutation = useMutation({
    mutationFn: async (deliveryId: number) => {
      const response = await apiClient.post(
        `/delivery/deliveries/${deliveryId}/accept/`
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch all affected queries
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.availableDeliveries],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.currentDeliveries],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.deliveries] });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      deliveryId,
      status,
      location,
    }: {
      deliveryId: number;
      status: string;
      location: Address | null;
    }) => {
      const response = await apiClient.post(
        `/delivery/deliveries/${deliveryId}/update_status/`,
        {
          status,
          location,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.currentDeliveries],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.deliveries] });
    },
  });

  const verifyDeliveryMutation = useMutation({
    mutationFn: async ({
      deliveryId,
      verification_code,
    }: {
      deliveryId: number;
      verification_code: string;
    }) => {
      const response = await apiClient.post(
        `/delivery/deliveries/${deliveryId}/verify_delivery/`,
        {
          verification_code,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.currentDeliveries],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.deliveries] });
    },
  });

  return {
    // Queries
    deliveries,
    currentDeliveries,
    availableDeliveries,
    completedDeliveries,
    loading:
      isDeliveriesLoading ||
      isCurrentDeliveriesLoading ||
      isAvailableDeliveriesLoading ||
      isCompletedDeliveriesLoading,

    // Mutation functions
    acceptDelivery: acceptDeliveryMutation.mutate,
    updateStatus: (
      deliveryId: number,
      status: string,
      location: Address | null
    ) => updateStatusMutation.mutate({ deliveryId, status, location }),
    verifyDelivery: (deliveryId: number, verification_code: string) =>
      verifyDeliveryMutation.mutate({ deliveryId, verification_code }),
  };
};

export default useDeliveries;
