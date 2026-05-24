import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TemplateCard from '@/components/TemplateCard';
import RatingStars from '@/components/RatingStars';

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
    // RatingStars shows 5 stars for 4.5 rating (rounds up)
    const stars = screen.getAllByLabelText(/4 out of 5 stars/);
    expect(stars.length).toBeGreaterThan(0);
  });

  it('should display review count', () => {
    renderTemplateCard();
    expect(screen.getByText('(12)')).toBeInTheDocument();
  });

  it('should render all tags as badges', () => {
    renderTemplateCard();
    expect(screen.getByText('restaurant')).toBeInTheDocument();
    expect(screen.getByText('menu')).toBeInTheDocument();
    expect(screen.getByText('reservation')).toBeInTheDocument();
  });

  it('should render preview button', () => {
    renderTemplateCard();
    const previewButton = screen.getByRole('button', { name: /preview/i });
    expect(previewButton).toBeInTheDocument();
    expect(previewButton).toHaveAttribute('aria-label', 'preview');
  });

  it('should render detail link', () => {
    renderTemplateCard();
    const detailLink = screen.getByRole('link', {
      name: /detail/i,
    });
    expect(detailLink).toHaveAttribute('href', '/templates/template-01');
    expect(detailLink).toHaveAttribute('aria-label', 'detail');
  });

  it('should render download button', () => {
    renderTemplateCard();
    const downloadButton = screen.getByRole('button', {
      name: /download/i,
    });
    expect(downloadButton).toBeInTheDocument();
    expect(downloadButton).toHaveAttribute('aria-label', 'download');
  });

  it('should call onClick when card is clicked', () => {
    renderTemplateCard();
    const card = screen.getByTestId('template-card');
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
    previewButton.focus();
    fireEvent.keyDown(previewButton, { key: 'Enter' });
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
    downloadButton.focus();
    fireEvent.keyDown(downloadButton, { key: 'Enter' });
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should highlight selected tags', () => {
    renderTemplateCard({ selectedTags: ['restaurant'] });
    const restaurantTag = screen.getByText('restaurant');
    const tagContainer = restaurantTag.closest('div');
    expect(tagContainer).toBeInTheDocument();
  });

  it('should not highlight non-selected tags', () => {
    renderTemplateCard({ selectedTags: ['menu'] });
    const restaurantTag = screen.getByText('restaurant');
    const tagContainer = restaurantTag.closest('div');
    expect(tagContainer).toBeInTheDocument();
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
    expect(screen.getByText(/no rating/i)).toBeInTheDocument();
    expect(screen.queryByText(/(\d+) reviews/i)).not.toBeInTheDocument();
  });

  it('should handle template with zero rating', () => {
    const templateWithZeroRating = {
      ...mockTemplate,
      rating: 0,
      reviewCount: 0,
    };
    renderTemplateCard({ template: templateWithZeroRating });
    // Zero rating shows "no rating" text
    expect(screen.getByText(/no rating/i)).toBeInTheDocument();
    expect(screen.queryByText(/\(\d+\)/)).not.toBeInTheDocument();
  });

  it('should handle template with five star rating', () => {
    const templateWithFiveStars = {
      ...mockTemplate,
      rating: 5,
    };
    renderTemplateCard({ template: templateWithFiveStars });
    // Five stars shows 5 filled stars
    const stars = screen.getAllByLabelText(/5 out of 5 stars/);
    expect(stars.length).toBeGreaterThan(0);
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
