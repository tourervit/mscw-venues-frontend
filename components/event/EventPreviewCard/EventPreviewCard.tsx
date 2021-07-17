import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Event } from "../types";

interface EventPreviewCardProps {
	event: Event;
}

function EventPreviewCard({ event }: EventPreviewCardProps) {
	return (
		<Link href={`/${event.slug}`}>
			<a className="group">
				<div className="px-4 sm:px-8 relative mb-10 w-full h-72 bg-gradient-to-r from-black via-gray-600 to-gray-800 ">
					<Image
						src={event.image}
						layout="fill"
						objectFit="cover"
						alt={event.name}
						className="sm:group-hover:scale-105 origin-top transition-all opacity-50 sm:opacity-100 sm:group-hover:opacity-30 duration-300"
					/>
					<div className="absolute top-1/2 font-light text-xl sm:text-2xl leading-6 text-white sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:-translate-y-1/2 duration-500">
						{event.name}
					</div>
					<div className="absolute bottom-1/3 text-xs font-light text-gray-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:-translate-y-1/2 duration-700">
						{event.date} at {event.time}
					</div>
				</div>
				{/* <div className="relative max-w-5xl w-full h-56 rounded-sm overflow-hidden bg-gradient-to-r from-gray-400 via-pink-400 to-gray-800">
					
					</div> */}
			</a>
		</Link>
	);
}

export default EventPreviewCard;
