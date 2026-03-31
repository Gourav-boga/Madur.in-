export const BUSINESS_WHATSAPP = "917416750834";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  selectedUnit?: string;
}

export const formatOrderWhatsAppMessage = (orderId: string, customerData: any, items: OrderItem[], totalAmount: number, paymentMethod: string, isSubscription: boolean = false) => {
  const title = isSubscription ? "*NEW SUBSCRIPTION PLACED!* 🥛" : "*NEW ORDER PLACED!* 🛍️";
  
  const itemDetails = items.map(item => `- ${item.name} (${item.selectedUnit || ""}) x ${item.quantity} = ₹${Math.floor(item.price * item.quantity)}`).join('\n');
  
  return `${title}\n\n*Order/Sub ID:* #${orderId}\n\n*Customer Details:*\n- Name: ${customerData.name}\n- Phone: ${customerData.phone}\n- Email: ${customerData.email}\n\n*Delivery Address:*\n${customerData.address}\n\n*Location:* ${customerData.location || 'Not provided'}\n\n*Items:*\n${itemDetails}\n\n*Total Amount:* ₹${Math.floor(totalAmount)}\n*Payment Method:* ${paymentMethod}\n\nThank you for shopping with MADUR.IN!`;
};

export const sendWhatsAppNotification = (message: string) => {
  const url = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`;
  if (typeof window !== "undefined") {
    window.open(url, '_blank');
  }
};
