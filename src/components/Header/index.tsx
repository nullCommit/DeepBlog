import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.container}>
      <a href="/">
        <img src="/images/logo.svg" alt="logo" />
      </a>
    </header>
  );
}
