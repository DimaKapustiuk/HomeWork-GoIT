const baseUrl  = 'https://api.linkpreview.net/?key=5b9a45cc81f339fa8928c270076c0ef75e4182d8266b4&q=';

export const getUrl = url => {
    return fetch(`${baseUrl}${url}`)
      .then(response => {
        if (response.ok) return response.json();

        throw new Error('Error in response')
      })
      .catch(error => alert(error))
};

