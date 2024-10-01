import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("cabins could not be loaded");
  }
  return data;
}

export async function createEDitCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  console.log(imageName);

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-image/${imageName}`;

  console.log(imagePath);
  // https://abmvtscjltfxsbkhpqhg.supabase.co/storage/v1/object/public/cabins-image/cabin-001.jpg

  //create/edit cabin
  let query = supabase.from("cabins");
  //A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  //B) EDIT
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error("cabins could not be created");
  }
  // upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabins-image")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "file was unable to be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabins(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("cabins could not be deleted");
  }
}
