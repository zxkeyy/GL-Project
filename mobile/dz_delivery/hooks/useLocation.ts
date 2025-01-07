import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";

interface LocationState {
  location: Location.LocationObject | null;
  error: string | null;
  loading: boolean;
  updateLocation: () => Promise<void>;
  startLocationUpdates: () => Promise<void>;
  stopLocationUpdates: () => void;
}

interface LocationHookConfig {
  accuracy?: Location.Accuracy;
  enableHighAccuracy?: boolean;
  // How frequently to update location (in milliseconds)
  timeInterval?: number;
  // Minimum distance (in meters) between updates
  distanceInterval?: number;
  // Whether to start with continuous updates
  startWatching?: boolean;
}

const defaultConfig: LocationHookConfig = {
  accuracy: Location.Accuracy.BestForNavigation,
  enableHighAccuracy: false,
  timeInterval: 5000, // Update every 5 seconds
  distanceInterval: 10, // Or when moved 10 meters
  startWatching: false, // Don't start continuous updates by default
};

const useLocation = (
  config: LocationHookConfig = defaultConfig
): LocationState => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Use ref to store the location subscription
  const locationSubscription = useRef<Location.LocationSubscription | null>(
    null
  );

  const getCurrentLocation = async (): Promise<void> => {
    try {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: config.accuracy,
      });

      setLocation(currentLocation);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  const startLocationUpdates = async (): Promise<void> => {
    try {
      // First check/request permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      // Stop any existing subscription
      stopLocationUpdates();

      // Start the location subscription
      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: config.accuracy,
          timeInterval: config.timeInterval,
          distanceInterval: config.distanceInterval,
        },
        (newLocation) => {
          setLocation(newLocation);
          setError(null);
        }
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  const stopLocationUpdates = (): void => {
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setError("Permission to access location was denied");
          setLoading(false);
          return;
        }

        // If startWatching is true, start continuous updates
        // Otherwise just get the current location once
        if (config.startWatching) {
          await startLocationUpdates();
        } else {
          await getCurrentLocation();
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    })();

    // Cleanup function to remove the subscription when component unmounts
    return () => {
      stopLocationUpdates();
    };
  }, []);

  const updateLocation = async (): Promise<void> => {
    try {
      setLoading(true);
      await getCurrentLocation();
    } finally {
      setLoading(false);
    }
  };

  return {
    location,
    error,
    loading,
    updateLocation,
    startLocationUpdates,
    stopLocationUpdates,
  };
};

export default useLocation;
