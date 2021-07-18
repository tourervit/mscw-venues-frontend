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
		<Link href={`/${event.slug}`}>
			<a className={cn("block relative group px-4 sm:px-8", className)}>
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
			</a>
			{/* <div className="relative max-w-5xl w-full h-56 rounded-sm overflow-hidden bg-gradient-to-r from-gray-400 via-pink-400 to-gray-800">
					
					</div> */}
		</Link>
	);
}

export default EventPreviewCard;
