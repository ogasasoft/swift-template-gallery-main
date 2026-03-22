import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/Header';

describe('Header Component', () => {
  beforeEach(() => {
    // Mock scrollIntoView which is not available in jsdom
    Element.prototype.scrollIntoView = jest.fn();
  });

  it('should render the navigation links', () => {
    render(<Header />);
    const logo = screen.getByText('TemplateLab');
    expect(logo).toBeInTheDocument();
  });

  it('should have the gallery link', () => {
    render(<Header />);
    const galleryLink = screen.getByRole('button', { name: /gallery/i });
    expect(galleryLink).toBeInTheDocument();
  });

  it('should have the pricing link', () => {
    render(<Header />);
    const pricingLink = screen.getByRole('button', { name: /pricing/i });
    expect(pricingLink).toBeInTheDocument();
  });

  it('should have a contact link', () => {
    render(<Header />);
    const contactLink = screen.getByRole('button', { name: /contact/i });
    expect(contactLink).toBeInTheDocument();
  });

  it('should have an inquiry button', () => {
    render(<Header />);
    const inquiryButton = screen.getByRole('button', { name: /inquiry/i });
    expect(inquiryButton).toBeInTheDocument();
  });

  it('should render correctly on mobile', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('should scroll to gallery section when Gallery button is clicked', () => {
    const mockElement = document.createElement('div');
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    render(<Header />);
    const galleryButton = screen.getByRole('button', { name: /gallery/i });
    fireEvent.click(galleryButton);

    expect(document.getElementById).toHaveBeenCalledWith('gallery');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should scroll to pricing section when Pricing button is clicked', () => {
    const mockElement = document.createElement('div');
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    render(<Header />);
    const pricingButton = screen.getByRole('button', { name: /pricing/i });
    fireEvent.click(pricingButton);

    expect(document.getElementById).toHaveBeenCalledWith('pricing');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should scroll to contact section when Contact button is clicked', () => {
    const mockElement = document.createElement('div');
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    render(<Header />);
    const contactButton = screen.getByRole('button', { name: /contact/i });
    fireEvent.click(contactButton);

    expect(document.getElementById).toHaveBeenCalledWith('contact');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should handle scrollToSection when element does not exist', () => {
    jest.spyOn(document, 'getElementById').mockReturnValue(null);

    render(<Header />);
    const galleryButton = screen.getByRole('button', { name: /gallery/i });
    // Should not throw when element is not found
    expect(() => fireEvent.click(galleryButton)).not.toThrow();
  });

  it('should scroll to contact section when Inquiry button is clicked', () => {
    const mockElement = document.createElement('div');
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    render(<Header />);
    const inquiryButton = screen.getByRole('button', { name: /inquiry/i });
    fireEvent.click(inquiryButton);

    expect(document.getElementById).toHaveBeenCalledWith('contact');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should have a mobile Menu button', () => {
    render(<Header />);
    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('should scroll to gallery when mobile Menu button is clicked', () => {
    const mockElement = document.createElement('div');
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    render(<Header />);
    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);

    expect(document.getElementById).toHaveBeenCalledWith('gallery');
  });
});
