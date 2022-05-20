import { IPagination } from 'components/molecules/DataTable/DataTable.type';

export interface IClient {
	userAccountList: IUserAccount[];
	pagination: IPagination;
}

export interface IUserAccount {
	analystIdList: IAnalyst[];
	clientName: string;
	email: string;
	id: Number;
	isConversionRate: boolean;
	isCostPerAcquisition: boolean;
	recipientEmailList: string[];
}

export interface IAnalyst {
	id: Number;
	name: string;
}
