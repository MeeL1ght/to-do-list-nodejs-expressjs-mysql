// Fetch - Requests

const post = async (url, data) => {
  try {
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
      },
      cache: 'no-cache',
      credentials: 'same-origin',
      body: data
    })

    const jsonRes = await req.json()

    if (req.ok !== true)
      throw { status: req.status, message: req.statusText }

    return jsonRes
  } catch (error) {
    const message =
			`Oops! Status: ${error.status} | Message: ${error.message}` ||
			'Unknown error'

    console.error(message)
  }
}

const put = async (url, data) => {
  try {
    const req = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
      },
      cache: 'no-cache',
      credentials: 'same-origin',
      body: data
    })

    const jsonRes = await req.json()

    if (req.ok !== true)
      throw { status: req.status, message: req.statusText }

    return jsonRes
  } catch (error) {
    const message =
			`Oops! Status: ${error.status} | Message: ${error.message}` ||
			'Unknown error'

    console.error(message)
  }
}

export { post, put }
