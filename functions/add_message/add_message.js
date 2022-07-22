var faunadb = require('faunadb')
var q = faunadb.query;
const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    const messageBody=JSON.parse(event.body)
    var adminClient = new faunadb.Client({ secret: 'fnAEsBKNBBACSZyiWM4mY4u6771eSZIN9dUxpx_0' });
    const result=await adminClient.query(
      q.Create(
        q.Collection("message"),
        {data:{detail:messageBody.message}}
      )
    )
    return {
      statusCode: 200,
      body: JSON.stringify({ message: result.ref.id }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
