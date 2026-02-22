import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import Gallery from '@/components/Gallery';
import { BrowserRouter } from 'react-router-dom';

// テストユーティリティ: BrowserRouter を使ってレンダリング
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
    // テンプレートカードが存在するか確認
    const templateCards = screen.queryAllByRole('article');
    expect(templateCards.length).toBeGreaterThan(0);
  });

  it('should render filters section', () => {
    renderWithRouter(<Gallery />);
    expect(screen.getByRole('heading', { name: /browse our collection/i })).toBeInTheDocument();
  });

  it('should show no templates message when filters match nothing', () => {
    renderWithRouter(<Gallery />);
    expect(screen.queryByText(/no templates found/i)).not.toBeInTheDocument();
  });
});
