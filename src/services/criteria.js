import API from "../api"

export const getCriterias = async () => {
  const { data } = await API.get('/criterias', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
  return data.data
}

export const createCriteria = async (data) => {
  try {
  const response = await API.post('/criterias', data, {
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

export const updateCriteria = async (id, data) => {
  try {
    const response = await API.post(`/criterias/${id}`, data, {
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

export const deleteCriteria = async (id) => {
  try {
    await API.delete(`/criterias/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
    } catch (err) {
      console.log(err)
      throw err
    }
}