import re

with open('src/index.css', 'r') as f:
    content = f.read()

# Replace variables in :root
new_root = """  :root {
    --primary: #1A73E8;
    --primary-container: #E8F0FE;
    --on-primary: #FFFFFF;
    
    --secondary: #34A853;
    --secondary-container: #E6F4EA;
    --on-secondary: #FFFFFF;
    
    --tertiary: #FBBC04;
    --tertiary-container: #FEF7E0;
    
    --surface: #FFFFFF;
    --surface-dim: #F8F9FA;
    --surface-container: #F1F3F4;
    --surface-container-high: #E8EAED;
    
    --on-surface: #1F1F1F;
    --on-surface-variant: #444746;
    
    --outline: #747775;
    --outline-variant: #C4C7C5;
    
    /* Typography Scale */
    --text-display-large: 4rem;
    --text-display-medium: 3rem;
    --text-headline-large: 2.5rem;
    --text-headline-medium: 2rem;
    --text-title-large: 1.5rem;
    --text-title-medium: 1.25rem;
    --text-body-large: 1.125rem;
    --text-body-medium: 1rem;
    --text-body-small: 0.875rem;
    --text-label-large: 0.875rem;
    --text-label-medium: 0.75rem;
    
    /* 8px Grid System */
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 24px;
    --space-6: 32px;
    --space-7: 48px;
    --space-8: 64px;
    --space-9: 80px;
    --space-10: 120px;
    
    /* Shadows & Elevation */
    --elevation-0: none;
    --elevation-1: 0 1px 2px rgba(0,0,0,0.05);
    --elevation-2: 0 2px 4px rgba(0,0,0,0.08);
    --elevation-3: 0 4px 12px rgba(0,0,0,0.10);
    --elevation-4: 0 8px 24px rgba(0,0,0,0.12);
    --elevation-5: 0 16px 48px rgba(0,0,0,0.15);
    
    /* Border Radius */
    --radius-small: 8px;
    --radius-medium: 16px;
    --radius-large: 24px;
    --radius-xl: 32px;
    --radius-full: 9999px;
    
    /* Shadcn defaults mapped somewhat to new ones so we don't break existing components immediately */
    --background: #F8F9FA;
    --foreground: #1F1F1F;
    --card: #FFFFFF;
    --card-foreground: #1F1F1F;
    --popover: #FFFFFF;
    --popover-foreground: #1F1F1F;
    --primary-foreground: #FFFFFF;
    --secondary-foreground: #FFFFFF;
    --muted: #F1F3F4;
    --muted-foreground: #444746;
    --accent: #E8F0FE;
    --accent-foreground: #1A73E8;
    --destructive: #EA0027;
    --border: #C4C7C5;
    --input: #C4C7C5;
    --ring: #1A73E8;
  }"""

content = re.sub(r':root\s*\{[^}]*\}', new_root, content, flags=re.DOTALL)

# Add custom gradients at the bottom
gradients = """
/* New Design System Utility Classes */
.gradient-warm {
  background: linear-gradient(135deg, #FBBC04 0%, #34A853 50%, #1A73E8 100%);
}
.gradient-subtle {
  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, #F8F9FA 100%);
}
.gradient-photo-overlay {
  background: linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%);
}
"""
content += gradients

with open('src/index.css', 'w') as f:
    f.write(content)
