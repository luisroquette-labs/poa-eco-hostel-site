export const lovableConnectors = {
  directBooking: "https://booking.hqbeds.com.br/poaecohostel",
  booking: "https://www.booking.com/hotel/br/porto-alegre-eco-hostel.pt-br.html",
  bookingReviews: "https://www.booking.com/hotel/br/porto-alegre-eco-hostel.pt-br.html#tab-reviews",
  maps: "https://maps.app.goo.gl/sFcuMk6U1eUXwM2f6",
  whatsapp: "https://wa.me/555133778876",
  instagram: "https://instagram.com/poaecohostel",
  email: "mailto:portoalegreecohostel@gmail.com",
} as const;

export type LovableConnectorId = keyof typeof lovableConnectors;
