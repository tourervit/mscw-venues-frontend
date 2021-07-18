import React from "react";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { Event } from "../types";

interface EventPreviewCardProps {
	event: Event;
	className: string;
}

function EventPreviewCard({ event, className }: EventPreviewCardProps) {
	return (
		<Link href={`/events/${event.slug}`}>
			<a className={cn("block relative group", className)}>
				<Image
					src={event.image}
					layout="fill"
					objectFit="cover"
					alt={event.name}
					className="sm:group-hover:scale-105 origin-top transition-all duration-300"
				/>
				<div className="bg-black/60 md:bg-black/0 md:group-hover:bg-black/40 absolute md: w-full h-full" />
				<div className="absolute top-1/2 px-4 sm:px-6">
					<h3 className="mb-2 xs:mb-0 font-light text-2xl leading-6 text-white sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:-translate-y-2/3 duration-500">
						{event.name}
					</h3>
					<div className="text-xs font-light text-gray-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:-translate-y-1/2 duration-500">
						{event.date} at {event.time}
					</div>
				</div>
			</a>
			{/* <div className="relative max-w-5xl w-full h-56 rounded-sm overflow-hidden bg-gradient-to-r from-gray-400 via-pink-400 to-gray-800">
					
					</div> */}
		</Link>
	);
}

export default EventPreviewCard;
