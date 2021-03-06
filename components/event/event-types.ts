export interface EventData {
	id: number;
	name: string;
	description: string;
	venue: string;
	address: string;
	slug: string;
	date: Date;
	time: Date;
	user: {
		id: number;
		username: string;
		email: string;
		provider: 'local';
		confirmed: boolean;
		blocked: boolean;
		role: number;
		created_at: Date;
		updated_at: Date;
	};
	published_at: Date;
	created_at: Date;
	updated_at: Date;
	image: {
		url: string;
		formats: {
			thumbnail: {
				url: string;
			};
			xlarge: {
				url: string;
			};
			large: {
				url: string;
			};
			medium: {
				url: string;
			};
			small: {
				url: string;
			};
			xsmall: {
				url: string;
			};
		};
	};
}
