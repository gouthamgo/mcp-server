/**
 * Function to get user information from Salesforce Marketing Cloud.
 *
 * @returns {Promise<Object>} - The user information associated with the access token.
 */
const executeFunction = async () => {
  const subdomain = ''; // will be provided by the user
  const accessToken = ''; // will be provided by the user
  const url = `https://${subdomain}.auth.marketingcloudapis.com/v2/userinfo`;

  try {
    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error getting user info:', error);
    return { error: 'An error occurred while getting user info.' };
  }
};

/**
 * Tool configuration for getting user information from Salesforce Marketing Cloud.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_user_info',
      description: 'Get user information from Salesforce Marketing Cloud.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };