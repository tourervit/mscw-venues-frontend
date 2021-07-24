export interface EventData {
	id: number;
	name: string;
	description: string;
	venue: string;
	address: string;
	slug: string;
	date: Date;
	time: Date;
	user: string;
	published_at: Date;
	created_at: Date;
	updated_at: Date;
	image: {
		formats: {
			thumbnail: {
				url;
			};
		};
		url: string;
	};
}
