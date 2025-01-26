const PropertyPage = async ({ params }) => {
  const { id } = await params;
  return (
    <div>
      <h1 className="text-3xl">Property Page {id}</h1>
    </div>
  );
};

export default PropertyPage;
