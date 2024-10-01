import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function currentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateUserAccout({ fullName, avatar, password }) {
  // update account

  let updatedData;
  if (password) updatedData = { password };
  if (fullName) updatedData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updatedData);

  console.log({ data: { fullName } });

  if (error) throw new Error(error.message);
  if (!avatar) return data;
  // if avatar, upload file

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  console.log(data);
  //https://abmvtscjltfxsbkhpqhg.supabase.co/storage/v1/object/public/avater/cabin-002.jpg
  const imagePath = `${supabaseUrl}/storage/v1/object/public/avater/${fileName}`;

  const { error: storageError } = await supabase.storage
    .from("avater")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);
  // upadate account

  const { data: upadatedAvater, error: error2 } =
    await supabase.auth.updateUser({
      data: {
        avatar: imagePath,
      },
    });

  return { upadatedAvater, error2 };
}
