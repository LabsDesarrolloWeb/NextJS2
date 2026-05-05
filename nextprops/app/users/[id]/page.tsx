
interface UserProps{
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
};

async function getUser(id: string): Promise<UserProps> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  if (!response.ok) {
    // Lanza un error -> Next.js mostrara error.tsx / not-found.tsx
    throw new Error(`No se pudo cargar el usuario ${id}`);
  }

  const data: UserProps = await response.json();
  console.log("Usuario cargado:", data.name);
  return data;
}





export default async function UserProfile(
      {
  params,
}: {
  params: Promise<{ id: string }>;
}
) {
    const {id} = await params
    const profile = await getUser(id)
    console.log("UserProfile component rendered with id:", id);
  return (
        
    <>Perfil de usuario {id}
    {profile.name}
    </>
    
  );
}