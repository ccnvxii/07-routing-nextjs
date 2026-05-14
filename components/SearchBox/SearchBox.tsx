import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  return (
    <div>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
        onChange={e => onSearch(e.target.value)}
      />
    </div>
  );
}
