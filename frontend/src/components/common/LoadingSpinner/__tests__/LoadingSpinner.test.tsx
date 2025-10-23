import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should render loading spinner with default props', () => {
    const { container } = render(<LoadingSpinner />);

    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('flex', 'justify-center', 'items-center', 'py-12');
  });

  it('should render spinner elements', () => {
    render(<LoadingSpinner />);

    expect(screen.getByTestId('spinner-anim')).toBeInTheDocument();
  });

  it('should have proper CSS classes for animation', () => {
    // Act
    render(<LoadingSpinner />);

    // Assert
    const animatedElement = screen.getByTestId('spinner-anim');
    expect(animatedElement).toHaveClass('animate-spin');
  });

  it('should have proper structure', () => {
    const { container } = render(<LoadingSpinner />);

    expect(container.firstChild).toHaveClass('flex', 'justify-center', 'items-center', 'py-12');
  });
});
