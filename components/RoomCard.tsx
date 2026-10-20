import { asset } from "../app/base";
import Arrow from "./Arrow";

type Room = {
  title: string;
  kind: string;
  capacity: string;
  image: string;
  description: string;
};

export default function RoomCard({ room, href }: { room: Room; href: string }) {
  return (
    <article className="room-card">
      <img src={asset(room.image)} alt={room.title} loading="lazy" />
      <div className="room-card__body">
        <p className="eyebrow">{room.kind} · {room.capacity}</p>
        <h3>{room.title}</h3>
        <p>{room.description}</p>
        <a href={href} target="_blank" rel="noreferrer" aria-label={`Consultar disponibilidade para ${room.title}`}>
          Consultar <Arrow />
        </a>
      </div>
    </article>
  );
}
