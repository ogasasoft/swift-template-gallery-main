import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TemplateCard from '@/components/TemplateCard';
import RatingStars from '@/components/RatingStars';

// Mock RatingStars component
jest.mock('@/components/RatingStars');

// Default mock implementation
(RatingStars as jest.Mock).mockImplementation(({ rating, count, size }) => (
  <div>
    <span>{rating ? `${rating} stars` : 'No rating'}</span>
    {count > 0 && <span> ({count} reviews)</span>}
  </div>
));

const mockTemplate = {
  id: 'template-01',
  title: 'Restaurant Template',
  description: 'A modern restaurant template',
  thumb: 'https://example.com/thumb.jpg',
  tags: ['restaurant', 'menu', 'reservation'],
  rating: 4.5,
  reviewCount: 12,
};

const mockOnClick = jest.fn();

describe('TemplateCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderTemplateCard = (props = {}) => {
    return render(
      <BrowserRouter>
        <TemplateCard
          template={mockTemplate}
          onClick={mockOnClick}
          {...props}
        />
      </BrowserRouter>
    );
  };

  it('should render the template title', () => {
    renderTemplateCard();
    expect(screen.getByText('Restaurant Template')).toBeInTheDocument();
  });

  it('should render the template thumbnail', () => {
    renderTemplateCard();
    const img = screen.getByAltText('Restaurant Template');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/thumb.jpg');
  });

  it('should render rating display', () => {
    renderTemplateCard();
    expect(screen.getByText('4.5 stars')).toBeInTheDocument();
  });

  it('should display review count', () => {
    renderTemplateCard();
    expect(screen.getByText('(12 reviews)')).toBeInTheDocument();
  });

  it('should render all tags as badges', () => {
    renderTemplateCard();
    expect(screen.getByText('restaurant')).toBeInTheDocument();
    expect(screen.getByText('menu')).toBeInTheDocument();
    expect(screen.getByText('reservation')).toBeInTheDocument();
  });

  it('should render preview button', () => {
    renderTemplateCard();
    expect(
      screen.getByRole('button', { name: /preview/i })
    ).toBeInTheDocument();
  });

  it('should render detail link', () => {
    renderTemplateCard();
    const detailLink = screen.getByRole('link', {
      name: /detail/i,
    });
    expect(detailLink).toHaveAttribute('href', '/templates/template-01');
  });

  it('should render download button', () => {
    renderTemplateCard();
    const downloadButton = screen.getByRole('button', {
      name: /download/i,
    });
    expect(downloadButton).toBeInTheDocument();
  });

  it('should call onClick when card is clicked', () => {
    renderTemplateCard();
    const card = screen.getByRole('button', { name: /restaurant template/i });
    fireEvent.click(card);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when tag badge is clicked', () => {
    renderTemplateCard();
    const tagBadge = screen.getByText('restaurant');
    fireEvent.click(tagBadge);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should call onTagClick when tag badge is clicked', () => {
    const onTagClick = jest.fn();
    renderTemplateCard({ onTagClick });
    const tagBadge = screen.getByText('restaurant');
    fireEvent.click(tagBadge);
    expect(onTagClick).toHaveBeenCalledWith('restaurant');
  });

  it('should not call onClick when preview button is clicked', () => {
    renderTemplateCard();
    const previewButton = screen.getByRole('button', { name: /preview/i });
    fireEvent.click(previewButton);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should not call onClick when detail link is clicked', () => {
    renderTemplateCard();
    const detailLink = screen.getByRole('link', { name: /detail/i });
    fireEvent.click(detailLink);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should not call onClick when download button is clicked', () => {
    renderTemplateCard();
    const downloadButton = screen.getByRole('button', { name: /download/i });
    fireEvent.click(downloadButton);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should highlight selected tags', () => {
    renderTemplateCard({ selectedTags: ['restaurant'] });
    const restaurantTag = screen.getByText('restaurant');
    expect(restaurantTag.closest('.badge')).toHaveClass('bg-primary');
  });

  it('should not highlight non-selected tags', () => {
    renderTemplateCard({ selectedTags: ['menu'] });
    const restaurantTag = screen.getByText('restaurant');
    expect(restaurantTag.closest('.badge')).toHaveClass('bg-secondary');
  });

  it('should handle template without tags', () => {
    const templateWithoutTags = {
      ...mockTemplate,
      tags: [],
    };
    renderTemplateCard({ template: templateWithoutTags });
    expect(screen.queryByText('restaurant')).not.toBeInTheDocument();
  });

  it('should handle template without rating', () => {
    const templateWithoutRating = {
      ...mockTemplate,
      rating: undefined,
      reviewCount: undefined,
    };
    renderTemplateCard({ template: templateWithoutRating });
    expect(screen.getByText('No rating')).toBeInTheDocument();
    expect(screen.queryByText('(0 reviews)')).not.toBeInTheDocument();
  });

  it('should handle template with zero rating', () => {
    const templateWithZeroRating = {
      ...mockTemplate,
      rating: 0,
      reviewCount: 0,
    };
    renderTemplateCard({ template: templateWithZeroRating });
    expect(screen.getByText('0 stars')).toBeInTheDocument();
    expect(screen.getByText('(0 reviews)')).toBeInTheDocument();
  });

  it('should handle template with five star rating', () => {
    const templateWithFiveStars = {
      ...mockTemplate,
      rating: 5,
    };
    renderTemplateCard({ template: templateWithFiveStars });
    expect(screen.getByText('5 stars')).toBeInTheDocument();
  });

  it('should have correct image alt text', () => {
    renderTemplateCard();
    const img = screen.getByAltText('Restaurant Template');
    expect(img).toHaveAttribute('alt', 'Restaurant Template');
  });

  it('should have accessible card structure', () => {
    const { container } = renderTemplateCard();
    const card = container.querySelector('.group');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('cursor-pointer');
  });

  it('should have hover effect classes', () => {
    const { container } = renderTemplateCard();
    const card = container.querySelector('.group');
    expect(card).toHaveClass('hover:shadow-lg');
    expect(card).toHaveClass('transition-all');
  });
});
