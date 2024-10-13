import { Link } from 'react-router-dom';
import pageNotFound from '../images/pageNotFound.webp'

export default function PageNotFound() {
  return (
    <div style={styles.container}>
        <img src={pageNotFound} alt="" />
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={styles.link}>Go Back Home</Link>
    </div>
  )
}


const styles = {
    container: {
      textAlign: 'center',
      marginTop: '50px',
    },
    heading: {
      fontSize: '6rem',
      marginBottom: '20px',
    },
    message: {
      fontSize: '1.5rem',
      marginBottom: '20px',
    },
    link: {
      fontSize: '1.2rem',
      color: '#007bff',
      textDecoration: 'none',
    }
};
