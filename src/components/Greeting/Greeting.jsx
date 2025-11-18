import styles from './Style.module.css'
import './Sytle1.css'

function Greeting() {
  return (
    <div>
      <h1 className={styles.text_welcome}>Greeting </h1>
      <h1 className='text'>Greeting </h1>
    </div>
  );
}

export default Greeting;
