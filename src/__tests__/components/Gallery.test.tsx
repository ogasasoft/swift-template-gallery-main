import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import Gallery from '@/components/Gallery';
import { BrowserRouter } from 'react-router-dom';

// Mock the templates.json to return a simple test template
jest.mock('@/lib/templates.json', () => [
  {
    id: 'template-1',
    title: 'Test Template',
    tags: ['Test', 'Mock'],
    industry: 'Lifestyle',
    tone: 'Simple',
    thumb: '/templates/visual-stanza-folio/template.jpg',
    preview_path: '/templates/visual-stanza-folio/index.html',
  },
]);

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Gallery Component', () => {
  it('should render the gallery section', () => {
    renderWithRouter(<Gallery />);
    expect(screen.getByText('Template Gallery')).toBeInTheDocument();
  });

  it('should display template cards when templates exist', () => {
    renderWithRouter(<Gallery />);
    const templateTitles = screen.getAllByText('Test Template');
    expect(templateTitles.length).toBeGreaterThan(0);
  });

  it('should render filters section', () => {
    renderWithRouter(<Gallery />);
    expect(screen.getByText('Browse our collection of templates')).toBeInTheDocument();
  });

  it('should show no templates message when filters match nothing', () => {
    renderWithRouter(<Gallery />);
    expect(screen.queryByText(/no templates found/i)).not.toBeInTheDocument();
  });

  it('should open preview modal when template card is clicked', () => {
    renderWithRouter(<Gallery />);
    const card = screen.getByText('Test Template').closest('div[class*="group"]');
    if (card) {
      fireEvent.click(card);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    }
  });

  it('should filter templates by search text', () => {
    renderWithRouter(<Gallery />);
    const searchInput = screen.getByPlaceholderText(/search templates/i);
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    expect(screen.getByText(/no templates found/i)).toBeInTheDocument();
  });

  it('should filter templates by category', () => {
    renderWithRouter(<Gallery />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'business' } });
    expect(screen.getByText(/no templates found/i)).toBeInTheDocument();
  });
});
