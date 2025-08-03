import API from "../api"

export const getPeoples = async () => {
  const { data } = await API.get('/peoples', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  })
  return data.data
}

export const createPeople = async (data) => {
  try {
  const response = await API.post('/peoples', data, {
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

export const updatePeople = async (id, data) => {
  try {
    const response = await API.post(`/peoples/${id}`, data, {
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

export const deletePeople = async (id) => {
  try {
    await API.delete(`/peoples/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
    } catch (err) {
      console.log(err)
      throw err
    }
}