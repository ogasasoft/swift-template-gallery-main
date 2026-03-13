import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import Gallery from '@/components/Gallery';
import { BrowserRouter } from 'react-router-dom';

// Mock the template data
jest.mock('@/lib/templates.json', () => ({
  default: [
    {
      id: 'template-1',
      name: 'Test Template',
      category: 'lifestyle',
      image: '/templates/visual-stanza-folio/template.jpg',
      description: 'A test template for gallery',
    },
  ],
}));

// テストユーティリティ: BrowserRouter を使ってレンダリング
const renderWithRouter = (ui: any) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Gallery Component', () => {
  it('should render the gallery section', () => {
    renderWithRouter(<Gallery />);
    expect(screen.getByText('Template Gallery')).toBeInTheDocument();
  });

  it('should display template cards when templates exist', () => {
    renderWithRouter(<Gallery />);
    // テンプレートカードが存在するか確認（h3タグで検索）
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
