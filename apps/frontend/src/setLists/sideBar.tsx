import { Track } from "@spotify/web-api-ts-sdk";
import { ChangeEvent, DragEvent, FormEvent, useState } from "react";
import { BsVinylFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { useDnD } from "../dragDrop/dndProvider";

export function SideBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Track[]>([]);
  const [isPending, setIsPending] = useState(false);

  async function handleSearch(evt: FormEvent) {
    evt.preventDefault();

    setIsPending(true);
    setResults([]);

    const results = await tracksService.searchTracks(query);

    setIsPending(false);
    setResults(results);
  }

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    setQuery(evt.target.value);
  }

  return (
    <aside className="flex flex-col h-full p-4 bg-base-300 space-y-4">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <input
          className="input"
          type="text"
          name="search"
          value={query}
          onFocus={(evt) => evt.target.select()}
          onChange={handleChange}
          required
          placeholder="Search"
        />
        <div className="tooltip tooltip-primary" data-tip="Search">
          <button className="btn btn-primary" type="submit">
            {isPending ? (
              <div className="loading loading-ring size-5"></div>
            ) : (
              <FaSearch className="size-5" />
            )}
          </button>
        </div>
      </form>
      <SearchResults
        results={results}
        isPending={isPending}
        clearResults={() => setResults([])}
      />
    </aside>
  );
}

function SearchResults(props: {
  results: Track[];
  isPending: boolean;
  clearResults: () => void;
}) {
  function handleClear() {
    props.clearResults();
  }

  const prompt = "Drag your song into the set list.";

  return (
    <ul
      className={`list bg-base-100 rounded-box shadow-md h-full overflow-y-auto ${
        props.isPending ? "skeleton" : ""
      }`}
    >
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide flex place-content-between items-center">
        {prompt}
        <button
          className="btn btn-xs btn-square btn-neutral"
          onClick={handleClear}
        >
          <MdClear className="size-4" />
        </button>
      </li>

      <CustomEntry />
      {props.results.map((t) => (
        <SearchResultEntry key={t.id} track={t} />
      ))}
    </ul>
  );
}

function SearchResultEntry(props: { track: Track }) {
  const { setType } = useDnD();
  const { track } = props;

  function onDragStart(event: DragEvent) {
    setType({
      data: {
        title: track.name,
        artist: track.artists.at(0)?.name as string,
        spotifyTrack: {
          spotifyId: track.id,
          albumImg: track.album.images.reduce((biggest, img) =>
            img.width > biggest.width ? img : biggest
          ).url,
        },
      },
    });
    event.dataTransfer.effectAllowed = "move";
  }

  return (
    <li className="list-row mr-4" onDragStart={onDragStart} draggable>
      <div>
        <img
          className="size-10 rounded-box pointer-events-none"
          src={track.album.images.at(-1)?.url}
        />
      </div>
      <div>
        <div>{track.name}</div>
        <div className="text-xs uppercase font-semibold opacity-60">
          {track.artists.at(0)?.name}
        </div>
      </div>
    </li>
  );
}

function CustomEntry() {
  const { setType } = useDnD();

  function onDragStart(event: DragEvent) {
    setType({ data: {} });
    event.dataTransfer.effectAllowed = "move";
  }

  return (
    <li className="list-row mr-4" onDragStart={onDragStart} draggable>
      <div>
        <BsVinylFill className="size-10 rounded-box pointer-events-none" />
      </div>
      <div>
        <div>Custom Track</div>
        <div className="text-xs uppercase font-semibold opacity-60">
          Custom Artist
        </div>
      </div>
    </li>
  );
}
