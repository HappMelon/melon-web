export default function PopularAuthors({
  foo,
}: {
  foo: Array<{
    id: string;
    username: string;
    name: string;
    image: string;
    bio: string;
  }>;
}) {
  console.log("users:", foo);
  return (
    <div className="w-[274px] h-[240px] bg-white ml-[2.125rem] mt-[42px] rounded-[10px] p-4">
      <h2>Popular Authors</h2>
      {foo.map((user) => (
        <div key={user.id} className="flex items-center mt-1 gap-1">
          <img src={user.image} alt={user.username} className="w-8 h-8" />
          <h3>{user.name}</h3>
          <h3>{user.username}</h3>
          <p>{user.bio}</p>
        </div>
      ))}
    </div>
  );
}
