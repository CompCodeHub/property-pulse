import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    await connectDB();
    const property = await Property.findById(id);

    if (!property) {
      return new Response(JSON.stringify({ message: "Property not found!" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify({ property }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Could not fetch property!" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
