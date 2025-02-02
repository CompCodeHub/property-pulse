"use server";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function addProperty(formData) {
  // Connect to the database
  await connectDB();

  // Get the current user's session
  const sessionUser = await getSessionUser();

  // If the user is not logged in, throw an error
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required!");
  }

  // Get the user ID from the session
  const { userId } = sessionUser;

  // Get the amenities and images from the form data
  const amenities = formData.getAll("amenities");
  const images = formData
    .getAll("images")
    .filter((image) => image.name !== "")
    .map((image) => image.name);

  // Create the property data object
  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipCode: formData.get("location.zipCode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities,
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
    images,
  };

  // Create a new property and save it to the database
  const newProperty = new Property(propertyData);
  await newProperty.save();

  // Revalidate the homepage
  revalidatePath("/", "layout");

  // Redirect to the new property page
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
