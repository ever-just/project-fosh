# Project Fosh - GitHub Pages

This directory contains the GitHub Pages setup for Project Fosh privacy policy and documentation.

## GitHub Pages Setup

This site is configured to use GitHub Pages with Jekyll. The privacy policy is available at:
- Main page: `https://yourusername.github.io/project-fosh/`
- Privacy policy: `https://yourusername.github.io/project-fosh/privacy/`

## Files Structure

- `index.html` - Main privacy policy page with beautiful styling
- `privacy.md` - Markdown version of the privacy policy for Jekyll
- `_config.yml` - Jekyll configuration for GitHub Pages
- `README.md` - This file

## Local Development

To run this site locally:

1. Install Jekyll and dependencies:
   ```bash
   gem install bundler jekyll
   ```

2. Navigate to the docs directory:
   ```bash
   cd docs
   ```

3. Serve the site locally:
   ```bash
   jekyll serve
   ```

4. Open your browser to `http://localhost:4000`

## GitHub Pages Configuration

1. Push this repository to GitHub
2. Go to repository Settings > Pages
3. Set Source to "Deploy from a branch"
4. Select branch: `main` and folder: `/docs`
5. Your site will be available at `https://yourusername.github.io/project-fosh/`

## Customization

- Update `_config.yml` with your GitHub username and repository details
- Modify the styling in `index.html` as needed
- Update contact information in both privacy policy files