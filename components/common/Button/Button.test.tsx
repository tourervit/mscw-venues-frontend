import { screen, render } from 'test/test-utils';
import Button from './Button';

describe('Button', () => {
	test('has correct type', () => {
		render(<Button type="reset">Reset</Button>);
		const btn = screen.getByRole('button', { name: /reset/i });
		expect(btn).toBeInTheDocument();
		expect(btn).toHaveAttribute('type', 'reset');
	});

	test('displays loading spinner', () => {
		render(<Button loading={true}>Click</Button>);
		expect(screen.getByRole('button', { name: /click/i })).toBeInTheDocument();
		expect(screen.getByTestId('button-spinner')).toBeInTheDocument();
	});

	test('changes color when loading', () => {
		render(<Button loading={true}>Click</Button>);
		const btn = screen.getByRole('button', { name: /click/i });
		expect(btn).toBeInTheDocument();
		expect(btn).toHaveClass('bg-[#444] dark:bg-[#ccc] cursor-not-allowed');
	});
});
