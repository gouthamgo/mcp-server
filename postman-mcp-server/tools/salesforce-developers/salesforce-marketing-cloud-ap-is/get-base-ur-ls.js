/**
 * Function to get base URLs for the Salesforce Marketing Cloud.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.userId - The user ID for the resource.
 * @returns {Promise<Object>} - The base URLs for the Marketing Cloud.
 */
const executeFunction = async ({ userId }) => {
  const et_subdomain = ''; // will be provided by the user
  const et_clientId = ''; // will be provided by the user
  const dne_etAccessToken = ''; // will be provided by the user

  try {
    // Construct the URL with query parameters
    const url = new URL(`https://${et_subdomain}.auth.marketingcloudapis.com/v2/discovery`);
    url.searchParams.append('client_id', et_clientId);
    url.searchParams.append('resource', `acct:${userId}`);

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${dne_etAccessToken}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers
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
    console.error('Error getting base URLs:', error);
    return { error: 'An error occurred while getting base URLs.' };
  }
};

/**
 * Tool configuration for getting base URLs for Salesforce Marketing Cloud.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_base_urls',
      description: 'Get base URLs for the Salesforce Marketing Cloud.',
      parameters: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'The user ID for the resource.'
          }
        },
        required: ['userId']
      }
    }
  }
};

export { apiTool };