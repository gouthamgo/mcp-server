/**
 * Function to request an access token from Salesforce Marketing Cloud.
 *
 * @param {Object} args - Arguments for the token request.
 * @param {string} args.et_subdomain - Tenant specific subdomain for the Authentication Base URI.
 * @param {string} args.et_clientId - Client Id for authentication.
 * @param {string} args.et_clientSecret - Client Secret for authentication.
 * @param {string} args.et_mid - MID of the business unit.
 * @returns {Promise<Object>} - The response containing the access token and other details.
 */
const executeFunction = async ({ et_subdomain, et_clientId, et_clientSecret, et_mid }) => {
  const url = `https://${et_subdomain}.auth.marketingcloudapis.com/v2/token`;
  const body = {
    grant_type: "client_credentials",
    client_id: et_clientId,
    client_secret: et_clientSecret,
    account_id: et_mid
  };
  
  try {
    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error requesting access token:', error);
    return { error: 'An error occurred while requesting the access token.' };
  }
};

/**
 * Tool configuration for requesting an access token from Salesforce Marketing Cloud.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'request_sfmc_token',
      description: 'Request an access token from Salesforce Marketing Cloud.',
      parameters: {
        type: 'object',
        properties: {
          et_subdomain: {
            type: 'string',
            description: 'Tenant specific subdomain for the Authentication Base URI.'
          },
          et_clientId: {
            type: 'string',
            description: 'Client Id for authentication.'
          },
          et_clientSecret: {
            type: 'string',
            description: 'Client Secret for authentication.'
          },
          et_mid: {
            type: 'string',
            description: 'MID of the business unit.'
          }
        },
        required: ['et_subdomain', 'et_clientId', 'et_clientSecret', 'et_mid']
      }
    }
  }
};

export { apiTool };