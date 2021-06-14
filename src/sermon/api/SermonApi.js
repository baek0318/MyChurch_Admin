const postSave = async (info={}) => {

    const response = await fetch(
        '/sermon',
        {method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        });

    return response.json();
}

const getSermonList = async () => {

    const response = await fetch(
        '/sermon/list',
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    );

    return response.json();
}

const getSermonById = async (id) => {

    const response = await fetch(
        '/sermon/'+id,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    );

    return response.json();
}

export {postSave, getSermonList, getSermonById};