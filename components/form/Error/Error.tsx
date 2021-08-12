import React from 'react';

interface ErrorProps {
	children: React.ReactNode;
}

function Error({ children }: ErrorProps) {
	return <p className="text-red-400 text-sm">{children}</p>;
}

export default Error;
