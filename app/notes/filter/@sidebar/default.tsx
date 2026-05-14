import Link from 'next/link';
import css from './SidebarNotes.module.css';

const TAGS = ['Todo', 'Personal', 'Work', 'Meeting', 'Shopping'];

export default function SidebarNotes() {
  return (
    <nav className={css.sidebarNav}>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href="/notes/filter/all" className={css.menuLink}>
            All notes
          </Link>
        </li>
        {TAGS.map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
