import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ErrorMessage } from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('should render error message with default props', () => {
    render(<ErrorMessage message="Something went wrong" />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
  });

  it('should render with retry button when onRetry is provided', () => {
    const mockRetry = jest.fn();
    
    render(<ErrorMessage message="Custom error" onRetry={mockRetry} />);

    expect(screen.getByText('Custom error')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('should not render retry button when onRetry is not provided', () => {
    render(<ErrorMessage message="Custom error" />);

    expect(screen.getByText('Custom error')).toBeInTheDocument();
    expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
  });

  it('should handle empty message', () => {
    render(<ErrorMessage message="" />);

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
  });

  it('should handle long error messages', () => {
    const longMessage = 'This is a very long error message that should be displayed properly without breaking the layout or causing any issues with the component rendering';

    render(<ErrorMessage message={longMessage} />);

    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });

  it('should have proper structure', () => {
    render(<ErrorMessage message="Test message" />);

    expect(screen.getByText('⚠️')).toBeInTheDocument();
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });
});
