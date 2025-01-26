export interface Address {
    unit: string | null;
    building_type: string | null;
    street: string;
    city: string;
    state: string;
    country: string | null;
    postal_code: string | null;
}

export interface Sender {
    id: number;
    email: string;
    phone_number: string | null;
    full_name: string;
    is_active: boolean;
}

export interface Delivery {
    id: number;
    cost: string;
    created_at: string;
    current_address: Address;
    delivery_address: Address;
    delivery_progress: number;
    dimensions: number;
    insurance_amount: string;
    is_fragile: boolean;
    notes: string;
    pickup_address: Address;
    priority: "STANDARD" | "EXPRESS" | "URGENT"; // Enum for priority levels
    recipient_email: string;
    recipient_name: string;
    recipient_phone: string;
    requires_signature: boolean;
    sender: Sender;
    status: "ASSIGNED" | "PENDING" | "DELIVERED" | "CANCELLED"; // Enum for statuses
    tracking_number: string;
    verification_code: string;
    weight: number;
}
