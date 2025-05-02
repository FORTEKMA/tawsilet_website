export const statusConfig = {
    Pending: {
        step: 0,
        title: "Order Received",
        description: "We've received your request and are processing it."
      },
      Dispatched_to_partner: {
        step: 1,
        title: "Dispatched to Partner",
        description: "Your order has been sent to our delivery partner."
      },
      Assigned_to_driver: {
        step: 2,
        title: "Assigned to Driver",
        description: "A driver has been assigned to your order."
      },
      Driver_on_route_to_pickup: {
        step: 3,
        title: "Driver En Route to Pickup",
        description: "The driver is on their way to collect your package."
      },
      Arrived_at_pickup: {
        step: 4,
        title: "Arrived at Pickup",
        description: "The driver has arrived at the pickup location."
      },
      Picked_up: {
        step: 5,
        title: "Picked Up",
        description: "Your package has been collected by the driver."
      },
      On_route_to_delivery: {
        step: 6,
        title: "On Route to Delivery",
        description: "Your package is on its way to the delivery location."
      },
      Arrived_at_delivery: {
        step: 7,
        title: "Arrived at Delivery",
        description: "The driver has arrived at the delivery location."
      },
      Failed_pickup: {
        step: -2,
        title: "Pickup Failed",
        description: "We were unable to pickup your package."
      },
      Failed_delivery: {
        step: -3,
        title: "Delivery Failed",
        description: "We were unable to deliver your package."
      },
      Delivered: {
        step: 8,
        title: "Delivered",
        description: "Your package has been successfully delivered."
      },
      Completed: {
        step: 9,
        title: "Completed",
        description: "The order process is fully completed."
      },
      CANCELLED: {
        step: -1,
        title: "Cancelled",
        description: "Your order has been cancelled."
      }
  };
  
  export const statusSteps = [
    "Pending",
    "Dispatched_to_partner",
    "Assigned_to_driver",
    "Driver_on_route_to_pickup",
    "Arrived_at_pickup",
    "Picked_up",
    "On_route_to_delivery",
    "Arrived_at_delivery",
    "Delivered",
    "Completed"
  ];