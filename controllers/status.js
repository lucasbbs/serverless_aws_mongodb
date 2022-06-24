const status = async (req, res) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    status: 'Serverless application is up and running',
  };
};
module.exports = { status };
