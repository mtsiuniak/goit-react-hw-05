
export default function MovieCastItem({ data: { profile_path, name, character } }) {
  const urlImg = `https://image.tmdb.org/t/p/w500/${profile_path}`;
  return (
    <div>
      <img
        src={profile_path ? urlImg : "Not found"}
        alt={name}
        width="200"
        height="300"
      />
      <div>
        <h3>{name}</h3>
        <p>
          <span>Character:</span> {character}
        </p>
      </div>
    </div>
  );
}

