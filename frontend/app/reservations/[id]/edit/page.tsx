interface Props {
  params: { reservationId: string };
  searchParams: { restaurantId?: string };
}

export default async function EditReservationPage({
  params,
  searchParams,
}: Props) {
  // const { reservationId } = params;
  // const { restaurantId } = searchParams;

  return (
    <div className="min-h-screen bg-gray-50 text-center mt-20">
      <h1>Page en cours de création</h1>
    </div>
  );
}
