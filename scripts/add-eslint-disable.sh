#!/bin/bash

# Add eslint-disable comments to shadcn-ui components

files=(
  "src/components/ui/badge.tsx"
  "src/components/ui/button.tsx"
  "src/components/ui/form.tsx"
  "src/components/ui/navigation-menu.tsx"
  "src/components/ui/sidebar.tsx"
  "src/components/ui/sonner.tsx"
  "src/components/ui/toggle.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    # Check if comment already exists
    if ! grep -q "react-refresh/only-export-components" "$file"; then
      # Insert at the top after the first 3 lines
      sed -i '' '4i\
/* eslint-disable react-refresh/only-export-components */' "$file"
      echo "Added eslint-disable to $file"
    else
      echo "Comment already exists in $file"
    fi
  else
    echo "File not found: $file"
  fi
done

echo "Done!"
