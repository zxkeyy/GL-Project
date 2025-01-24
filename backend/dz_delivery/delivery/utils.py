def calculate_delivery_price(distance, weight):
    """
    Calculate delivery price based on multiple factors.
    
    Args:
    - distance (float): Delivery distance in kilometers
    - weight (float): Package weight in kilograms
    
    Returns:
    - float: Calculated delivery price
    """
    # Base price
    base_price = 200.00
    
    # Distance pricing
    distance_rate = 5  # Price per kilometer
    distance_cost = distance * distance_rate
    
    # Weight pricing
    weight_rates = {
        (0, 5): 0,        # 0-5 kg: no additional charge
        (5, 10): 100,    # 5-10 kg: extra charge
        (10, float('inf')): 300  # Over 10 kg: higher charge
    }
    
    weight_cost = next(
        rate for (min_weight, max_weight), rate in weight_rates.items() 
        if min_weight <= weight < max_weight
    )
    
    # Calculate total price
    total_price = (base_price + distance_cost + weight_cost)
    
    return round(total_price, 2)



def calculate_delivery_distance(origin_address, destination_address):
    return 100.0
#     gmaps = GoogleMaps(key='YOUR_GOOGLE_MAPS_API_KEY')
    
#     # Request distance matrix
#     distance_matrix = gmaps.distance_matrix(
#         origins=[origin_address],
#         destinations=[destination_address],
#         mode='driving'  # or 'walking', 'bicycling'
#     )
    
#     # Extract distance in kilometers
#     distance_km = distance_matrix['rows'][0]['elements'][0]['distance']['value'] / 1000
#     return distance_km