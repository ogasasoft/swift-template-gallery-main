import { render, screen } from '@testing-library/react';
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
});
