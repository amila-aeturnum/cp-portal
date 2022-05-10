import CPSwitch from 'components/atoms/CPSwitch';
import type { NextPage } from 'next';
import styles from '../../../styles/Home.module.css';

const Clients: NextPage = () => {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1 className={styles.title}>Clients</h1>
				<CPSwitch />
			</main>
		</div>
	);
};

export default Clients;
