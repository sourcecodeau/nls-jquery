# NotLocalStorage Client Library - jQuery
A lightweight JavaScript client library for interacting with the NotLocalStorage API service, providing simple methods for storing and retrieving data remotely.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Environment Variables](#environment-variables)
- [Examples](#examples)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install the package using npm:

```bash
npm install nls-jquery
```

Or using yarn:

```bash
yarn add nls-jquery
```

## Setup

First, import the library:

```javascript
import nls from 'nls-jquery';
```

Initialize the client with your API keys:

```javascript
// Using explicit keys
nls.init('your-api-key', 'your-app-key');

// Or using environment variables
nls.init();
```

## Usage

### Basic Example

```javascript
// Save data
nls.save('user-preferences', 
  { theme: 'dark', language: 'en' },
  (response) => console.log('Data saved successfully:', response),
  (xhr, status, error) => console.error('Save failed:', status)
);

// Load data
nls.load('user-preferences',
  (data) => console.log('Data loaded:', data),
  (xhr, status, error) => console.error('Load failed:', status)
);
```

## API Reference

### `nls.init(api_key?, app_key?)`

Initializes the NotLocalStorage client with authentication credentials.

Parameters:
- `api_key` (string, optional): Your NotLocalStorage API key
- `app_key` (string, optional): Your application key

If keys are not provided, the library will look for environment variables `NLS_API_KEY` and `NLS_APP_KEY`.

### `nls.save(index_key, data, successCallback, failCallback)`

Stores data in NotLocalStorage.

Parameters:
- `index_key` (string): Unique identifier for the data
- `data` (any): Data to be stored
- `successCallback` (function): Callback for successful operation
- `failCallback` (function): Callback for failed operation

### `nls.load(index_key, successCallback, failCallback)`

Retrieves data from NotLocalStorage.

Parameters:
- `index_key` (string): Unique identifier for the data
- `successCallback` (function): Callback for successful operation
- `failCallback` (function): Callback for failed operation

## Environment Variables

The library uses the following environment variables when no explicit keys are provided:

- `NLS_API_KEY`: Your NotLocalStorage API key
- `NLS_APP_KEY`: Your application key

## Examples

### Working with Complex Data

```javascript
const userData = {
  id: 123,
  preferences: {
    theme: 'dark',
    notifications: true,
    language: 'en'
  },
  lastAccess: new Date().toISOString()
};

nls.save('user-123-data', 
  userData,
  (response) => {
    console.log('User data saved:', response);
  },
  (xhr, status, error) => {
    console.error('Failed to save user data:', status);
    // Handle error appropriately
  }
);
```

### Implementing Retry Logic

```javascript
function loadWithRetry(key, maxRetries = 3) {
  let attempts = 0;

  function attempt() {
    nls.load(key,
      (data) => {
        console.log('Data loaded successfully:', data);
      },
      (xhr, status, error) => {
        attempts++;
        if (attempts < maxRetries) {
          console.log(`Retry attempt ${attempts}...`);
          setTimeout(attempt, 1000 * attempts);
        } else {
          console.error('Max retries reached:', error);
        }
      }
    );
  }

  attempt();
}
```

## Error Handling

The library provides detailed error information through the fail callback:

```javascript
nls.save('key', data,
  (response) => {
    // Handle success
  },
  (xhr, status, error) => {
    switch (xhr.status) {
      case 401:
        console.error('Authentication failed - check your API key');
        break;
      case 403:
        console.error('Authorization failed - check your APP key');
        break;
      case 429:
        console.error('Rate limit exceeded');
        break;
      default:
        console.error('Operation failed:', status, error);
    }
  }
);
```

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

For more information, visit [NotLocalStorage Documentation](https://docs.notlocalstorage.io).
