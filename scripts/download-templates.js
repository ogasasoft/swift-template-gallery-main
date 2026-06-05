#!/usr/bin/env node

/**
 * Template Download Script
 * Creates downloadable ZIP files of template components
 */

const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

// Templates data
const templates = [
  {
    id: "hero-section",
    title: "Hero Section",
    description: "Modern hero section with gradient backgrounds and animations",
    files: [
      { source: "src/components/Hero.tsx", target: "Hero.tsx" },
      { source: "src/components/ui/button.tsx", target: "ui/button.tsx" },
      { source: "src/components/ui/card.tsx", target: "ui/card.tsx" },
    ],
  },
  {
    id: "pricing-card",
    title: "Pricing Card",
    description: "Pricing table with three tiers and features list",
    files: [
      { source: "src/components/Pricing.tsx", target: "Pricing.tsx" },
      { source: "src/components/ui/checkbox.tsx", target: "ui/checkbox.tsx" },
      {
        source: "src/components/ui/radio-group.tsx",
        target: "ui/radio-group.tsx",
      },
    ],
  },
  {
    id: "contact-form",
    title: "Contact Form",
    description: "Contact form with validation and submission handling",
    files: [
      { source: "src/components/Contact.tsx", target: "Contact.tsx" },
      { source: "src/hooks/use-toast.ts", target: "hooks/use-toast.ts" },
      { source: "src/components/ui/form.tsx", target: "ui/form.tsx" },
    ],
  },
];

// Ensure downloads directory exists
const downloadsDir = path.join(__dirname, "../downloads");
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

// Create ZIP files for each template
templates.forEach((template) => {
  const zipPath = path.join(downloadsDir, `${template.id}.zip`);

  // Create output stream
  const output = fs.createWriteStream(zipPath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  // Pipe archive data to the file
  output.on("close", () => {
    console.log(`✓ Created: ${template.title} (${template.id}.zip)`);
  });

  output.on("error", (err) => {
    console.error(`✗ Error creating ${template.title}:`, err);
  });

  archive.pipe(output);

  // Add files to the archive
  template.files.forEach((file) => {
    const sourcePath = path.join(__dirname, "../", file.source);
    if (fs.existsSync(sourcePath)) {
      archive.file(sourcePath, { name: file.target });
    }
  });

  archive.finalize();
});

console.log("\n✓ All template ZIP files created successfully!\n");
