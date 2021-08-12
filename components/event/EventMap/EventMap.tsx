import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import Geocode from 'react-geocode';
import MarkerImg from 'public/logo-sm.png';

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);

interface EventMapProps {
	address: string;
}

function EventMap({ address }: EventMapProps) {
	const { theme } = useTheme();

	const mapStyle =
		theme === 'dark'
			? 'mapbox://styles/coder4real/cko5lsm2y1oe118tes6idd8wq'
			: 'mapbox://styles/coder4real/cks8pg0r88rxu17qwm2grycqy';

	const [cords, setCords] = React.useState({ lat: 0, lng: 0 });

	const getLatLong = async address => {
		try {
			const response = await Geocode.fromAddress(address);
			const { lat, lng } = response.results[0].geometry.location;
			setCords({ lat, lng });
			setViewport({ latitude: lat, longitude: lng, zoom: 12 });
		} catch (error) {
			setCords({ lat: 0, lng: 0 });
		}
	};

	const [viewport, setViewport] = React.useState({
		latitude: 55.7558,
		longitude: 37.6173,
		zoom: 9,
	});

	React.useEffect(() => {
		getLatLong(address);
	}, [address]);

	return (
		<ReactMapGL
			{...viewport}
			mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
			minZoom={8}
			maxZoom={16}
			width="100%"
			height={300}
			onViewportChange={viewport => setViewport(viewport)}
			mapStyle={mapStyle}
		>
			<Marker latitude={cords.lat} longitude={cords.lng}>
				<Image src={MarkerImg} width={18} height={18} alt="marker" />
			</Marker>
		</ReactMapGL>
	);
}

export default EventMap;
