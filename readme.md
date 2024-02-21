# UTM Parameters Persistence Script

This JavaScript utility ensures the persistence of UTM parameters across a user's session on a website. It captures UTM parameters from the initial landing URL, stores them, and appends them to internal links. This facilitates consistent tracking of user journeys and campaign effectiveness across page navigations within the site.

## How It Works

- **Capture**: On the user's arrival, the script captures UTM parameters from the URL.
- **Store**: Captured parameters are stored in the session storage.
- **Append**: As the user navigates, the script appends the stored UTM parameters to internal links.

## Implementation

1. Include the script in your site's `<head>` tag or before the closing `</body>` tag.
2. Ensure session storage is accessible and not blocked by the user's browser settings.
3. Call `appendUTMParametersToLinks()` after the DOM is fully loaded or dynamically after loading new content if your site is a single-page application.

## Warnings and Considerations

- **Analytics Impact**: Improper use of UTM parameters within internal navigation can skew analytics data, leading to inaccurate traffic attribution. This script could potentially start new sessions or attribute all internal page navigations to the original source, overstating its impact.
  
- **User Privacy**: Respect user privacy and compliance with regulations (e.g., GDPR, CCPA). Ensure users are informed about data collection practices and have consented where necessary.

- **Duplication Check**: The script checks for existing UTM parameters in links before appending to prevent duplication. However, developers should verify and test to ensure this behavior aligns with their site's analytics setup.

- **Performance**: Adding query parameters to URLs can increase the length of URLs and slightly impact the performance of analytics tracking and page load times. Monitor your site's performance to ensure there's no significant impact.