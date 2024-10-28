import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      ...styles.nav,
      backgroundColor: isScrolled ? 'rgba(210, 180, 140, 0.95)' : 'rgba(210, 180, 140, 0.8)',
      boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
    }}>
      <div style={styles.container}>
        <Link to="/" style={styles.logoContainer}>
          <div style={styles.logo} />
          <h1 style={styles.brandName}>FlashAI</h1>
        </Link>
        <ul style={styles.links}>
          <li style={styles.linkItem}>
            <Link to="/" style={styles.link}>Home</Link>
          </li>
          <li style={styles.linkItem}>
            <Link to="/generate" style={styles.link}>Create</Link>
          </li>
          <li style={styles.linkItem}>
            <Link to="/view" style={styles.link}>My Collections</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    color: '#333',
    padding: '0.5rem 0',
    transition: 'all 0.3s ease',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  logo: {
    width: '2rem',
    height: '2rem',
    backgroundImage: 'url("/flashh.png")',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginRight: '8px',
  },
  brandName: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  },
  links: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
  },
  linkItem: {
    marginLeft: '1.5rem',
  },
  link: {
    color: '#333',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    padding: '0.25rem 0',
    borderBottom: '2px solid transparent',
    transition: 'all 0.3s ease',
    ':hover': {
      borderBottom: '2px solid #333',
    },
  },
  '@media (max-width: 768px)': {
    nav: {
      height: 'auto',
      padding: '0.5rem 0',
    },
    container: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    links: {
      marginTop: '0.5rem',
    },
    linkItem: {
      marginLeft: 0,
      marginRight: '1rem',
    },
  },
};

export default Navbar;