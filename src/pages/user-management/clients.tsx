import CPTextField from 'components/atoms/CPTextField';
import Breadcrumb from 'components/molecules/Breadcrumb';
import type { NextPage } from 'next';
import { useState } from 'react';
import styles from '../../../styles/Home.module.css';

const Clients: NextPage = () => {
	const [label, setLabel] = useState('');
	const [name, setName] = useState('');
	return (
		<div className={styles.container}>
			<Breadcrumb title={'Clients'} />
			<main className={styles.main}>
				<CPTextField label={'Name'} handleChange={setName} />
				<CPTextField label={'Label'} handleChange={setLabel} />
				label:{label}
				name :{name}
			</main>
		</div>
	);
};

export default Clients;
