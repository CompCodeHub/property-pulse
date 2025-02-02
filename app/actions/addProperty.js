"use server";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

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
  const images = formData.getAll("images").filter((image) => image.name !== "");

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
  };

  const imageUrls = [];

  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // Convert to base64
    const imageBase64 = imageData.toString("base64");

    // Save to cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      { folder: "propertypulse" }
    );

    imageUrls.push(result.secure_url);
  }

  // Set images
  propertyData.images = imageUrls;

  // Create a new property and save it to the database
  const newProperty = new Property(propertyData);
  await newProperty.save();

  // Revalidate the homepage
  revalidatePath("/", "layout");

  // Redirect to the new property page
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
