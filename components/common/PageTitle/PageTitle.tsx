import React from 'react';

interface PageTitleProps {
	children: React.ReactNode;
}

function PageTitle({ children }: PageTitleProps) {
	return (
		<h1 className="px-6 mb-4 md:mb-10 text-xl md:text-3xl uppercase font-light">{children}</h1>
	);
}

export default PageTitle;
