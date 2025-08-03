import API from "../api"

export const getTypes = async () => {
  const { data } = await API.get('/types', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  })
  return data.data
}

export const createType = async (data) => {
  try {
  const response = await API.post('/types', data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
  return response.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const updateType = async (id, data) => {
  try {
    const response = await API.post(`/types/${id}`, data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
    return response.data
} catch (err) {
    console.log(err)
    throw err
}
}

export const deleteType = async (id) => {
  try {
    await API.delete(`/types/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
    } catch (err) {
      console.log(err)
      throw err
    }
}